import "./App.css";
import React, { Component } from "react";
import CandidateService from "../src/services/candidate.service";
import Search from "../src/components/Search";
import CandidateCard from "../src/components/CandidateCard";
import styled from "styled-components";
import { Route, Switch, withRouter } from "react-router-dom";
import CandidateDetail from "./components/CandidateDetail";
import CandidateList from "./components/CandidateList";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 40px;
`;

const ButtonWrapper = styled.div`
  display: inline-block;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  color: white;
  background-color: #4c4c4c;
`;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateList: [],
      viewList: [],
      searchedCandidate: "",
      rejectedList: [],
      shortlistedList: [],
    };
    this.handleCandidateSearch = this.handleCandidateSearch.bind(this);
    this.getCandidateList = this.getCandidateList.bind(this);
    this.getRejectedList = this.getRejectedList.bind(this);
    this.getSelectedList = this.getSelectedList.bind(this);
  }
  componentDidMount() {
    this.getCandidateList();
  }
  getCandidateList() {
    CandidateService.getAllCandidates().then((response) => {
      this.setState({
        candidateList: response.data,
        viewList: response.data,
      });
    });
  }
  getRejectedList(id) {
    if (
      this.state.rejectedList.findIndex((candidate) => candidate.id === id) ===
      -1
    ) {
      this.setState({
        rejectedList: [
          ...this.state.rejectedList,
          ...this.state.candidateList.filter(
            (candidate) => candidate.id === id
          ),
        ],
      });
    }
  }
  getSelectedList(id) {
    if (
      this.state.shortlistedList.findIndex(
        (candidate) => candidate.id === id
      ) === -1
    ) {
      this.setState({
        shortlistedList: [
          ...this.state.shortlistedList,
          ...this.state.candidateList.filter(
            (candidate) => candidate.id === id
          ),
        ],
      });
    }
  }
  handleCandidateSearch(event) {
    const keyword = event.target.value;
    let tempList = [];
    if (keyword === "") {
      tempList = this.state.candidateList;
    } else {
      tempList = this.state.candidateList.filter((candidate) =>
        candidate.name.toLowerCase().includes(this.state.searchedCandidate)
      );
    }
    this.setState({
      searchedCandidate: keyword,
      viewList: [...tempList],
    });
  }
  render() {
    // const history = useHistory();
    return (
      <main>
        <Switch>
          <Route
            path="/list/:str"
            render={(props) => <CandidateList {...props} />}
          ></Route>
          <Route
            path="/:id"
            render={(props) => (
              <CandidateDetail
                rejectedList={this.getRejectedList}
                selectedList={this.getSelectedList}
                {...props}
              />
            )}
          ></Route>
          <Route exact path="/">
            <div className="search-section">
              <Search
                candidateName={this.state.searchedCandidate}
                searchCandidate={this.handleCandidateSearch}
              />
              <ButtonWrapper>
                <Button
                  className="m-r-8"
                  onClick={() =>
                    this.props.history.push({
                      pathname: `/list/shortlisted`,
                      state: {
                        list: this.state.shortlistedList,
                      },
                    })
                  }
                >
                  SHORTLISTED LIST
                </Button>
                <Button
                  className="m-r-8"
                  onClick={() =>
                    this.props.history.push({
                      pathname: `/list/rejected`,
                      state: {
                        list: this.state.rejectedList,
                      },
                    })
                  }
                >
                  REJECTED LIST
                </Button>
              </ButtonWrapper>
            </div>
            <Grid>
              {this.state.viewList.length === 0 ? (
                <h1 className="no-result-header"> No Results </h1>
              ) : (
                this.state.viewList.map((candidate) => (
                  <CandidateCard key={candidate.id} {...candidate} />
                ))
              )}
            </Grid>
          </Route>
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);

import "./App.css";
import React, { Component } from "react";
import CandidateService from "../src/services/candidate.service";
import Search from "../src/components/Search";
import CandidateCard from "../src/components/CandidateCard";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import CandidateDetail from "./components/CandidateDetail";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 40px;
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
    console.log("Rejected list", id);
    this.setState({
      rejectedList: [
        ...this.state.rejectedList,
        ...this.state.candidateList.filter((candidate) => candidate.id === id),
      ],
    });
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
    console.log(keyword);
    console.log(tempList);
    this.setState({
      searchedCandidate: keyword,
      viewList: [...tempList],
    });
  }
  render() {
    return (
      <main>
        <Switch>
          <Route
            path="/:id"
            render={(props) => (
              <CandidateDetail rejectedList={this.getRejectedList} {...props} />
            )}
          ></Route>
          <Route exact path="/">
            <div className="search-section">
              <Search
                candidateName={this.state.searchedCandidate}
                searchCandidate={this.handleCandidateSearch}
              />
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
            <Grid>
              {this.state.rejectedList.length === 0 ? (
                <h1 className="no-result-header"> No Results </h1>
              ) : (
                this.state.rejectedList.map((candidate) => (
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

export default App;

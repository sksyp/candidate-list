import "./App.css";
import React, { Component } from "react";
import CandidateService from "../src/services/candidate.service";
import Search from "../src/components/Search";
import CandidateCard from "../src/components/CandidateCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateList: [],
      viewList: [],
      searchedCandidate: "",
    };
    this.handleCandidateSearch = this.handleCandidateSearch.bind(this);
    this.getCandidateList = this.getCandidateList.bind(this);
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
        <div className="search-section">
          <Search
            candidateName={this.state.searchedCandidate}
            searchCandidate={this.handleCandidateSearch}
          />
        </div>

        <div className="cards-list">
          {this.state.viewList.length === 0 ? (
            <h1 className="no-result-header"> No Results </h1>
          ) : (
            this.state.viewList.map((candidate) => (
              <CandidateCard key={candidate.id} {...candidate} />
            ))
          )}
        </div>
      </main>
    );
  }
}

export default App;

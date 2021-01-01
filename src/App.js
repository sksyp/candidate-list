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
      display: false,
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
    this.setState({
      searchedCandidate: event.target.value,
      viewList: this.state.candidateList.filter((candidate) =>
        candidate.name.toLowerCase().includes(this.state.searchedCandidate)
      ),
    });
    if (this.state.viewList.length === 0) {
      this.setState({
        display: true,
      });
    }

    if (this.state.searchedCandidate.length === 0) {
      console.log("Inside searchde");
      this.setState({
        viewList: this.state.candidateList,
        display: false,
      });
    }
  }

  // filterCandidateList() {
  //   const keyword = this.state.searchedCandidate;
  //   this.setState({
  //     viewList: this.state.candidateList.filter((candidate) =>
  //       candidate.name.toLowerCase().includes(keyword)
  //     ),
  //   });
  //   console.log(this.state.viewList);
  //   if (!this.state.viewListl.length)
  //     this.setState({
  //       viewList: this.state.candidateList,
  //     });
  // }

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
          {this.state.display && (
            <h1 className="no-result-header"> No Results </h1>
          )}
          {this.state.viewList.map((candidate) => (
            <CandidateCard key={candidate.id} {...candidate} />
          ))}
        </div>
      </main>
    );
  }
}

export default App;

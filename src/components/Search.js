import "./Search.css";
const Search = ({ candidateName, searchCandidate, filterCandidate }) => {
  return (
    <div>
      <input
        className="search-input"
        type="text"
        value={candidateName}
        placeholder="Search"
        onChange={searchCandidate}
      />
      {/* <label className="search-button">Search</label> */}
    </div>
  );
};

export default Search;

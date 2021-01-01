import styled from "styled-components";
const Input = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border-width: 0px;
  box-shadow: 0px 2px 24px -4px rgb(0 0 0 / 20%);
  margin-bottom: 16px;
  font-size: 12px;
  outline: none;
`;
const Search = ({ candidateName, searchCandidate }) => {
  return (
    <div>
      <Input
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

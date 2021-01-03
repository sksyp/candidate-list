import CandidateCard from "./CandidateCard";
import styled from 'styled-components';
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 40px;
`;
const CandidateList = (props) => {
    return (
        <Grid>
        {props.location.state.list.length === 0 ? (
          <h1 className="no-result-header"> No Results </h1>
        ) : (
            props.location.state.list.map((candidate) => (
            <CandidateCard key={candidate.id} {...candidate} />
          ))
        )}
      </Grid>
    );
  };

  export default CandidateList;

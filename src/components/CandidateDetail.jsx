import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  width: 200px;
  height: 232px;
  border: 0px solid #4c4c4c;
  background: white;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0px 2px 24px -4px rgb(0 0 0 / 20%);
  cursor: pointer;
  transition: 0.4s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(0.9, 0.9);
  }
`;
const ImgWrapper = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  overflow: hidden;
`;
const Img = styled.img`
  height: 150px;
  width: 150px;
`;

// cons

const CandidateDetail = (props) => {
    console.log(props.rejectedList)
    return (
        <Card onClick={() => props.rejectedList(props.location.state.id)}>
            <ImgWrapper>
              <Img src={props.location.state.Image} alt="Not availalble" />
            </ImgWrapper>
            <h4>{props.location.state.name}</h4>
          </Card>
    )
}

export default CandidateDetail

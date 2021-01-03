import React from 'react'
import styled from 'styled-components'
import {useHistory} from "react-router-dom"

const Card = styled.div`
  width: 480px;
  height: 620px;
  border: 0px solid #4c4c4c;
  background: white;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0px 2px 24px -4px rgb(0 0 0 / 20%);
  transition: 0.4s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Container = styled.div`
justify-content: center;
width: 100%;
height: 100%;
display: flex;
flex-wrap: wrap;
align-content: center;
`
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
const ContentWrapper = styled.p`
  padding: 4px:
`

const ButtonContainer = styled.div`
display: inline-block;
position: absolute;
bottom: 24px;
`
const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  color: white;
`
const AcceptButton = styled(Button)`
  background-color: #18bf18f2;
`
const RejectButton = styled(Button)`
  background-color: #ff0000;
`

const CandidateDetail = (props) => {
    const history = useHistory();
    return (
        <Container>
        <Card >
            <ImgWrapper>
              <Img src={props.location.state.Image} alt="Not available" />
            </ImgWrapper>
            <h4>{props.location.state.name}</h4>
            <h3>Candidate Details</h3>
            <ContentWrapper>
                Work Expereience: "Lorem Ipsum" <br/>
                Tech Skills: Lorem Ipsum
            </ContentWrapper>
            <ButtonContainer>
            <AcceptButton className='m-r-8' onClick={() => {props.selectedList(props.location.state.id); history.goBack()}}>ACCEPT</AcceptButton>
            <RejectButton onClick={() => {props.rejectedList(props.location.state.id); history.goBack()}}>REJECT</RejectButton>
            </ButtonContainer>
          </Card>
          </Container>
    )
}

export default CandidateDetail

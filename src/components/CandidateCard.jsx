import styled from "styled-components";
import {useHistory} from "react-router-dom"

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

const CandidateCard = ({ id, Image, name}) => {
  const history = useHistory();
  return (
    <Card onClick={() => history.push({
      pathname: `/${id}`,
      state: {
        id, name, Image
      }
    })}>
      <ImgWrapper>
        <Img src={Image} alt="Not available" />
      </ImgWrapper>
      <h4>{name}</h4>
    </Card>
  );
};

export default CandidateCard;

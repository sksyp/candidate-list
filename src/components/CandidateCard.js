import "./CandidateCard.css";
const CandidateCard = ({ Image, name }) => {
  return (
    <div className="card">
      <h4 className="card-title">{name}</h4>
      <img className="card-image" src={Image} alt="Not availalble" />
    </div>
  );
};

export default CandidateCard;

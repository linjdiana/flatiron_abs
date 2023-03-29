import TrainerCard from './TrainerCard'

function TrainerContainer({ trainers }) {
  const trainerItems = trainers.map(trainerObj => {
    return <TrainerCard key={trainers.id} trainerObj={trainerObj} />
  });
    return (
      <div className="trainercontainer" id="trainers">
        {trainerItems}
      </div>
    );
  }
  

export default TrainerContainer
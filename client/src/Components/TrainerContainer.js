import TrainerCard from './TrainerCard'

function TrainerContainer({ trainers }) {
  const trainerItems = trainers.map(trainerObj => {
    return <TrainerCard key={trainers.id} trainerObj={trainerObj} />
  });
    return (
      <div className="App" id="trainers">
        {trainerItems}
      </div>
    );
  }
  

export default TrainerContainer
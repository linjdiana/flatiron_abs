import { useState } from "react"

function CalendarCard({ workoutObj }) {
    const { id, time, trainer, name, description } = workoutObj
    const [showDescription, setShowDescription] = useState(false)
    console.log(workoutObj.trainers.name)

    function handleClick() {
        setShowDescription((currentDescription) => !currentDescription)
    }

    const descriptionText = showDescription ? <p>{description}</p> : null;
    const buttonText = showDescription ? "Hide Description" : "Show Description"
    // {workoutObj.map((workout) => (
    //     {workout.name}))}

    return (
//             {workoutObj.map((workout) => (
//                 <h2>{workout.name}</h2>
// ))}
        <span>
            <h3>{name}</h3>
            <h4>{time}</h4>
            {/* <p>{workoutObj.trainers.name}</p> */}
            <p>{trainer.name}</p>
            <button onClick={handleClick}>{buttonText}</button>
            <p>{descriptionText}</p>
            <button>Sign Up for {name} with {workoutObj.trainers.name}</button>
            <br></br>
            <br></br>
            <br></br>
        </span>
    )
}

export default CalendarCard;
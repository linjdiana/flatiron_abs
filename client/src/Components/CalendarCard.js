import { useState } from "react"

function CalendarCard({ workoutObj }) {
    const { id, time, trainer, name, description } = workoutObj
    const [showDescription, setShowDescription] = useState(false)
<<<<<<< HEAD
    // console.log(workoutObj.trainers.name)
    console.log(workoutObj)
    console.log(trainer.name)
=======
    // console.log(trainers.name)
>>>>>>> brett

    function handleClick() {
        setShowDescription((currentDescription) => !currentDescription)
    }

    const descriptionText = showDescription ? <p>{description}</p> : null;
    const buttonText = showDescription ? "Hide Description" : "Show Description"
   

    return (

        <span>
            <h3>{name}</h3>
            <h4>{time}</h4>
<<<<<<< HEAD
            {/* <p>{workoutObj.trainers.name}</p> */}
            {/* <p>{trainer.name}</p> */}
            <button onClick={handleClick}>{buttonText}</button>
            <p>{descriptionText}</p>
            {/* <button>Sign Up for {name} with {workoutObj.trainers.name}</button> */}
=======
            <p>{trainer.name}</p>
            <button onClick={handleClick}>{buttonText}</button>
            <p>{descriptionText}</p>
            <button>Sign Up for {name} with {trainer.name}</button>
>>>>>>> brett
            <br></br>
            <br></br>
            <br></br>
        </span>
    )
}

export default CalendarCard;
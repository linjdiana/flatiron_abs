import { useState } from "react"

function CalendarCard({ workoutObj, signUps, setSignUps }) {
    const { id, time, trainer, name, description } = workoutObj
    const [showDescription, setShowDescription] = useState(false)

    const [isSignedUp, setIsSignedUp] = useState(false)
    // console.log(trainers.name)


    function handleClick() {
        setShowDescription((currentDescription) => !currentDescription)
    } 

    const descriptionText = showDescription ? <p>{description}</p> : null;
    const buttonText = showDescription ? "Hide Description" : "Show Description"
   

    return (

        <span>
            <h3>{name}</h3>
            <h4>{time}</h4>
            <p>{trainer.name}</p>
            <button onClick={handleClick}>{buttonText}</button>
            {descriptionText}
            {/* <button onClick={handleSignUp}>Sign Up for {name} with {trainer.name}</button> */}
            <br></br>
            <br></br>
            <br></br>
        </span>
    )
}

export default CalendarCard;
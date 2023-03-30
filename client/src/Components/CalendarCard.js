import { useState } from "react"

function CalendarCard({ workoutObj, signUps, setSignUps }) {
    const { id, time, trainer, name, description } = workoutObj
    const [showDescription, setShowDescription] = useState(false)
    const [isSignedUp, setIsSignedUp] = useState(false)
    // console.log(trainers.name)

    function handleClick() {
        setShowDescription((currentDescription) => !currentDescription)
    }

    // const signUpIds = signUps.map(signUp => {
    //     return signUp.id
    // })

    // useEffect(() => {
    //     function checkSignedUp() {
    //         if (signUpIds.includes(signUps.id))
    //         console.log("signed up!")
    //         } else {
    //         console.log("not signed up!")
    //     }
    // })


    function handleSignUp() {
        fetch("http://localhost:3000/signups", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(signUps)
        })
        .then(response => response.json())
        .then(signUps => console.log(signUps))
    }    

    const descriptionText = showDescription ? <p>{description}</p> : null;
    const buttonText = showDescription ? "Hide Description" : "Show Description"

    return (
        <span class="calendarcard">
            <h2>{name}</h2>
            <h4>{time}</h4>
            <p>{trainer.name}</p>
            <button className="button-16" onClick={handleClick}>{buttonText}</button>
            <p>{descriptionText}</p>
            <button className="workoutbutton">Work out with {trainer.name}</button>
            <br></br>
            <br></br>
            <br></br>
        </span>
    )
}

export default CalendarCard;
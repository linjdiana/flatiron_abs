import { useState } from "react"

function CalendarCard({ workoutObj }) {
    const { id, time, trainer, name, description } = workoutObj
    const [showDescription, setShowDescription] = useState(false)

    function handleClick() {
        setShowDescription((currentDescription) => !currentDescription)
    }

    const descriptionText = showDescription ? <p>{description}</p> : null;
    const buttonText = showDescription ? "Hide Description" : "Show Description"

    return (
        <span class="calendarcard">
            <h2>{name}</h2>
            <h4>{time}</h4>
            <p>{trainer}</p>
            <button className="button-16" onClick={handleClick}>{buttonText}</button>
            <p>{descriptionText}</p>
            <button className="button-1">Work out with {trainer}</button>
            <br></br>
            <br></br>
            <br></br>
        </span>
    )
}

export default CalendarCard;
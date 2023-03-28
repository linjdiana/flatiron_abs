import { useState } from "react";

function TrainerCard({ trainerObj }) {
    const { id, name, image, bio } = trainerObj
    const [ showBio, setShowBio ] = useState(false)
    function handleClick() {
        setShowBio((currentBio) => !currentBio)
    }

    const bioText = showBio ? <p>{bio}</p> : null;
    const buttonText = showBio ? "Hide Bio" : "Show Bio"

    return (
        <div>
            <img src={image} alt="trainer pic" />
            <h3>{name}</h3>
            <button onClick={handleClick}>{buttonText}</button>
            <p>{bioText}</p>
        </div>
    )
}

export default TrainerCard;
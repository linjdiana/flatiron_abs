import { useState } from "react";
import '../index.css';

function TrainerCard({ trainerObj }) {
    const { name, image, bio } = trainerObj
    const [ showBio, setShowBio ] = useState(false)
    function handleClick() {
        setShowBio((currentBio) => !currentBio)
    }

    const bioText = showBio ? <p>{bio}</p> : null;
    const buttonText = showBio ? "Hide Bio" : "Show Bio"

    return (
        <div class="trainercard">
            <h1><strong>{name}</strong></h1>
            <img src={image} alt="trainer pic" />
            <figcaption>
                <h3>Trainer Bio</h3>
                <p>{bioText}</p>
                <button onClick={handleClick}>{buttonText}</button>
            </figcaption>
        </div>
    )
}

export default TrainerCard;
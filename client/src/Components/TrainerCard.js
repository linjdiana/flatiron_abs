function TrainerCard({ trainerObj }) {
    const { id, name, image, bio } = trainerObj

    return (
        <div>
            <img src={image} alt="trainer pic" />
            <h3>{name}</h3>
            <p>{bio}</p>
        </div>
    )
}

export default TrainerCard;
import CalendarCard from './CalendarCard'

function Calendar({ workouts }) {
    console.log(workouts)
    const renderWorkouts = workouts.map(workoutObj => {
        return <CalendarCard key={workouts.id} workoutObj={workoutObj} />
    });

    return (
        <div>
            {renderWorkouts}
        </div>
    )
}

export default Calendar;
import CalendarCard from './CalendarCard'
import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {useFormik } from "formik";
import * as yup from "yup";

function Calendar({ workouts, signUps, setSignUps }) {
    console.log(workouts)
    const [signUpClass, setSignUpClass] = useState([])
    const history = useHistory()
    const addSignUpClass = (signup) => setSignUpClass(current => [...current, signup])

    const formSchema = yup.object().shape({
        user: yup.string().required()
    })

    const formik = useFormik({
        initialValues: {
            user: "",
            workout_id: workouts[0]?.id
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    const workoutOptions = workouts.map((workoutObj) => {
        return (
            <option value={workoutObj.id} key={workoutObj.id}>{workoutObj.name} with {workoutObj.trainer.name}</option>
        )
    })
    
    const renderWorkouts = workouts.map(workoutObj => {
        return <CalendarCard key={workouts.id} workoutObj={workoutObj} signUps={signUps} setSignUps={setSignUps} />
    });

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {renderWorkouts}
            <br></br><br></br>
            <form onSubmit={formik.handleSubmit}>
                <label>User: </label>
                <input type='text' name='user' value={formik.values.user} onChange={formik.handleChange} />
                <br></br>
                <label>Which workout would you like to sign up for? </label>
                <select name="workout_id" value={formik.values.workout_id} onChange={formik.handleChange} >
                    {workoutOptions}
                </select>
                <br></br>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Calendar;






import CalendarCard from './CalendarCard'
import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function Calendar({ workouts }) {
    // console.log(workouts)
    const [signUpClass, setSignUpClass] = useState([])
    const [ signUps, setSignUps ] = useState([])
    
    const history = useHistory()
    const addSignUpClass = (signup) => setSignUpClass(current => [...current, signup])

    
    useEffect(() => {
        fetch("/signup")
        .then(response => response.json())
        .then(signUpData => setSignUps(signUpData)) 
    }, [])
    
   function handleDelete(id) {
        const newSignUps = signUps.filter(signUp => {
            return signUp.id !== id
        })
        console.log(id)
        fetch(`/signup/${id}`, {
            method: "DELETE"
        }).then(() => setSignUps(newSignUps)) 
   }

    // const formSchema = yup.object().shape({
    //     user: yup.string().required()
    // })

    const formik = useFormik({
        initialValues: {
            // user: "",
            workout_id: workouts[0]?.id
        },
        // validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if(response.ok) {
                    response.json().then(signup => {
                        setSignUpClass(current => [...current, signup])
                        window.location.reload()
                    })
                }
            })
        }
    })

    const workoutOptions = workouts.map((workoutObj) => {
        return (
            <option value={workoutObj.id} key={workoutObj.id}>{workoutObj.name} with {workoutObj.trainer.name}</option>
        )
    })
    
    const renderWorkouts = workouts.map(workoutObj => {
        return <CalendarCard key={workoutObj.id} workoutObj={workoutObj} signUps={signUps} setSignUps={setSignUps} />
    });

    const renderSignups = signUps.map((signupObj) => {
        // console.log(signupObj.workout.time)
        return (
            <ul class="signups" key={signupObj.id}>
               <ul>Scheduled: {signupObj.workout.time} {signupObj.workout.name} with {signupObj.workout.trainer.name}</ul>
               <button class="button-30" onClick={() => handleDelete(signupObj.id)}>Delete</button>
            </ul>
        )
    })
    

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {renderWorkouts}
            <br></br><br></br>
            <form class="calendarform" onSubmit={formik.handleSubmit}>
                <br></br>
                <label>Which workout would you like to sign up for? </label>
                <select name="workout_id" value={formik.values.workout_id} onChange={formik.handleChange} >
                    {workoutOptions}
                </select>
                <br></br>
                <input class="button-30" type="submit" />
            </form>
            <br></br>
            <div class="signups"><h3>Scheduled Sign Ups</h3>{renderSignups}</div>
        </div>
    )
}

export default Calendar;






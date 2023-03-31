import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {useFormik } from "formik";
import * as yup from "yup";

function AddReview({reviews, workouts}) {
    const [submittedReview, setSubmittedReview] = useState([])
    const [name, setName] = useState([])
    const history = useHistory()
    const addReview = (review) => setSubmittedReview(current => [...current,review])
        const formSchema = yup.object().shape({
        text: yup.string().required("Please let us know what you thought!")
    })
    // console.log(reviews)

    const formik = useFormik({
        initialValues: {
            user: "",
            workout_id: workouts[0]?.id,
            rating: "5/5",
            text: " "
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/user',).then((response) => response.json()).then((data) => setName(data.name))
            fetch("/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...values, name: name}),
            }).then((response) => {
                if(response.ok) {
                    response.json().then(review => {
                        addReview(review)
                        // console.log(review)
                        history.push("/reviews")
                        // window.location.reload()
                    })
                }
            })
        }
    })
            console.log(name)

    const workoutOptions = workouts.map((workoutObj) => {
        return (
            <option value={workoutObj.id} key={workoutObj.id}>{workoutObj.name} with {workoutObj.trainer.name}</option>
        )
    })

    const renderReviews = reviews.map((reviewObj) => {
            console.log(reviewObj)
            // console.log(reviewObj.workout)
        return (
            <ul key={reviewObj.id}>
                <li>User: {reviewObj.user}</li>
                <li>Workout: {reviewObj.workout.name}</li>
                <li>Rating: {reviewObj.rating}</li>
                <li>Review: {reviewObj.text}</li>
                <br></br>
            </ul>
        )
    })
    // console.log(renderReviews)

    return (
        <div>
             <br></br> 
             {/* <br></br> */}
            <form onSubmit={formik.handleSubmit}>
                {/* <label>User: </label>
                <input type='text' name='user' value={formik.values.user} onChange={formik.handleChange} /> */}
                <br></br>
                <label>
                    Workout:
                    <select name="workout_id" value={formik.values.workout_id} onChange={formik.handleChange} >
                        {workoutOptions}
                    </select>
                </label>
                <br></br>
                <label>
                    Rating:
                    <select name="rating" value={formik.values.rating} onChange={formik.handleChange} >
                        <option value="5/5">5/5</option>
                        <option value="4/5">4/5</option>
                        <option value="3/5">3/5</option>
                        <option value="2/5">2/5</option>
                        <option value="1/5">1/5</option>
                    </select>
                </label>
                <br></br>
                <label>Review: </label>
                <textarea type='text' name="text" value={formik.values.text} onChange={formik.handleChange} />
                <input type='submit' />
            </form>
            <br></br>
            <br></br>
            {renderReviews}
            <br></br>
        </div>
    )  
}

export default AddReview;
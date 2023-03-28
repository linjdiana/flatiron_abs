import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {useFormik } from "formik";
import * as yup from "yup";

function AddReview() {
    const [submittedReview, setSubmittedReview] = useState([])
    const history = useHistory()
    const addReview = (review) => setSubmittedReview(current => [...current,review])
    const formSchema = yup.object().shape({
        reviewtext: yup.string().required("Please let us know what you thought!")
    })

    const formik = useFormik({
        initialValues: {
            workout: "Get Yoked",
            rating: "5/5",
            reviewtext: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((response) => {
                if(response.ok) {
                    response.json().then(review => {
                        addReview(review)
                        history.push("/reviews")
                    })
                }
            })
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label>
                    Workout:
                    <select value={formik.values.workout} onChange={formik.handleChange} >
                        <option value="getyoked">Get Yoked</option>
                        <option value="running">Running, but like a lot</option>
                        <option value="spikeball">Spikeball/no mercy</option>
                    </select>
                </label>
                <br></br>
                <label>
                    Rating:
                    <select value={formik.values.rating} onChange={formik.handleChange} >
                        <option value="5">5/5</option>
                        <option value="4">4/5</option>
                        <option value="3">3/5</option>
                        <option value="2">2/5</option>
                        <option value="1">1/5</option>
                    </select>
                </label>
                <label>Review</label>
                <input type='text' name='reviewtext' value={formik.values.reviewtext} onChange={formik.handleChange} />
                <input type='submit' />
            </form>
        </div>
    )
}

export default AddReview;
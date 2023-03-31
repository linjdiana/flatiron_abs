import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {useFormik } from "formik";
import * as yup from "yup";

function AddReview({reviews}) {
    const [submittedReview, setSubmittedReview] = useState([])
    const history = useHistory()
    const addReview = (review) => setSubmittedReview(current => [...current,review])
        const formSchema = yup.object().shape({
        text: yup.string().required("Please let us know what you thought!")
    })

    const formik = useFormik({
        initialValues: {
            workout: "Get Yoked",
            rating: "5/5",
            text: " "
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/reviews', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((response) => {
                if(response.ok) {
                    response.json().then(review => {
                        addReview(review)
                        console.log(review)
                        history.push("/reviews")
                        
                    })
                }
            })
        }
    })

    const renderReviews = reviews.map((reviewObj) => {
        return (
          <ul class="reviewcard" key={reviews.id}>
            <ul class="author"><strong>{reviewObj.user}</strong></ul>
            <ul>
              <strong>{reviewObj.rating}</strong>
            </ul>
            <p>{reviewObj.text}</p>
            <br></br>
          </ul>
        );
      });
      
      return (
        <div>
          {/* <br></br> <br></br> */}
          <form class="reviewform" onSubmit={formik.handleSubmit}>
            <label class="workout">
              Workout: <br />
              <select
                name="workout"
                value={formik.values.workout}
                onChange={formik.handleChange}
              >
                <option value="getyoked">Get Yoked</option>
                <option value="running">Running, but like a lot</option>
                <option value="spikeball">Spikeball/no mercy</option>
              </select>
            </label>
            {/* <br></br> */}
            <label>
              <select
                name="rating"
                value={formik.values.rating}
                onChange={formik.handleChange}
              >
                <option value="5/5">5/5</option>
                <option value="4/5">4/5</option>
                <option value="3/5">3/5</option>
                <option value="2/5">2/5</option>
                <option value="1/5">1/5</option>
              </select>
            </label>
            <label>Review: </label>
            <textarea
              type="text"
              name="text"
              value={formik.values.text}
              onChange={formik.handleChange}
            />
            <input class="button-30" type="submit" />
          </form>
          <br></br>
          <br></br>
          <div className="reviewscontainer">{renderReviews}</div>
          <br></br>
        </div>
      );
}

export default AddReview;
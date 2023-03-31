import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import styled from "styled-components";
import { useFormik } from "formik"
import * as yup from "yup"


function Authentication({updateUser}) {
  const [signUp, setSignUp] = useState(false)
  const [error, setError] = useState(false)
  const history = useHistory()

  const handleClick = () => setSignUp((signUp) => !signUp)
  const formSchema = yup.object().shape({
    name: yup.string().required("Please enter a user name"),
    email: yup.string().email()
  })

  const formik = useFormik({
    initialValues: {
      name:'',
      email:'',
      password:''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        fetch(signUp?'/adduser':'/login',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
        .then(res => {
          if(res.ok){
            res.json().then(user => {
              // console.log(user)
              updateUser(user)
              history.push('/')
            })
          } else {
            //15.2 render the error if the user's authentication fails
            res.json().then(error => setError(error.message))
          }
        })
       
    },
  })

    return (
        <div class="loginform"> 
        <h2 style={{color:'red'}}> {formik.errors.name}</h2>
        {error&& <h2 style={{color:'red'}}> {error}</h2>}
        <h2>Please Log in or Sign up!</h2>
        <h2>{signUp?'Have an account?':'Not a member yet?'}</h2>
        <button class="button-30" onClick={handleClick}>{signUp?'Log In':'Signup'}</button>
        <Form onSubmit={formik.handleSubmit}>
        <label>
          Username
          </label>
        <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} />
        <label>
           Password
           </label>
           <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
        {signUp&&(
          <>
          <label>
          Email
          </label>
          <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} />
           
           </>
        )}
        <input class="button-30" type='submit' value={signUp?'Sign Up':'Log In'} />
      </Form>
        </div>
    )
}

export default Authentication

export const Form = styled.form`
display:flex;
flex-direction:column;
width: 400px;
margin:auto;
font-size:30px;
input[type=submit]{
  rgb(223, 239, 239);
  height:40px;
  font-family: 'Edu SA Beginner';
  font-size:25px;
  margin-top:5px;
  margin-bottom:5px;
  length: 150px;
}
`
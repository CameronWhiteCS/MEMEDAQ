import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Signup = (props) => {

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: ''
    },
    onSubmit: () => {
      axios.post('/api/v1/signup/', formik.values)
        .then((res) => {
          history.push('/signin');
        })
        .catch((err) => {
          console.log(err.response)
          props.handleError(err)
        });
    }
  })

  return (
    <React.Fragment>
      <h1>Sign Up</h1>
      <hr />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">
            Username
            </Form.Label>
          <Form.Control name="username" id="username" type="text" onChange={formik.handleChange} value={formik.values.username} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">
            Password
            </Form.Label>
          <Form.Control name="password" id="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="passwordConfirm">
            Confirm Password
            </Form.Label>
          <Form.Control name="passwordConfirm" id="passwordConfirm" type="password" onChange={formik.handleChange} value={formik.values.passwordConfirm} />
        </Form.Group>
        <Button variant="primary" color="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </React.Fragment>
  );

}

export default Signup;

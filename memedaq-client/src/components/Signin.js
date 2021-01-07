import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Signin = (props) => {

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: () => {
      axios.post('/api/v1/signin/', formik.values)
        .then((res) => {

              new Promise(() => {
                props.loadUserData();
              })
              .then(new Promise(() => {
                props.setSignedIn(true);
                history.push('/profile');
              }));
         
        })
        .catch((err) => {
          props.handleError(err)
        })
    }
  });

  return (
    <React.Fragment>
      <h1>Sign In</h1>
      <hr />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control name="username" id="username" type="text" placeholder="cow@cow.jp" onChange={formik.handleChange} value={formik.values.username} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control name="password" id="password" type="password" placeholder="m000_1!" onChange={formik.handleChange} value={formik.values.password} />
        </Form.Group>
        <p className="text-muted">Don't have an account? Sign up <Link to="/signup">here</Link>.</p>
        <Button type="submit">Sign in</Button>
      </Form>
    </React.Fragment>
  );

}

export default Signin;

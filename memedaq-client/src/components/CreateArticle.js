import React from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router';

const CreateArticle = (props) => {

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            text: ''
        },
        onSubmit: () => {
            axios.post('/api/v1/article/create/', formik.values)
                .then((res) => {
                    history.push('/news/');
                })
                .catch(props.handleError);
        }
    })

    return (
        <React.Fragment>
            <h1>Create Article</h1>
            <hr />
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control className="w-100" name="title" id="title" onChange={formik.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control className="w-100" name="description" id="description" onChange={formik.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="text">Text</Form.Label>
                    <textarea rows="10" className="form-control" name="text" id="text" onChange={formik.handleChange} />
                </Form.Group>
                <Button type="Submit">Submit</Button>
            </Form>
        </React.Fragment>

    );

}

export default CreateArticle;
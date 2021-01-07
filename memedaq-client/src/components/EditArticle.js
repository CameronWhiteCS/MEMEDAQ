import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';

const EditArticle = (props) => {

    const history = useHistory();
    const { id } = useParams();

    const formik = useFormik({
        initialValues: {
            title: 'asdf',
            description: '',
            text: '',
            id: id
        },
        onSubmit: () => {
            axios.post('/api/v1/article/edit/', formik.values)
                .then((res) => {
                    history.push(`/news/${id}`);
                })
                .catch(props.handleError);
        }
    })

    useEffect(() => {
        axios.get(`/api/v1/article/${id}/`)
        .then((res) => {
            formik.setFieldValue('title', res.data.title);
            const values = {
                title: res.data.title,
                description: res.data.description,
                text: res.data.text,
                id: formik.values.id
            }
            formik.setValues(values);

        })
        .catch(props.handleError);
    }, []);

    return (
        <React.Fragment>
            <h1>Edit Article</h1>
            <hr />
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control className="w-100" name="title" id="title" value={formik.values.title} onChange={formik.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control className="w-100" name="description" id="description" value={formik.values.description} onChange={formik.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="text">Text</Form.Label>
                    <textarea rows="10" className="form-control" name="text" id="text" value={formik.values.text} onChange={formik.handleChange} />
                </Form.Group>
                <Button type="Submit">Submit</Button>
            </Form>
        </React.Fragment>

    );


}

export default EditArticle;
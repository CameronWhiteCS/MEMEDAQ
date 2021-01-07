import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateMeme = (props) => {

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            name: '',
            imageUrl: '',
            tradingPrice: 1000,
            stock: 10000,
        },
        onSubmit: () => {
            axios.post('/api/v1/meme/create/', formik.values)
                .then((res) => {
                    history.push(`/meme/${res.data.id}`)
                })
                .catch(props.handleError)
        }
    });

    return (
        <React.Fragment>
            <h1>Create Meme</h1>
            <hr />
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control placeholder="Pepe" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="imageUrl">Image URL</Form.Label>
                    <Form.Control placeholder="https://i.imgur.com/xyz.png" id="imageUrl" name="imageUrl" value={formik.values.imageUrl} onChange={formik.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="tradingPrice">Price</Form.Label>
                    <Form.Control placeholder="1000" id="tradingPrice" name="tradingPrice" value={formik.values.tradingPrice} onChange={formik.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="stock">Stock</Form.Label>
                    <Form.Control placeholder="Pepe" id="stock" name="stock" value={formik.values.stock} onChange={formik.handleChange} />
                </Form.Group>
                <Button type="submit">Create meme</Button>
            </Form>
        </React.Fragment>
    );

}

export default CreateMeme;
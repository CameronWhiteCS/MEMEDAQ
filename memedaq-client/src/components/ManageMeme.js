import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Meme from './Meme.js';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ManageMeme = (props) => {


    const { id } = useParams()

    const [meme, setMeme] = useState({})
    const [quantity, setQuantity] = useState(0)

    const history = useHistory();

    const onChange = (e) => {
        if (!Number.isInteger(Number(e.target.value)) && e.target.value != '') {
            e.target.value = quantity
        } else {
            setQuantity(e.target.value);
        }
    }

    useEffect(() => {
        axios.get(`/api/v1/meme/${id}/`)
            .then((res) => {
                setMeme(res.data);
            })
            .catch((err) => {
                props.handleError(err);
            })
    }, []);

    const buySell = (action) => {

        axios.post(`/api/v1/${action}/`, {
            memeId: meme.id,
            quantity: quantity
        })
            .then((res) => {
                props.loadUserData();
                history.push('/portfolio/');
            })
            .catch((err) => {
                props.handleError(err)
            });
    }

    return (
        <React.Fragment>
            <h1>Invest/Sell {meme.name}</h1>
            <Meme meme={meme}>
                <p>You can afford: {Math.floor(props.userData.balance / meme.trading_price)}</p>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Row>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Control name="quantity" id="quantity" placeholder={0} onChange={onChange}>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Button onClick={() => buySell('invest')} className="w-100" >Buy</Button>
                        </Col>
                        <Col xs={6}>
                            <Button variant="danger" className="w-100" onClick={() => buySell('sell')}>Sell</Button>
                        </Col>
                    </Row>
                </Form>
            </Meme>
        </React.Fragment>
    );

}

export default ManageMeme;
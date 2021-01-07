import React, {useEffect, useState} from 'react';
import {Table, Button} from 'react-bootstrap'
import axios from 'axios';
import { useHistory } from 'react-router';

const Portfolio = (props) => {

    const [total, setTotal] = useState(0);
    const [portfolio, setPortfolio] = useState([]);
    const [userData, setUserData] = useState(null);

    const history = useHistory();

    useEffect(() => {
        axios.get('/api/v1/portfolio/')
        .then((res) => {
            setPortfolio(res.data);
            let _total = 0;
            res.data.forEach((item) => {
                _total += item.price * item.quantity;
            });
            setTotal(_total);
        })
        .catch((err) => {

        })
    }, []);

    useEffect(() => {
        axios.get('/api/v1/userdata/')
        .then((res) => {
            setUserData(res.data)
            props.setUserData(res.data);
        })
        .catch((err) => {

        })
    }, []);

    return (
        <React.Fragment>
            <h1>Portfolio</h1>
            <hr/>
            <p>Total assets: {total + (userData === null ? 0 : userData.balance)}Ð</p>
            <Table striped variant="light">
                <thead>
                    <tr>
                        <th>Meme</th>
                        <th>Price (Ð)</th>
                        <th>Quantity</th>
                        <th>Total Value (Ð)</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        portfolio.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price * item.quantity} Ð</td>
                                    <td><Button variant="primary" onClick={() => history.push(`/manage/${item.id}`)}>Manage</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );

}

export default Portfolio;
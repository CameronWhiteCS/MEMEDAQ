import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Meme from './Meme.js';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Stonks = (props) => {

    const [memes, setMemes] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('/api/v1/stonks/')
            .then((res) => {
                setMemes(res.data);
            })
            .catch((err) => {

            })
    }, [])


    return (
        <React.Fragment>
            <h1>Stonks</h1>
            <hr />

            {
                memes.map((meme, index) => {
                    return (
                        <React.Fragment key={index}>
                            <h2><Link to={`/meme/${meme.id}`}>{meme.name}</Link></h2>
                            <Meme key={index} meme={meme}>
                                {props.signedIn &&
                                    <Link to={`/manage/${meme.id}/`}>
                                        <Button variant="primary">INVEST</Button>
                                    </Link>
                                }
                            </Meme>
                            <br />
                        </React.Fragment>
                    );
                })
            }
        </React.Fragment>
    );

}

export default Stonks;
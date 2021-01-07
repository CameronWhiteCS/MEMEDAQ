import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Meme from './Meme';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ViewMeme = (props) => {

    const [meme, setMeme] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.get(`/api/v1/meme/${id}/`)
            .then((res) => {
                setMeme(res.data);
            })
            .catch(props.handleError);
    }, []);

    const deleteMeme = () => {
        axios.post('/api/v1/meme/delete/', {id: id})
        .then((res) => {
            history.push('/stonks/');
        })
        .catch(props.handleError)
    }

    return (
        <React.Fragment>
            <h1>{meme.name}</h1>
            <hr />
            <Meme meme={meme}>
                <p>Creation date: {meme.creation_date}</p>
                {props.userData.admin &&
                    <Button onClick={deleteMeme} variant="danger">
                        Delete Meme
                    </Button>
                }
            </Meme>
        </React.Fragment>
    );

}

export default ViewMeme;
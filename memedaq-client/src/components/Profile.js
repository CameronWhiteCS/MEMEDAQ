import React from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

import {useHistory} from 'react-router-dom';

const Profile = (props) => {

    const history = useHistory();

    const signout = () => {
        axios.get('/api/v1/signout/')
        .then((res) => {
            history.push('/');
            props.setSignedIn(false);
            props.setUserData({});
    
        })
        .catch((err) => {
            props.handleError(err)
        });
    }

    return (
        <React.Fragment>
            <h1>{`${props.userData.username}'s Profile`}</h1>
            <hr/>
            <p>UID: {props.userData.uid}</p>
            <p>Username: {props.userData.username}</p>
            <p>Email: {props.userData.email}</p>
            <p>Balance: {props.userData.balance}Ð</p>
            <Button variant="primary" onClick={signout}>Sign Out</Button>
        </React.Fragment>
    );

}

export default Profile;
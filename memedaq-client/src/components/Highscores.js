import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Highscores = (props) => {

    const [highscores, setHighscores] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/highscores/')
        .then((res) => {
            setHighscores(res.data);
        })
        .catch(props.handleError);
    }, []);

    return (
        <React.Fragment>
            <h1>High Scores</h1>
            <hr />
            {highscores.length > 0 &&
                <React.Fragment>

                    <Table variant="light" striped>
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                highscores.map((player, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{player.username}</td>
                                            <td>{player.balance}Ð</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </React.Fragment>
            }
            {
                highscores.length === 0 &&
                <p>Loading...</p>
            }
        </React.Fragment>
    );

}

export default Highscores;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {Button} from 'react-bootstrap';

const ViewArticle = (props) => {

    const [article, setArticle] = useState({})
    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`/api/v1/article/${id}/`)
                .then((res) => {
                    setArticle(res.data);
                })
                .catch(props.handleError);
        }
    }, [id]);

    return (
        <React.Fragment>
            <h1>{article.title}</h1>
            <hr />
            <ReactMarkdown>
                {article.text}
            </ReactMarkdown>
            <hr/>
            <p>{article.creation_date}</p>
            {props.userData.admin &&
                <Link to={`/news/${id}/edit`}>
                    <Button>Edit</Button>
                </Link>
            }
        </React.Fragment>
    );

}

export default ViewArticle;
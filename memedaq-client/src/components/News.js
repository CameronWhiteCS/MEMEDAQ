import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);

    const loadArticles = (page) => {
        axios.get(`/api/v1/news/${page}/`)
            .then((res) => {
                setArticles(res.data);
            })
            .catch(props.handleError);
    }

    const pageForward = () => {
        if (articles.length > 0) {
            setPage(page + 1);
            loadArticles(page + 1);
        }
    }

    const pageBack = () => {
        if (page > 1) {
            setPage(page - 1);
            loadArticles(page - 1);
        }
    }

    useEffect(() => loadArticles(1), []);

    return (
        <React.Fragment>
            <h1>News</h1>
            <hr />
            {
                articles.length > 0 && articles.map((article, index) => {
                    return (
                        <div key={index}>
                            <h2><Link to={`/news/${article.id}`}>{article.title}</Link></h2>
                            <p>{article.description}</p>
                        </div>
                    );
                })
            }
            {
                articles.length === 0 && 
                <p>There doesn't seem to be anything here ¯\_(ツ)_/¯</p>
            }
            <Button onClick={pageBack} disabled={page <= 1}>{"<--"}</Button> &nbsp;
            <Button onClick={pageForward} disabled={articles.length === 0}>{"-->"}</Button>
        </React.Fragment>
    );

}

export default News;
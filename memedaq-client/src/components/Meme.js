import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import * as Recharts from "recharts/umd/Recharts";
const LineChart = Recharts.LineChart;
const Line = Recharts.Line;
const YAxis = Recharts.YAxis;
const XAxis = Recharts.XAxis;
const CartesianGrid = Recharts.CartesianGrid;
const Tooltip = Recharts.Tooltip;
const Legend = Recharts.Legend;
const ResponsiveContainer = Recharts.ResponsiveContainer;

const Meme = (props) => {


    const [chartData, setChartData] = useState(undefined);
    const [days, setDays] = useState(7);

    useEffect(() => {
        if (props.meme.id !== undefined) {
            axios.get(`/api/v1/price_history/?memeId=${props.meme.id}&NumDays=${days}`)
                .then((res) => {

                    console.log(res.data)
                    let data = [];

                    res.data.forEach((dataPoint, index) => {
                        data.push({
                            name: dataPoint.date,
                            price: dataPoint.price
                        })
                    });

                    setChartData(data);

                })
                .catch((err) => {
                    //TODO    
                })
        }
    }, [props.meme.id]);

    return (
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Row>
                <Col xs={12} md={6} xl={3}>
                    <img width={250} height={250} src={props.meme.image_url} />
                    <br />
                    <br />
                </Col>
                <Col xs={12} md={6} xl={9}>
                    <p>Trading price: {props.meme.trading_price}</p>
                    <p>Shares available: {props.meme.stock}</p>
                    <p>Cringe: {props.meme.cringe ? "Yes" : "No"}</p>
                    {props.children}
                </Col>
            </Row>

            {chartData !== undefined &&

                <React.Fragment>
                    <ResponsiveContainer height={300} width="80%">
                        <LineChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="price" stroke="#0095FF" />
                        </LineChart>
                    </ResponsiveContainer>
                </React.Fragment>

            }

        </div>
    );

}

export default Meme;
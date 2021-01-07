import React from "react";

import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

const ControlPanel = (props) => {
  return (
    <React.Fragment>
      <h1>Control Panel</h1>
      <hr/>
      <Row>
        <Col xs={12} md={4}>
          <Link to="/admin/article">
            <Button className="w-100" variant="primary">Create Article</Button>
          </Link>
        </Col>
        <Col xs={12} md={4}>
        <Link to="/admin/meme">
            <Button className="w-100" variant="primary">Create Meme</Button>
          </Link>
        </Col>
        <Col xs={12} md={4}>

        </Col>
        <Col xs={12} md={4}>

        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ControlPanel;

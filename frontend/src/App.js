import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import SubmitForm from "./SubmitForm";
import ImagesGrid from "./ImagesGrid";

const App = () => {
    return (
        <div className="App">
            <Container>
                <Row className="p-3">
                    <Col>
                        <h1>Simple image storing:</h1>
                    </Col>
                </Row>
                <Row className="p-3">
                    <Col>
                        <SubmitForm/>
                    </Col>
                </Row>
                <Row className="p-3">
                    <Col>
                        <h1>Images stored:</h1>
                    </Col>
                </Row>
                <Row className="p-3">
                    <Col>
                        <ImagesGrid/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App;
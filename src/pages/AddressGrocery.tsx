import React from 'react';
import '../assets/styles/addressGrocery.scss';
import Footer from '../Components/Footer/Footer';
import Maps from '../Components/Maps/Maps';
import { Container, Row, Col } from 'react-bootstrap';
import { LoadScript } from "@react-google-maps/api";

export function AddressGrocery() {
    const googleMapsApiKey = process.env.REACT_APP_API_KEY;

    return (
        <div id="addressGrocery">
            <main>
                {/* LoadScript move para o AddressGrocery */}
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                    <Container>
                        <Row>
                            <Col />
                            <Col xs={9}>
                                <h3>Endereço do mercado:</h3>
                                <hr />
                                {/* Maps agora recebe apenas props necessárias */}
                                <Maps />
                            </Col>
                            <Col />
                        </Row>
                    </Container>
                </LoadScript>
            </main>
            <Footer />
        </div>
    );
}

export default AddressGrocery;

import React, { useState } from "react";
import "../assets/styles/profileRegister.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputMask from "react-input-mask";
import Footer from "../Components/Footer/Footer";
import Regions from "../Components/Regions/Regions";
import { CreateUser } from "../services/MySqlData/UserService";
import { HandleCep } from "../utils/HandleCep";
import PasswordStrengthBar from "react-password-strength-bar";
import { useJsApiLoader } from "@react-google-maps/api";

export function ProfileRegister() {
    const ApiKeyMaps: string = process.env.REACT_APP_API_KEY || "";
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpfInput, setCpfInput] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const scoreWords = [
        'Senha muito fraca',
        'Senha fraca',
        'Senha razoável',
        'Senha forte',
        'Senha muito forte',
    ];

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ApiKeyMaps,
    });

    const handleCep = async (event: React.FormEvent) => {
        event.preventDefault();
        await HandleCep(event, {
            cep,
            setAddress,
            setCity,
            setRegion,
            setNeighborhood,
            setIsInputDisabled,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setCep(cep.replace(/\D/g, ""));
        setCpfInput(cpfInput.replace(/\D/g, ""));
        if (cep.length === 8) {
            CreateUser({
                name,
                email,
                cep,
                address,
                number,
                neighborhood,
                city,
                region,
                newPassword,
                newPasswordRepeat,
                cpfInput,
            });
        }
    };

    // Renderizando o componente apenas se o script estiver carregado
    return (
        <div id="profileRegister">
            {isLoaded ? (
                <Container id="container">
                    <div id="title" className="anton-sc-regular"><h4>Dados Pessoais</h4></div>
                    <Form onSubmit={handleSubmit} encType='multipart/form-data' className="anton-sc-regular">
                        <Row>
                            <Col>
                                <Form.Group className='mb-3' controlId='FullName'>
                                    <Form.Label> Nome completo </Form.Label>
                                    <Form.Control value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Nome completo' required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='Email'>
                                    <Form.Label> Email </Form.Label>
                                    <Form.Control value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='user@user.com' required/>
                                </Form.Group>                   
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className='mb-3' controlId='cpf'>
                                    <Form.Label> CPF </Form.Label>
                                        <Form.Control value={cpfInput} onChange={e => setCpfInput(e.target.value)} type='text' as={InputMask} mask="999.999.999-99" placeholder='000.000.000-00' required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='CEP'>
                                    <Form.Label> CEP </Form.Label>
                                    <div id="cepBtn">
                                        <Form.Control value={cep} onChange={e => setCep(e.target.value)} type='text' as={InputMask} mask="99999-999" placeholder='00000-000' required />
                                        <Button onClick={handleCep} variant="secondary">Buscar</Button>   
                                    </div>
                                </Form.Group>
                            </Col>
                            
                            <Col xs={7}>
                                <Form.Group className='mb-3' controlId='Address'>
                                    <Form.Label> Endereço </Form.Label>
                                    <Form.Control value={address} onChange={e => setAddress(e.target.value)} type='text' placeholder='Rua' disabled ={isInputDisabled} required/>
                                </Form.Group>
                            </Col>  
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <Form.Group className='mb-3' controlId='Number'>
                                    <Form.Label> Numero </Form.Label>
                                    <Form.Control value={number} onChange={e => setNumber(e.target.value)} type='text' placeholder='99999' required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='Neighborhood'>
                                    <Form.Label> Bairro </Form.Label>
                                    <Form.Control value={neighborhood} onChange={e => setNeighborhood(e.target.value)} type='text' placeholder='Guatupê' disabled ={isInputDisabled} required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8}>
                                <Form.Group className='mb-3' controlId='City'>
                                    <Form.Label> Cidade </Form.Label>
                                    <Form.Control value={city} onChange={e => setCity(e.target.value)} type='text' placeholder='São José dos Pinhais' disabled ={isInputDisabled} required/>
                                </Form.Group>                
                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='Region'>
                                    <Form.Label> Estado </Form.Label>
                                    <Form.Select  aria-label='PR' id='region' value={region} onChange={e => setRegion(e.target.value)} disabled ={isInputDisabled} required>
                                        <Regions />
                                    </Form.Select>
                                </Form.Group>             
                            </Col>
                        </Row>
                        <Row>
                            <Col id="newPassword">
                                <Form.Group className="mb-3" controlId="newPassword">
                                    <Form.Label>Digite uma senha</Form.Label>
                                    <Form.Control value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" required/>
                                    <PasswordStrengthBar password={newPassword} scoreWords={scoreWords} />
                                </Form.Group>
                            </Col>
                            <Col id="repeatPassword">
                                <Form.Group className="mb-3" controlId="repeatPassword">
                                    <Form.Label>Repita a senha</Form.Label>
                                    <Form.Control value={newPasswordRepeat} onChange={e => setNewPasswordRepeat(e.target.value)} type="password" required/>
                                </Form.Group>
                            </Col>
                            <Col xs={3} id="btns">
                                <Button variant='warning' type="reset" value="reset">Limpar</Button> <Button variant='success' type='submit'>Salvar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            ) : (
                <div>Carregando...</div>
            )}
            <Footer />
        </div>
    );
}


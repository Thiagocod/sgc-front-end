import React from 'react';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './Styles.scss';
import Logo from '../../assets/images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import QRcode from '../../assets/images/qrcode.svg';
const Footer: React.FC = () =>{
    return(
        <footer>
            <Container id='container'>
            <Row id='footerItens'>
                <Col>
                    <img id='logoFooter' src={Logo} alt="logo" />
                </Col>
                <Col>
                    <h4>Intitucional</h4>
                    <ul>
                        <li><a href="#privacidade">Privacidade</a></li>
                        <li><a href="#TermosSericos">Termos de Serviço</a></li>
                        <li><a href="#CodigoConduta">Código de conduta</a></li>
                        <li><a href="#CentralAjuda">Central de ajuda</a></li>
                    </ul>
                </Col>
                <Col>
                    <h4>Suporte</h4>
                    <ul>
                        <li><a href="#FaleConsoco">Fale Conosco</a></li>
                    </ul>
                </Col>
                <Col>
                    <h4>Siga S.G.C</h4>
                    <ul>
                    <li> <a href="#facebook"><FontAwesomeIcon id='facebook' icon={faFacebook} /></a> <a href="#instagram"><FontAwesomeIcon id='instagram' icon={faInstagram} /></a> </li>
                    </ul>
                </Col>
                <Col id='endFooter'>
                    <a href="https://tgvp.com.br"><img src={QRcode} alt="imagem do QRcode" /></a>
                    <span>Software Grocery Cheaper®</span>
                </Col>
            </Row>
            </Container>
        </footer>
    )
}
export default Footer
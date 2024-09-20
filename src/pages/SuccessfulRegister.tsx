import '../assets/styles/successfulRegister.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import imgLog from '../assets/images/LOGO TCC TYPE 02.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileWink } from '@fortawesome/free-solid-svg-icons';

export function SuccessfulRegister (){
    const returnBtn = () => {
        window.location.href = "/user/search"
    };
    const registerAgainBtn = () => {
        window.location.href = "/user/register"
    };
    return (
        <div id="successfulRegister">
            <Container>
                <Row>
                    <Col />
                    <Col xs={9}>
                        <div id='title'>
                            <h1>Produto registrado com sucesso</h1>
                        </div>
                        <hr />
                        <Row id='logoSuccessful'>
                            <img src={imgLog} alt="log" />
                        </Row>
                        <hr />
                        <Row>
                            <Col/>
                            <Col xs={9} id='colBtn'>
                                <h4>Obrigado por registrar sua oferta!</h4>
                                <p>Nosso time de analistas está analisando a oferta e em breve estará disponivel nas pesquisas <FontAwesomeIcon icon={faFaceSmileWink} style={{color: '#fff956', fontSize:"30px", backgroundColor: '#000', borderRadius: '50%'}}/>.</p>
                                <Button id='returnBtn' variant="warning" onClick={returnBtn}><span>Retornar</span></Button> <Button id='registerAgainBtn' variant="success" onClick={registerAgainBtn}><span>Registrar novo produto</span></Button>
                            </Col>
                            <Col />
                        </Row>
                    </Col>
                    <Col />
                </Row>
            </Container>
        </div>
       
    )
}
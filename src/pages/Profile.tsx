import '../assets/styles/profile.scss';
import Footer from '../Components/Footer/Footer'
import Tab  from 'react-bootstrap/tab';
import Tabs  from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import CloseButton from 'react-bootstrap/CloseButton';
import PersonalData from '../Components/PersonalData/PersonalData';
import Security from '../Components/Security/Security';
import ProductsInserts from '../Components/ProductsInserts/ProductsInserts';
import MyNoteProducts from '../Components/MyNoteProducts/MyNoteProducts';
import DeleteProfile from '../Components/DeleteProfile/DeleteProfile';

export function Profile(){
    const CloseBtn = () => {
        window.location.href = "/user/search"
    };
    return(
        <div id="profile">
            <main>
                <Container className='tabsProfile'>
                    <Row>
                        <Col id='iconProfile'>
                            <div id='icon'><FontAwesomeIcon id='faUser' icon={faUser} /></div>
                        </Col>
                        <Col xs={10} id='TabsProfileCol'>
                            <Tabs
                            defaultActiveKey="personalData"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            >
                                <Tab eventKey="personalData" title="Dados Pessoais">
                                    <PersonalData />
                                </Tab>
                                <Tab eventKey="Security" title="Segurança">
                                    <Security />
                                </Tab>
                                <Tab eventKey="ProductsInserts" title="Ofertas cadastradas">
                                    <ProductsInserts />
                                </Tab>
                                <Tab eventKey="NotesUser" title="Notas Cadastradas">
                                    <MyNoteProducts />
                                </Tab>
                                <Tab eventKey="DeleteProfile" title="Excluir perfil">
                                    <DeleteProfile />
                                </Tab>
                            </Tabs>
                        </Col>
                        <Col className='colClose'>
                            <div id="ButtonClose">
                                <CloseButton onClick={CloseBtn} id='close'/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer></Footer>
        </div>
        
    )
}
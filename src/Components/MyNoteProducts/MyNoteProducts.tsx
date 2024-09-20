import React, { useEffect, useState } from 'react';
import './styles.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Alert, Badge, Button, Form, Table } from 'react-bootstrap';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { DeleteNote, MyNoteProduct, productNote } from '../../services/MySqlData/NoteService';
import { LocalStorageData } from '../../utils/LocalStorageData';

const MyNoteProducts: React.FC = () => {
    const [show, setShow] = useState(false);
    const [idUser, setIdUser] = useState<string | null>(null);
    const [data, setData] = useState<productNote[]>([])
    useEffect(() => {
        const loadId = async () => {
            const id = await LocalStorageData.getIdUser();
            setIdUser(id);
        };
        loadId();
    }, []);
    try{
      useEffect(() => {
        const loadData = async () =>{
          if (idUser !== null) {
            const dataNote = await MyNoteProduct(idUser);
            if(dataNote){
              setData(dataNote)
            }
          }
        }
      loadData();      
      }, [idUser]);
    }catch (error){
      console.error(error);
    }
    const handleDelete = async (id?: string) => {
        if (!id) {
            console.error('Sem id para continuar com a ação');
            return;
        }
        try {
            await DeleteNote(id);
            setShow(true);
            const loadData = async () =>{
                if (idUser !== null) {
                  const dataNote = await MyNoteProduct(idUser);
                  if(dataNote){
                    setData(dataNote)
                  }
                }
              }
            loadData();
        } catch (error) {
            console.error('Erro ao excluir a nota:', error);
        }
    };
    return (
        <div id="myNoteProducts">
            <Alert variant="success" show={show}>
                <Alert.Heading>Excluir Nota</Alert.Heading>
                <p>Sua nota foi excluída com sucesso!</p>
                <Button onClick={() => setShow(false)} variant='secondary'>Fechar</Button>
            </Alert>
                
            {data.map((item, index) => (
                <>
                <Table>
                    <tr key={index}>
                        <li key={item.idNotesPrice}>
                                <Container style={{ paddingLeft: 'auto', paddingRight: 'auto' }}>
                                    <Accordion defaultActiveKey="1" style={{ width: '26rem' }}>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                <Col lg={9}>
                                                    {item.nameProduct}
                                                </Col>
                                                <Col lg={2}>
                                                    <span><Badge bg="warning">{item.valor}</Badge><FontAwesomeIcon className='solidStar' icon={faStarSolid} style={{ color: '#fff956', fontSize: '18px' }} /></span>
                                                </Col>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <Row>
                                                    <Form.Group>
                                                        <Form.Control as="textarea" value={item.comments} style={{ height: '120px' }} disabled />
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <li>Data de criação: {item.createAt}</li>
                                                        <li>Valor da oferta: {item.priceProduct}</li>
                                                        <li>Mercado: {item.nameBusiness}</li>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Button variant='danger' onClick={() => handleDelete(item.idNotesPrice)}>Excluir</Button>
                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Container>
                            </li>
                    </tr>
                </Table>
                </>
            ))}
        </div>
    );
};

export default MyNoteProducts;


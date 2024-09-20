import '../assets/styles/product.scss'
import Footer from '../Components/Footer/Footer'
import {Row, Col, Container, Card, Accordion, FloatingLabel, InputGroup, Button, CloseButton, Form, Table, Badge} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { DescriptionProduct } from '../services/MySqlData/ProductService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createNote, ListNote } from '../services/MySqlData/NoteService';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
interface IFormInput {
    iduser: string;
    idproduct: string;
    valor: string;
    comments: string;
}
//Authenticated();
export function Product(){
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const CloseBtn = () => {
        window.location.href = "/user/search"
    };
    const query = useQuery();
    const idUser = localStorage.getItem('idUser');
    const idProduct = parseInt(query.get('id') || '0');
    const aLat = parseFloat(query.get('a_lat') || '0');
    const aLng = parseFloat(query.get('a_lng') || '0');
    setValue('iduser', `${idUser}`);
    setValue('idproduct', `${idProduct}` );
    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try{
            await createNote(data);
            window.location.href = `/user/product?id=${idProduct}&a_lat=${aLat}&a_lng=${aLng}` ;
        }catch(error){
            console.log(error)
            alert('Não foi possivel registrar nota!');
        }
      };
    const product = DescriptionProduct(idProduct);
    const notes = ListNote(idProduct);
    return(
        <div id="product">
            <main>
                <Container>
                    <Row>
                        <Col lg={{ span: 4, offset: 4}}>  
                        <h2 style={{textAlign: 'center', color: '#ca5df3', marginLeft: 'auto', marginRight: 'auto'}}> Produto em Promoção: </h2> 
                            {product.map(item =>(
                                <>  
                                    <li key={item.id} style={{marginBottom: '1rem'}}>
                                            <Link to={`/product?id=${item.id}`} id='link' style={{textDecoration: 'none'}}>
                                                <Card style={{width: '29rem'}}>
                                                    <Card.Img variant="top" src={item.imageProduct} style={{maxHeight: '15rem', maxWidth: '15rem', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>
                                                    <Card.Body>
                                                        <Card.Title style={{textAlign: 'center', fontSize: '2rem'}}>{item.nameProduct}</Card.Title>
                                                        <Card.Text>
                                                            <Table className='tableDescription' style={{borderBottomColor: 'transparent'}}>
                                                                <thead>
                                                                    <tr>
                                                                    <th className="valueProduct" style={{paddingLeft: '1rem'}}><strong style={{color:'#f72468'}}>R$</strong> <span style={{color:'#ca5df3', fontSize:'26px'}}>{item.price}</span></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                    <th className="descriptionProductTh">Marca:</th>
                                                                    <td className="valueProduct">{item.mark}</td>
                                                                    </tr>
                                                                    <tr>
                                                                    <th className="descriptionProductTh">Mercado:</th>
                                                                    <td className="valueProduct"><Link to={`/user/address_grocery?a_lat=${aLat}&a_lng=${aLng}&b_lat=${item.lat}&b_lng=${item.lng}`}>{item.business} <FontAwesomeIcon className='iconLink' icon={faArrowUpRightFromSquare}/></Link></td>
                                                                    </tr>
                                                                    <tr>
                                                                    <th className="descriptionProductTh">Peso:</th>
                                                                    <td className="valueProduct">{item.weight}</td>
                                                                    </tr>
                                                                    <tr>
                                                                    <th className="descriptionProductTh">Promoção até:</th>
                                                                    <td className="valueProduct">{item.expirationPrice}</td>
                                                                    </tr>
                                                                    <tr>
                                                                    <th className="descriptionProductTh">Data de criação:</th>
                                                                    <td className="valueProduct">{item.createAt}</td>
                                                                    </tr>
                                                                    <tr>
                                                                    <th className="descriptionProductTh">Nota:</th>
                                                                    <td className="valueProductStar">{item.notesMedia}<FontAwesomeIcon style={{color: '#fff956'}} icon={faStarSolid}/> </td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>                            
                                            </Link>
                                    </li>
                                </>
                            ))}
                            <Accordion defaultActiveKey="1" style={{width: '29rem'}}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Avaliar</Accordion.Header>
                                    <Accordion.Body id='formComments'>
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <Row>
                                                <Form.Group>
                                                {errors.valor && <p>{errors.valor.message}</p>}
                                                <FloatingLabel controlId="floatingTextarea2" label="Comentario">
                                                <Form.Control as="textarea" placeholder='Comentario' style={{height: '120px'}} {...register('comments')}/>
                                                </FloatingLabel>
                                                </Form.Group>
                                            </Row>
                                            <Row style={{marginTop: '2px'}}>
                                                    <Col lg={5}>
                                                        <Row>
                                                            <InputGroup>
                                                                <Col>
                                                                    <InputGroup.Text id='nota'>Nota <span style={{color: '#fff956', fontSize: '16px'}}><FontAwesomeIcon icon={faStarSolid} /></span></InputGroup.Text>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Control type="number" min="1" max="5" {...register('valor', { required: 'nota obrigatoria' })} />
                                                                </Col>
                                                            </InputGroup>
                                                        </Row>
                                                    </Col>
                                                    <Col lg={{ span: 5, offset: 2}} style={{textAlign: 'right'}}>
                                                        <Button variant='info' type="reset" value="reset" className='btn'>Limpar</Button><Button variant="success" className='btn' type='submit'>Enviar</Button>
                                                    </Col>
                                            </Row>
                                        </Form>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <Accordion defaultActiveKey="1" style={{width: '29rem'}}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Avaliações</Accordion.Header>
                                    <Accordion.Body>
                                        {notes.map(item =>(
                                            <>
                                                <li id={item.idNotesPrice}>
                                                    <Accordion defaultActiveKey="1" style={{width: '26rem'}}>
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header>
                                                                    <Col lg={9}>
                                                                        Usuario: {item.nameUser}
                                                                    </Col>
                                                                    <Col lg={2}>
                                                                        <span><Badge bg="warning">{item.valor}</Badge><FontAwesomeIcon className='solidStar' icon={faStarSolid} style={{color: '#fff956', fontSize: '18px'}} /></span>
                                                                    </Col>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <Row>
                                                                    <Form.Group>
                                                                        <Form.Control as="textarea" value={item.comments} style={{height: '120px',}} disabled />
                                                                    </Form.Group>
                                                                </Row>
                                                                <Row>
                                                                    <Col style={{textAlign: 'right', marginRight: '2px'}}>
                                                                        <strong>{item.createAt}</strong>
                                                                    </Col>
                                                                </Row>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </li>
                                            </>))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            </Col>
                            <Col>
                                <div id="ButtonClose"> <CloseButton onClick={CloseBtn} id='close'/></div>
                            </Col>
                        </Row>
                </Container>
            </main>
            <Footer />
        </div>
    )
}
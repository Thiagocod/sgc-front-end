import React, {useState, useEffect} from 'react';
import './styles.scss';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons/faStar';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare';
import { DeleteProduct, UserListProducts } from '../../services/MySqlData/ProductService';
import { Link } from 'react-router-dom';
import { Alert, Button, Stack } from 'react-bootstrap';

const ProductsInserts: React.FC = () =>{
    const [idUser, setIdUser] = useState<string | undefined>(undefined);
    const [show, setShow] = useState(false);
    const [nameProduct, setNameProduct] = useState('');
    const [dateProduct, setDateProduct] = useState('');
    const [idProduct, setIdProduct] = useState('');
    const deleteAlert = (name: string, data: string, id: string) => {
        setShow(true);
        setNameProduct(name);
        setDateProduct(data);
        setIdProduct(id)
    };
    const xsDescription = 7;
    const id = localStorage.getItem('idUser')
    useEffect(()=>{
      if(id){
      setIdUser(id);  
        }
    }, [id]);
    const data = UserListProducts({idUser: idUser});
    const handleDelete = (idProduct: string) =>{
            DeleteProduct(idProduct);
            setShow(false);
    }
    return(
        <div id="productList">
            <main>
                <Container id='containerSearch'>
                    <Alert show={show} variant="success">
                        <Alert.Heading>Excluir Oferta?</Alert.Heading>
                        <p>
                            Tem certeza que deseja excluir a oferta {nameProduct}?
                        </p>
                        <p>
                            Data de criação: {dateProduct}
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                        <Stack direction="horizontal" gap={3}>
                            <Button onClick={() => setShow(false)} variant="outline-success">
                                Cancelar
                            </Button>
                            <Button onClick={() => handleDelete(idProduct)} variant="outline-success">
                                Excluir
                            </Button>
                        </Stack>
                        
                        </div>
                    </Alert>                          
                    {data.map(item =>(
                        <>  {/* <Link to={`/user/product?id=${item.id}`} id='link'>   */}
                                <Row className='row'>
                                    <Col />
                                    <Col className="imageProduct">
                                        <img style={{width: "11rem", height: "11rem"}} src={item.imageProduct} alt="Imagem do produto" />
                                    </Col>
                                    <Col className="descriptionProduct" xs={xsDescription}>
                                        <Table className='tableDescription'>
                                            <tr>
                                            <th className="descriptionProductTh">Nome:</th>
                                            <th className="valueProduct">{item.nameProduct}</th>
                                            </tr>
                                            <tr>
                                            <th className="descriptionProductTh">Valor:</th>
                                            <th className="valueProduct">R$ {item.price}</th>
                                            </tr>
                                            <tr>
                                            <th className="descriptionProductTh">Marca:</th>
                                            <th className="valueProduct">{item.mark}</th>
                                            </tr>
                                            <tr>
                                            <th className="descriptionProductTh">Mercado:</th>
                                            <th className="valueProduct"><Link to={`/user/address_grocery?lat=${item.lat}&lng=${item.lng}`}>{item.business} <FontAwesomeIcon className='iconLink' icon={faArrowUpRightFromSquare}/></Link></th>
                                            </tr>
                                            <tr>
                                            <th className="descriptionProductTh">Peso:</th>
                                            <th className="valueProduct">{item.weight}</th>
                                            </tr>
                                            <tr>
                                            <th className="descriptionProductTh">Promoção até:</th>
                                            <th className="valueProduct">{item.expirationPrice}</th>
                                            </tr>
                                            <tr>
                                            <th className="descriptionProductTh">Data de criação:</th>
                                            <th className="valueProduct">{item.createAt}</th>
                                            </tr>
                                            <tr>
                                            <th className="descriptionProductTh">Nota:</th>
                                            <th className="valueProductStar"><FontAwesomeIcon className='solidStar' icon={faStarSolid}/> {item.notesMedia}</th>
                                            </tr>
                                        </Table>
                                    </Col>
                                    <Col>
                                        <Row/>
                                        <Row>
                                            {!show && <Button onClick={() => deleteAlert(item.nameProduct, item.createAt, item.id )}>Excluir oferta</Button>}
                                        </Row>
                                        <Row/>
                                    </Col>
                                </Row>
                                <hr />
                            {/* </Link> */}
                        </>
                    ))}
                </Container>              
            </main>
        </div>      
    )
}
export default ProductsInserts
import React, {useState, useEffect}from 'react';
import './styles.scss';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons/faStar';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare';
import { ListProducts } from '../../services/MySqlData/ProductService'
import { Link} from 'react-router-dom'

interface ProductsListProps {
    searchTerm?: string;
    distanceTerm?: string;
    aLatTerm?: string;
    aLngTerm?: string;
}
const ProductsList: React.FC<ProductsListProps> = ({ searchTerm, distanceTerm, aLatTerm, aLngTerm }) =>{
    const [searchLowerCase, setSearchLowerCase] = useState('');
    const [distance, setDistance] = useState('10');
    const [aLat, setALat] = useState('');
    const [aLng, setALng] = useState('');

    const data = ListProducts({searchLowerCase, distance});
    useEffect(() => {
        if (searchTerm) {
            setSearchLowerCase(searchTerm.toLocaleLowerCase());
        } else {
            setSearchLowerCase('');
        }
    }, [searchTerm]);
    useEffect(() => {
        if (aLatTerm) {
            setALat(aLatTerm);
        }
        if(aLngTerm){
            setALng(aLngTerm);
        }
    }, [aLatTerm, aLngTerm]);
    useEffect(() => {
        if (distanceTerm) {
            setDistance(distanceTerm);
        }
    }, [distanceTerm]);
    const xsDescription = 5;
    return(
        <div id="productList">
            <main>
                <Container id='containerSearch'>
                    {data.map(item =>(
                        <>  <Link to={`/user/product?id=${item.id}&a_lat=${aLat}&a_lng=${aLng}`} id='link'>                            
                                <Row className='row'>
                                    <Col />
                                    <Col className="imageProduct">
                                        <img src={item.imageProduct} alt="Imagem do produto" />
                                    </Col>
                                    <Col className="descriptionProduct" xs={xsDescription}>
                                        <Table className='tableDescription'>
                                                <tr>
                                                <th className="descriptionProductTh">Produto:</th>
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
                                                <th className="valueProduct"><Link to={`/user/address_grocery?a_lat=${aLat}&a_lng=${aLng}&b_lat=${item.lat}&b_lng=${item.lng}`}>{item.business} <FontAwesomeIcon className='iconLink' icon={faArrowUpRightFromSquare}/></Link></th>
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
                                    <Col />
                                </Row>
                                <hr />
                            </Link>
                        </>
                    ))}
                </Container>              
            </main>
        </div>
    )
}

export default ProductsList
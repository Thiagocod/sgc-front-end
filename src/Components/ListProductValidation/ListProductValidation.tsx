import React, {useState, useEffect}from 'react';
import './styles.scss';
import { Container, Row, Col, Table, Stack} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons/faStar';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare';
import { ValidationListProducts } from '../../services/MySqlData/ProductService'
import { Link} from 'react-router-dom'

interface ProductsListProps {
    searchTerm?: string;
    distanceTerm?: string;
}
const ListProductValidation: React.FC<ProductsListProps> = ({ searchTerm, distanceTerm }) =>{
    const [searchLowerCase, setSearchLowerCase] = useState('');
    const [distance, setDistance] = useState('10');
    const data = ValidationListProducts({searchLowerCase, distance});
    useEffect(() => {
        if (searchTerm) {
            setSearchLowerCase(searchTerm.toLocaleLowerCase());
        } else {
            setSearchLowerCase('');
        }
    }, [searchTerm]);
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
                        <>  
                            <Stack gap={3}>
                                <Link to={`/adm/validation?id=${item.id}`} id='link'>
                                    <Row className='row'>
                                        <Col />
                                        <Col className="imageProduct">
                                            <img src={item.imageProduct} alt="Imagem do produto" />
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
                                                <th className="valueProduct"><Link to={`/adm/business?id=${item.idBusiness}&location=list_validation&idProduct=${item.id}`} style={{backgroundColor: 'transparent'}}>{item.business} <FontAwesomeIcon className='iconLink' icon={faArrowUpRightFromSquare}/></Link></th>
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
                                </Link>
                            </Stack>                           
                        </>
                    ))}
                </Container>              
            </main>
        </div>
    )
}

export default ListProductValidation
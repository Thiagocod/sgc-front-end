import { Row, Col, Container, CloseButton, Table} from 'react-bootstrap';
import '../assets/styles/validation.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Business, SearchBusiness } from '../services/MySqlData/BusinessService';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export function ValidationBusiness() {
    const query = useQuery();
    const idProduct = query.get('idProduct') || '0';
    const idBusiness = query.get('id') || '0';
    const location = query.get('location') || '0';
    const [business, setBusiness] = useState<Business[]>([]);
    useEffect(() => {
        const loadProduct = async () => {
            const businessData = await SearchBusiness(idBusiness);
            if(!businessData){
                return
            }
            setBusiness(businessData);
        };
        loadProduct();
    }, [idBusiness]);
    const handleClose = (id: string) =>{
        if(location === "validation"){
           window.location.href = `/adm/${location}?id=${idProduct}`
        }else if(location === "list_validation"){
            window.location.href = `/adm/${location}`
        }
    }
    return (
        <div id="validation">
            <main>
                <Container>
                    <Row>
                        <Col lg={{offset: 4, span: 4}}>
                                    {business.map(item =>(
                                        <>  
                                            <h1>Dados do negócio: </h1>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <th>Id:</th>
                                                        <td key={item.id}>{item.id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Negócio:</th>
                                                        <td>{item.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>CEP:</th>
                                                        <td>{item.cep}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Rua:</th>
                                                        <td>{item.street}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Numero:</th>
                                                        <td>{item.number}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bairro:</th>
                                                        <td>{item.neighborhood}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Cidade:</th>
                                                        <td>{item.city}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Estado:</th>
                                                        <td>{item.Region_Name}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <div style={{textAlign: 'right'}} >
                                            <CloseButton onClick={() => handleClose(item.id)}/>
                                            </div>
                                        </>
                                    ))}
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    );
}

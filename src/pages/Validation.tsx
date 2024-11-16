import { useEffect, useState } from 'react';
import { Row, Col, Container, Card, Button, CloseButton, Form, InputGroup, ToggleButton, Stack} from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { ProductValidation, UpdateProduct } from '../services/MySqlData/ProductService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/validation.scss';
import SelectCategory from '../Components/SelectCategory/SelectCategory';
import { useForm, SubmitHandler } from 'react-hook-form';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

interface ItemProduct {
    id: string;
    imageProduct: string;
    nameProduct: string;
    idCategory: string;
    idBusiness: string;
    business: string;
    price: number;
    mark: string;
    weight: string;
    lat: number;
    lng: number;
    expirationPrice: string;
    createAt: string;
}

interface SetUpdateProduct {
    id: string;
    nameProduct: string;
    idCategory: string;
    price: string;
    mark: string;
    weight: string;
    expirationPrice: string;
    validation: string;
}

export function Validation() {
    const query = useQuery();
    const [inputDisable, setInputDisable] = useState<boolean>(true);
    const idProduct = parseInt(query.get('id') || '0');
    const [product, setProduct] = useState<ItemProduct[]>([]);
    const [item, setItem] = useState<ItemProduct | null>(null);
    const { register, handleSubmit, setValue} = useForm<SetUpdateProduct>();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if(checked){
            setInputDisable(false);
        }else if(!checked){
            setInputDisable(true);
        }else{
            console.error('erro no botão de editar')
        }
    },[checked]);

    useEffect(() => {
        const loadProduct = async () => {
            const productData = await ProductValidation(idProduct);
            setProduct(productData);
        };
        loadProduct();
    }, [idProduct]);

    useEffect(() => {
                if (product.length > 0) {
                    const initialItem = product[0];
                    setItem(initialItem);
                    setValue('id', initialItem.id);
                    setValue('nameProduct', initialItem.nameProduct);
                    setValue('idCategory', initialItem.idCategory);
                    setValue('price', initialItem.price.toString());
                    setValue('mark', initialItem.mark);
                    setValue('weight', initialItem.weight);
                    setValue('expirationPrice', initialItem.expirationPrice);

        }
    }, [product, setValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(name as keyof SetUpdateProduct, value);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValue(name as keyof SetUpdateProduct, value);
    };
    const handleReset = () => {
        if (product.length > 0) {
            const initialItem = product[0];
            setItem(initialItem);
            setValue('id', initialItem.id);
            setValue('nameProduct', initialItem.nameProduct);
            setValue('idCategory', initialItem.idCategory);
            setValue('price', initialItem.price.toString());
            setValue('mark', initialItem.mark);
            setValue('weight', initialItem.weight);
            setValue('expirationPrice', initialItem.expirationPrice);
        }
    };

    const onSubmit: SubmitHandler<SetUpdateProduct> = async (data) => {
        const update = await UpdateProduct(data);
        if (update != null) {
            alert('Cadastro atualizado com sucesso');
            window.location.href = "/adm/list_validation";
        }
    };

    const CloseBtn = () => {
        window.location.href = "/adm/list_validation";
    };

    return (
        <div id="validation">
            <main>
                <Container>
                    <Row>
                        <Col lg={{ span: 4, offset: 4 }}>
                            {item && (
                                <li key={item.id} style={{ marginBottom: '1rem', listStyleType: 'none' }}>
                                    <Card style={{ width: '29rem' }}>
                                        <div style={{textAlign:'right'}}>
                                            <CloseButton onClick={CloseBtn} id='close' />
                                        </div>
                                        <Card.Img 
                                            variant="top" 
                                            src={item.imageProduct} 
                                            style={{ 
                                                maxHeight: '15rem', 
                                                maxWidth: '15rem', 
                                                display: 'block', 
                                                marginLeft: 'auto', 
                                                marginRight: 'auto' 
                                            }} 
                                        />
                                        <Card.Body>
                                            <Card.Title style={{ textAlign: 'center', fontSize: '2rem' }}>
                                                {item.nameProduct}
                                            </Card.Title>
                                            <Card.Text>
                                                <Form onSubmit={handleSubmit(onSubmit)}>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <Col lg={5}>
                                                                <Form.Label style={{ fontSize: '18px' }}>Nome do produto: </Form.Label>
                                                            </Col>
                                                            <Col lg={7}>
                                                                <Form.Control
                                                                    type='text'
                                                                    {...register('nameProduct')}
                                                                    onChange={handleInputChange}
                                                                    disabled={inputDisable}
                                                                />
                                                            </Col>
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <Col lg={5}>
                                                                <Form.Label style={{ fontSize: '18px' }}>Valor da oferta: </Form.Label>
                                                            </Col>
                                                            <Col lg={7}>
                                                                <Form.Control
                                                                    type='text'
                                                                    {...register('price')}
                                                                    onChange={handleInputChange}
                                                                    disabled={inputDisable}
                                                                />
                                                            </Col>
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <Col lg={5}>
                                                                <Form.Label style={{ fontSize: '18px' }}>Marca: </Form.Label>
                                                            </Col>
                                                            <Col lg={7}>
                                                                <Form.Control
                                                                    type='text'
                                                                    {...register('mark')}
                                                                    onChange={handleInputChange}
                                                                    disabled={inputDisable}
                                                                />
                                                            </Col>
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <Col lg={5}>
                                                                <Form.Label style={{ fontSize: '18px' }}>Categoria: </Form.Label>
                                                            </Col>
                                                            <Col lg={7}>
                                                                <Form.Select
                                                                    {...register('idCategory')}
                                                                    onChange={handleSelectChange}
                                                                    disabled={inputDisable}
                                                                >
                                                                    <SelectCategory />
                                                                </Form.Select>
                                                            </Col>
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <Col lg={5}>
                                                                <Form.Label style={{ fontSize: '18px' }}>Mercado: </Form.Label>
                                                            </Col>
                                                            <Col lg={7}>
                                                                <Form.Label style={{ fontSize: '18px' }}>
                                                                    <Link to={`/adm/business?id=${item.idBusiness}&location=validation&idProduct=${idProduct}`}>
                                                                        {item.business} 
                                                                        <FontAwesomeIcon className='iconLink' icon={faArrowUpRightFromSquare} />
                                                                    </Link>
                                                                </Form.Label>
                                                            </Col>
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <Col lg={5}>
                                                                <Form.Label style={{ fontSize: '18px' }}>Peso: </Form.Label>
                                                            </Col>
                                                            <Col lg={7}>
                                                                <Form.Control
                                                                    type='text'
                                                                    {...register('weight')}
                                                                    onChange={handleInputChange}
                                                                    disabled={inputDisable}
                                                                />
                                                            </Col>
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <Col lg={5}>
                                                                <Form.Label style={{ fontSize: '18px' }}>Promoção até: </Form.Label>
                                                            </Col>
                                                            <Col lg={7}>
                                                                <Form.Control
                                                                    type='text'
                                                                    {...register('expirationPrice')}
                                                                    onChange={handleInputChange}
                                                                    disabled={inputDisable}
                                                                />
                                                            </Col>
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <Col lg={5}>
                                                                <Form.Label style={{ fontSize: '18px' }}>Data de criação: </Form.Label>
                                                            </Col>
                                                            <Col lg={7}>
                                                                <Form.Label style={{ paddingLeft: '12px' }}>{item.createAt}</Form.Label>
                                                            </Col>
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <Col lg={{ span: 2, offset: 10 }} style={{backgroundColor: 'transparent', paddingTop: '8px', paddingLeft: '15px'}}>
                                                        <ToggleButton
                                                                className="mb-2"
                                                                id="toggle-check"
                                                                type="checkbox"
                                                                variant="outline-dark"
                                                                checked={checked}
                                                                value="0"
                                                                onChange={(e) => setChecked(e.currentTarget.checked)}
                                                        >
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </ToggleButton>
                                                    </Col>
                                                    <Stack gap={4}>
                                                        <Row style={{marginRight: '1px'}}>
                                                            <Col lg={{span: 8, offset: 4}} style={{backgroundColor: '#ca5df3', borderRadius: '5px'}}>
                                                                <Stack direction="horizontal" gap={5} >
                                                                    <Form.Check
                                                                            reverse
                                                                            label="Aprovado"
                                                                            type='radio'
                                                                            value="Aprovado"
                                                                            {...register('validation')}
                                                                            />
                                                                    <Form.Check
                                                                            reverse
                                                                            label="Reprovado"
                                                                            type='radio'
                                                                            value="Reprovado"
                                                                            {...register('validation')}
                                                                            />
                                                                </Stack>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={{span: 7, offset: 5}}>
                                                            <Stack direction="horizontal" gap={3} >
                                                                <Button onClick={handleReset}>Resetar</Button>
                                                                <Button type='submit'>Salvar alterações</Button>
                                                            </Stack>
                                                            </Col>
                                                        </Row>
                                                    </Stack>
                                                </Form>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </li>
                           )}
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    );
}

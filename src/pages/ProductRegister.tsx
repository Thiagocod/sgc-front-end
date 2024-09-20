import { useState, useEffect } from 'react';
import '../assets/styles/productRegister.scss';
import Footer from '../Components/Footer/Footer';
import {Container, Row, Col, Form, Button, Stack} from 'react-bootstrap'
import ButtonNav from '../Components/ButtonNav/ButtonNav';
import Logo from '../assets/images/logo.svg';
import SelectCategory from '../Components/SelectCategory/SelectCategory';
import Regions from '../Components/Regions/Regions';
import { SetProduct, CreateProduct } from '../services/MySqlData/ProductService';
import {HandleCep} from '../utils/HandleCep';
import InputMask from "react-input-mask";
import { LoadScript } from "@react-google-maps/api";
import Select, { SingleValue } from 'react-select';
import { Business, BusinessList } from '../services/MySqlData/BusinessService';

interface OptionType {
    value: string;
    label: string;
}

export function ProductRegister (){
    const ApiKeyMaps: string = process.env.REACT_APP_API_KEY ;
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [mark, setMark] = useState('');
    const [grocery, setGrocery] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [expirationPrice, setExpirationPrice] = useState('');
    const [isInputDisabled, setIsInputDisabled] = useState(true);
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);
    //const [dataBusiness, setDataBusiness] = useState<Business[]>([]);
    const [showName, setShowName] = useState(true);

    useEffect(() =>{
        if(selectedOption?.value === '0'){
            resetAddressFields();
            setShowName(false);
        }else{
            setShowName(true);
        }
    },[selectedOption]);

    const loadList = async () => {
        try {
            const list = await BusinessList();
            if (list) {
                //setDataBusiness(list);
                const dataOptions = list.map((item) => ({
                    value: item.id,  // ou outra propriedade única que representa o valor
                    label: item.name // ou outra propriedade para exibir no label
                }));

                const newOptions = [{ value: '0', label: 'outro' }, ...dataOptions];
                setOptions(newOptions);

                if (selectedOption?.value) {
                    const selectedValue = selectedOption.value;
                    if (selectedValue !== '0') {
                        const businessSelect = list.find(item => parseInt(item.id) === parseInt(selectedValue));
                        if (businessSelect) {
                            setAddressFields(businessSelect);
                        } else {
                            console.error('Erro ao buscar o mercado: negócio não encontrado');
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao carregar a lista de negócios:', error);
        }
    };

    const resetAddressFields = () => {
        setIsInputDisabled(false);
        setCep('');
        setAddress('');
        setNumber('');
        setNeighborhood('');
        setCity('');
        setRegion('');
    };

    const setAddressFields = (businessSelect: Business) => {
        setCep(businessSelect.cep);
        setAddress(businessSelect.street);
        setNumber(businessSelect.number);
        setNeighborhood(businessSelect.neighborhood);
        setCity(businessSelect.city);
        setRegion(businessSelect.acronym);
    };
    loadList();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const productData: SetProduct =
            {
                name: name,
                idCategory: category,
                price: price,
                mark: mark,
                weight: weight,
                idBusiness: selectedOption?.value,
                nameBusiness: grocery,
                cep: cep.replace(/\D/g,""),
                street: address,
                numberStreet: number,
                city: city,
                neighborhood: neighborhood,
                region: region,
                expirationPrice: expirationPrice,
                image: image,
            };
        CreateProduct(productData);
    };

    const handleCep = async (event: React.FormEvent) => {
        event.preventDefault();
        await HandleCep(event, {
            cep,
            setAddress,
            setCity,
            setRegion,
            setNeighborhood,
            setIsInputDisabled
        });
    };

    const xsCol = 6;
    return(
        <div id="productRegister">
            <main>
                <Container>
                    <Row>
                        <Col id='colImg'>
                            <img src={Logo} alt="logo" />
                        </Col>
                        <Col xs={9}>
                            <h1>Registre uma nova oferta: </h1>
                        </Col>
                        <Col>
                            <ButtonNav />
                        </Col>
                    </Row>
                    <Row>
                        <Col />
                        <Col xs={xsCol}>
                        <LoadScript googleMapsApiKey={ApiKeyMaps}>
                        <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <Form.Group className='mb-3'>
                                <Form.Label>Nome do produto:</Form.Label>  
                                <Form.Control value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Arroz soltinho' required />
                                <Form.Text className='text-muted'>
                                    Nome do produto com a marca.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select aria-label='' id='category' value={category} onChange={e => setCategory(e.target.value)} required> 
                                      <SelectCategory />
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Valor do produto:</Form.Label>  
                                <Form.Control value={price} onChange={e => setPrice(e.target.value)} type='text' placeholder='R$ 10,00' id='price' required />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Peso do produto em gramas</Form.Label>  
                                <Form.Control value={weight} onChange={e => setWeight(e.target.value)} type='text' placeholder='200g' id='price' required/>
                            </Form.Group>
                            <Form.Group className='mb-3' id='mark'>
                                <Form.Label>Marca:</Form.Label>  
                                <Form.Control value={mark} onChange={e => setMark(e.target.value)} type='text' placeholder='Soltinho' required/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Mercado</Form.Label>
                                    <Stack gap={3}>
                                        <Select
                                            options={options}
                                            placeholder="Selecione uma opção"
                                            isClearable
                                            value={selectedOption}
                                            onChange={setSelectedOption}
                                            required
                                        />
                                        <Form.Control value={grocery} onChange={e => setGrocery(e.target.value)} type='text' placeholder='Atacadão' id='grocery' hidden={showName} />
                                    </Stack>
                            </Form.Group>
                            <Form.Group className='mb-3' id='cep'>
                            <div id="cepBtn">
                                        <Form.Control value={cep} onChange={e => setCep(e.target.value)} type='text' as={InputMask} mask="99999-999" placeholder='00000-000' required />
                                        <Button onClick={handleCep} variant="secondary">Buscar</Button>   
                                    </div>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='Address'>
                                    <Form.Label> Endereço </Form.Label>
                                    <Form.Control value={address} onChange={e => setAddress(e.target.value)} type='text' placeholder='Rua' disabled ={isInputDisabled} required/>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='Number'>
                                    <Form.Label> Numero </Form.Label>
                                    <Form.Control value={number} onChange={e => setNumber(e.target.value)} type='text' placeholder='99999'/>
                            </Form.Group>
                             <Form.Group className='mb-3' controlId='Address'>
                                    <Form.Label> Bairro </Form.Label>
                                    <Form.Control value={neighborhood} onChange={e => setNeighborhood(e.target.value)} type='text' placeholder='Guatupê' disabled ={isInputDisabled} required/>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='City'>
                                    <Form.Label> Cidade </Form.Label>
                                    <Form.Control value={city} onChange={e => setCity(e.target.value)} type='text' placeholder='São José dos Pinhais' disabled ={isInputDisabled} required/>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='Region'>
                                    <Form.Label> Estado </Form.Label>
                                    <Form.Select  aria-label='PR' id='region' value={region} onChange={e => setRegion(e.target.value)} disabled ={isInputDisabled} required>
                                        <Regions />
                                    </Form.Select>
                                </Form.Group>    
                            <Form.Group className='mb-3'>
                                <Form.Label>Imagem do produto</Form.Label>  
                                <Form.Control type='file' id='image' name='image' onChange={e => setImage((e.target as HTMLInputElement).files?.[0] || null)} required/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Data de vencimento do valor</Form.Label> 
                                <Form.Control type='date' value={expirationPrice} onChange={e => setExpirationPrice(e.target.value)}/>
                                <Form.Label>Caso não saíba ou não tem uma data não a necessidade de preencher</Form.Label>
                            </Form.Group>
                            <div className="btnRegister"><Button id='btnRegister' variant='success' type='submit'>Cadastrar o Produto</Button></div>
                        </Form>
                        </LoadScript>
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </main>
            <Footer />
        </div>
    )
}

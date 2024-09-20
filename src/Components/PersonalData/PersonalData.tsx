import React, {useEffect, useState} from 'react';
import '../PersonalData/Style.scss';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {ProfileUser, ShowUser, DataUpdateUser} from '../../services/MySqlData/UserService';
import { LoadScript } from "@react-google-maps/api";
import { useForm, SubmitHandler } from 'react-hook-form';


interface IFormInput {
    idUser: string;
    idAddressFisic: string;
    idLocation: string;
    nameUser: string;
    emailUser: string;
    cep: string; 
    region: string;
    city: string; 
    neighborhood: string; 
    street: string;
    number: string;
}


const PersonalData: React.FC = () =>{
    const ApiKeyMaps: string = process.env.REACT_APP_API_KEY ;
    const { register, handleSubmit, setValue, /* formState: { errors } */ } = useForm<IFormInput>();
    const idUser = localStorage.getItem('idUser');
    const [data, setData] = useState<ShowUser[]>([]);
    const [item, setItem] = useState<ShowUser | null>(null);
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const update = await DataUpdateUser(data);
        if (update != null) {
            alert('Cadastro realizado com sucesso');
            console.log(item);
        }
    };

    useEffect(() => {
        const loadUser = async () => {
            if(idUser){
                const getUser = await ProfileUser(idUser);
                if(getUser){
                    setData(getUser);
                }
            }
        };
        loadUser();
    }, [idUser]);

    useEffect(() => {
        if (data.length > 0) {
            const initialItem = data[0];
            setItem(initialItem);
            if(idUser)
            setValue('idUser', idUser);
            setValue('idAddressFisic', initialItem.idAddressFisic);
            setValue('idLocation', initialItem.idLocation);
            setValue('nameUser', initialItem.nameUser);
            setValue('emailUser', initialItem.emailUser);
            setValue('cep', initialItem.cep);
            setValue('region', initialItem.region);
            setValue('city', initialItem.city);
            setValue('street', initialItem.street);
            setValue('number', initialItem.number);
            setValue('neighborhood', initialItem.neighborhood);
        }
    },[data, idUser, setValue]);    
    const handleReset = () => {
            if (data.length > 0) {
                const initialItem = data[0];
                setItem(initialItem);
                setItem(initialItem);
                if(idUser)
                setValue('idUser', idUser);
                setValue('idAddressFisic', initialItem.idAddressFisic);
                setValue('idLocation', initialItem.idLocation);
                setValue('nameUser', initialItem.nameUser);
                setValue('emailUser', initialItem.emailUser);
                setValue('cep', initialItem.cep);
                setValue('region', initialItem.region);
                setValue('city', initialItem.city);
                setValue('street', initialItem.street);
                setValue('number', initialItem.number);
                setValue('neighborhood', initialItem.neighborhood);
            }
        }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(name as keyof IFormInput, value);
    };

    return(
        <div id="personalData">
            <h4>Dados Pessoais</h4>
            <LoadScript googleMapsApiKey={ApiKeyMaps}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <Form.Group className='mb-3' controlId='FullName'>
                                <Form.Label> Nome completo </Form.Label>
                                <Form.Control 
                                type='text'
                                {...register('nameUser')}
                                onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className='mb-3' controlId='Email'>
                                <Form.Label> Email </Form.Label>
                                <Form.Control 
                                    type='email' 
                                    {...register('emailUser')}
                                    onChange={handleInputChange}/>
                            </Form.Group>                   
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className='mb-3' controlId='CEP'>
                                <Form.Label> CEP </Form.Label>
                                <Form.Control 
                                    type='text' 
                                    {...register('cep')}
                                    onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className='mb-3' controlId='Region'>
                                <Form.Label> Estado </Form.Label>
                                <Form.Control
                                    type='text' 
                                    {...register('region')}
                                    onChange={handleInputChange}/>
                            </Form.Group>             
                        </Col>
                        <Col xs={8}>
                            <Form.Group className='mb-3' controlId='City'>
                                <Form.Label> Cidade </Form.Label>
                                <Form.Control
                                type='text' 
                                {...register('city')}
                                onChange={handleInputChange}/>
                            </Form.Group>                
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <Form.Group className='mb-3' controlId='neighborhood'>
                                <Form.Label> Bairro </Form.Label>
                                <Form.Control
                                type='text' 
                                {...register('neighborhood')}
                                onChange={handleInputChange}/>
                            </Form.Group>  
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9}>
                            <Form.Group className='mb-3' controlId='Street'>
                                <Form.Label> Rua </Form.Label>
                                <Form.Control
                                    type='text' 
                                    {...register('street')}
                                    onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className='mb-3' controlId='Number'>
                                <Form.Label> Numero </Form.Label>
                                <Form.Control
                                    type='text' 
                                    {...register('number')}
                                    onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9}/>
                        <Col>
                            <Button id='btnReset' variant='warning' onClick={handleReset}>Resetar</Button> <Button id='btnSalve' variant='success' type='submit'>Salvar</Button>
                        </Col>
                    </Row>
                </Form>
            </LoadScript>
        </div>
    )
}
export default PersonalData

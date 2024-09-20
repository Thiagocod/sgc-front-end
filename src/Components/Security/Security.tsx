import React from "react";
import '../Security/style.scss';
import {Form, Row, Col, Button} from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UpdatePassword } from '../../hooks/Auth';

interface IFormInput {
    password: string;
    newPassword: string;
    replyNewPassWord: string;
    idUser: string
}
const Security: React.FC = () =>{
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>();
    const idUser = localStorage.getItem('idUser');
    if(idUser){
        const id = idUser
        setValue('idUser', id);
    }else{
        console.error('Erro ao encontrar id do usuário')
    }
    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            await UpdatePassword(data);
            return window.location.reload()
        } catch (error) {
            alert('Falha ao mudar a senha');
        }
    };
    return(
        <div id="security">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="OldPassword">
                    <Form.Label>Digite sua Senha Antiga</Form.Label>
                    <Form.Control type="password" {...register('password', { required: 'obrigatório' })}/>
                    {errors.password && <p>{errors.password.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="newPassword">
                    <Form.Label>Digite sua senha nova</Form.Label>
                    <Form.Control type="password" {...register('newPassword', { required: 'obrigatório' })}/>
                    {errors.newPassword && <p>{errors.newPassword.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="replyNewPassWord">
                    <Form.Label>Digite sua nova senha novamente</Form.Label>
                    <Form.Control type="password" {...register('replyNewPassWord', { required: 'obrigatório' })}/>
                    {errors.replyNewPassWord && <p>{errors.replyNewPassWord.message}</p>}
                </Form.Group>
                <Row>
                    <Col xs={8}/>
                    <Col>
                        <Button id='btnSalve' variant='success' type='submit'>Salvar</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )

}
export default Security


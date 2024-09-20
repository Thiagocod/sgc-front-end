import { useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../assets/styles/login.scss'
import { Button, Alert, Stack } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';

interface IFormInput {
    emailUser: string;
    password: string;
}

export function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const { signin } = useAuth();
    const [errorShow, setErrorShow] = useState(false);


    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            await signin(data.emailUser, data.password, () => {
                window.location.href = "/user/search";
            });
        } catch (error) {
            setErrorShow(true);
        }
    };
    return (
        <div id="login">
            <Alert show={errorShow} variant="success">
                <Alert.Heading>Excluir Oferta?</Alert.Heading>
                <p>
                    Usuário ou senha não conferem, verifique seu usuário e senha e tente novamente! 
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                <Stack direction="horizontal" gap={3}>
                    <Button onClick={() => setErrorShow(false)} variant="outline-success">
                        OK
                    </Button>
                </Stack>
                </div>
            </Alert>  
            <aside>
                <img src={illustrationImg} alt="Ilustração carrinho de compras" />
                <strong>SGC</strong>
                <p>Seu dinheiro é importante!</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="logo" />
                    <div className='separator'><Link to={'/profile_register'}>Cadastre-se</Link></div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" {...register('emailUser', { required: 'Email é obrigatório' })}  />
                        {errors.emailUser && <p>{errors.emailUser.message}</p>}
                        <input type="password" {...register('password', { required: 'Senha é obrigatória' })}  />
                        {errors.password && <p>{errors.password.message}</p>}
                        <Button type="submit">
                           Entrar
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
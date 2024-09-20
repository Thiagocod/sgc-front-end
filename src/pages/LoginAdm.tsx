import '../assets/styles/loginAdm.scss';
import logoImg from '../assets/images/logo.svg';
import { Form, Row, Col, Container, Image, Stack, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAdminAuth } from '../contexts/AdminAuthContext'; // Importando o contexto de admin

interface IFormInput {
  emailAdmin: string;
  password: string;
}

export function LoginAdm() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const { adminSignin } = useAdminAuth(); // Usando o contexto de admin para login
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await adminSignin(data.emailAdmin, data.password, () => {
        window.location.href = "/adm/list_validation"; // Redireciona para a página de admin após login bem-sucedido
      });
    } catch (error) {
      console.error('Falha no login', error);
    }
  };

  return (
    <div id="loginAdm">
      <Container id="container">
        <Stack gap={3}>
          <h1>Mediadores</h1>
          <Row>
            <Col lg={{ span: 4, offset: 4 }}>
              <Container>
                <Image src={logoImg} thumbnail />
              </Container>
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 4, offset: 4 }}>
              <Form onSubmit={handleSubmit(onSubmit)}> {/* Associando o onSubmit ao handleSubmit do react-hook-form */}
                <Form.Group className="mb-2" controlId="formGroupEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Entre com o email" 
                    {...register('emailAdmin', { required: 'Email é obrigatório' })} 
                  />
                  {errors.emailAdmin && <p>{errors.emailAdmin.message}</p>}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formGroupPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Senha" 
                    {...register('password', { required: 'Senha é obrigatória' })} 
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </Form.Group>
                <div id="btn">
                  <Button id="loginBtn" type="submit">Logar</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Stack>
      </Container>
    </div>
  );
}

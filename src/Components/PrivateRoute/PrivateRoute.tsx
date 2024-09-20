import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, Button } from 'react-bootstrap';
import { useEffect } from 'react';

export default function PrivateRoute() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Se a verificação de autenticação estiver concluída e o usuário não estiver autenticado, redireciona para o login
    if (!auth.isLoading && !auth.user) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [auth.isLoading, auth.user, navigate, location]);

  if (auth.isLoading) {
    // Mostra um indicador de carregamento enquanto verifica a autenticação
    return <div>Loading...</div>;
  }

  if (!auth.user) {
    // Se o usuário não estiver autenticado, mostra uma mensagem de acesso negado
    const returnLogin = () => {
      navigate("/login", { state: { from: location }, replace: true });
    };
    return (
      <>
        <Alert variant="danger">
          <Alert.Heading>Acesso Negado!</Alert.Heading>
          <p>Você não tem permissão para acessar essa página ☻!</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={returnLogin} variant="outline-success">
              Voltar ao login
            </Button>
          </div>
        </Alert>
      </>
    );
  }

  // Se o usuário estiver autenticado, renderiza os componentes filhos
  return <Outlet />;
}

import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { Alert, Button } from 'react-bootstrap';
import { useEffect } from 'react';

export default function AdminPrivateRoute() {
  const adminAuth = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Se a verificação de autenticação estiver concluída e o adminUser não estiver autenticado, redireciona para o login
    if (!adminAuth.isLoading && !adminAuth.adminUser) {
      navigate('/login_adm', { state: { from: location }, replace: true });
    }
  }, [adminAuth.isLoading, adminAuth.adminUser, navigate, location]);

  if (adminAuth.isLoading) {
    // Mostra um indicador de carregamento enquanto verifica a autenticação
    return <div>Loading...</div>;
  }

  if (!adminAuth.adminUser) {
    // Se o adminUser não estiver autenticado, mostra uma mensagem de acesso negado
    const returnLogin = () => {
      navigate("/login_adm", { state: { from: location }, replace: true });
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

  // Se o adminUser estiver autenticado, renderiza os componentes filhos
  return <Outlet />;
}



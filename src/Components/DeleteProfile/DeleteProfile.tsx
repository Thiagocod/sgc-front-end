import { useState } from "react";
import "./styles.scss";
import { Alert, Button, Col, Container, Row, Stack } from "react-bootstrap";
import { RemoveUser } from "../../services/MySqlData/UserService";

const DeleteProfile: React.FC = () =>{
    const [showAlert, setShowAlert] = useState(false);
    const deleteProfileExe = async () =>{
        const id = localStorage.getItem("idUser");
            if(id){
                const deleteUser = await RemoveUser({idUser: id});
                if(deleteUser){
                    localStorage.clear();
                    window.location.href ="/login";   
                }else{
                    alert("Erro ao excluir usuário!")
                }         
            }else{
                alert('Error ao encontrar o id!')
            }
    }
    return(
        <div id="deleteProfile">
            <Container>
            <Alert show={showAlert} variant="danger">
                <Alert.Heading>Alerta!</Alert.Heading>
                <p>
                    Tem certeza que deseja excluir perfil? 
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Stack gap={4} direction="horizontal">
                        <Button onClick={() => deleteProfileExe()} variant="danger">
                            Excluir
                        </Button>
                        <Button onClick={() => setShowAlert(false)} variant="outline-success">
                            Fechar
                        </Button>
                    </Stack>
                </div>
            </Alert>
                <Row>
                    <Col style={{textAlign: "center", marginTop: "4rem", marginBottom: "4rem"}}>
                        <Stack gap={3}>
                            <div>
                                <h1>Exclusão permanente do seu perfil</h1>
                            </div>
                            <div>
                                <h3>Atenção: Após a exclusão não será mais possivel recuperar o perfil!</h3>
                            </div>
                            <div>
                                <Button variant="danger" onClick={e => {setShowAlert(true)}}>Excluir perfil</Button>    
                            </div>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default DeleteProfile
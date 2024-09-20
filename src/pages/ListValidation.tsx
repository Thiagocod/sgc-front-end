import { Row, Col, Container, Stack } from "react-bootstrap";
import ListProductValidation from "../Components/ListProductValidation/ListProductValidation";

export function ListValidation (){
    return (
        <div id="listValidation">
         <Row>
            <Col lg={{offset: 3, span: 6}}>
                <Container>
                    <Row style={{backgroundColor: '#ca5df3', borderRadius: '10px', marginTop: '1rem'}}>
                        <Stack direction="horizontal" gap={3}>
                            <h1 style={{marginLeft: 'auto', marginRight: 'auto'}}>Produtos para validação:</h1>
                        </Stack>
                    </Row>
                    <ListProductValidation />
                </Container>
            </Col>
         </Row>
    </div>
    )
    
} 
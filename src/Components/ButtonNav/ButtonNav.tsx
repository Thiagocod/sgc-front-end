import React, { useState } from "react"
import './styles.scss'
import {logout} from "../../hooks/Auth";
import { Button, Nav, Offcanvas } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faCartShopping } from "@fortawesome/free-solid-svg-icons";

const ButtonNav: React.FC = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const sair = () =>{
        logout();
        window.location.href = "/login";
    }
    return(
        <div id="navButton">
            <Button variant="secondary" onClick={handleShow} style={{width: '5rem', height: '5rem'}}>
                <FontAwesomeIcon icon={faBarsStaggered} />
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title><FontAwesomeIcon style={{marginLeft: '10px', marginTop: '1rem', fontSize: '2rem', color: '#696969',}} icon={faCartShopping} /></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav defaultActiveKey="/login" className="flex-column">
                        <Nav.Link href="/user/profile">Perfil</Nav.Link>
                        <Nav.Link href="/user/search">Pesquisa</Nav.Link>
                        <Nav.Link href="/user/register">Cadastrar produto</Nav.Link>
                        <hr />
                        <Nav.Link onClick={sair}>Sair</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default ButtonNav
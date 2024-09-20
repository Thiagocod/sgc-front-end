import React, {useEffect, useState} from 'react'
import './Styles.scss'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot, faSatelliteDish} from '@fortawesome/free-solid-svg-icons';
import Form  from 'react-bootstrap/Form';
import Logo from '../../assets/images/logo.svg';
import ButtonNav from '../ButtonNav/ButtonNav'
import { ProfileUser, ShowUser } from '../../services/MySqlData/UserService';

interface HeaderProps {
    setSearchTerm?: (term: string) => void;
    setDistanceTerm?: (term: string) => void;
    setALatTerm?: (term: string) => void;
    setALngTerm?: (term: string) => void;
  }

const Header: React.FC <HeaderProps> = ({ setSearchTerm, setDistanceTerm,  setALatTerm, setALngTerm }) =>{
    const [search, setSearch] = useState('');
    const [distance, setDistance] = useState<string>('');
    const [data, setData] = useState<ShowUser[]>([]);
    const [addressPersonal, setAddressPersonal] = useState<string>('');
    const idUser = localStorage.getItem('idUser');
    useEffect(() => {
        const loadUser = async () => {
            if(idUser){
                const getUser = await ProfileUser(idUser);
                    setData(getUser);
            }
        };
        loadUser();
    }, [idUser]);
    useEffect(() => {
        const loadPersonal = () => {
            if(data){
                const profile = data[0];
                if(profile){
                    if(setALatTerm){
                        setALatTerm(profile.lat);
                    }
                    if(setALngTerm){
                       setALngTerm(profile.lng); 
                    }
                    setAddressPersonal(profile.street.concat(", Nº ", profile.number, ", ", profile.city, " - ", profile.region));  
                }
            }
        };
        loadPersonal();
    }, [data, setALatTerm, setALngTerm ]);
    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
      };    
    const handleSearch = () => {
        if(!setSearchTerm){
        }else{
            setSearchTerm(search);
            if(setDistanceTerm){
                setDistanceTerm(distance)
            }
        }
    };
    const handleDistanceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDistance(event.target.value);
    };
    return(
        <header>
            <Container>
                <Row>
                    <Col id='colImg'>
                        <img id='logo' src={Logo} alt="logo" />
                    </Col>
                    <Col xs={9} id='barCol'>
                                    <div id="LocationNow" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                                        <FontAwesomeIcon id='iconLocation' icon={faLocationDot} style={{fontSize: "1rem"}}/>
                                        <p id='address'>{addressPersonal}</p>
                                    </div>
                                    <Form id="searchBar">
                                        <Form.Control id='textForm' size='lg' type='search' value={search} onChange={handleSearchInput}  placeholder='Nome do produto' required/>
                                        <Button variant='success' onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                                        <FontAwesomeIcon id='searchRadius' icon={faSatelliteDish} />
                                        <Form.Select aria-label="Raio de pesquisa" className='select' value={distance} onChange={handleDistanceChange} required>
                                            <option value="10">10Km</option>
                                            <option value="5">5Km</option>
                                            <option value="20">20Km</option>
                                            <option value="30">30Km</option>
                                        </Form.Select>
                                </Form>
                    </Col>
                    <Col id='colProfile'>
                        <ButtonNav />
                    </Col>
                </Row>
            </Container>
            
        </header>
    )
}

export default Header
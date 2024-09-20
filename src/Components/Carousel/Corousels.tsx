import React from 'react';
import './Style.scss';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../assets/images/logo.svg';

const Carousels: React.FC = () =>{
    return(
        <div id="Carousel">
            <Carousel>
                <Carousel.Item>
                    <img src= {img1} alt="img 01" />
                </Carousel.Item>
                <Carousel.Item>
                    <img src= {img1} alt="img 01" />
                </Carousel.Item>
                <Carousel.Item>
                    <img src= {img1} alt="img 01" />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
export default Carousels
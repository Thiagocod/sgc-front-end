import {useState} from "react";
import '../assets/styles/productsearch.scss';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import ProductsList from '../Components/ProductsList/ProductsList';
//import { Authenticated } from "../hooks/Auth";

export function ProductSearch (){
    //Authenticated();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [distanceTerm, setDistanceTerm] = useState<string>('');
    const [aLatTerm, setALatTerm] = useState<string>('');
    const [aLngTerm, setALngTerm] = useState<string>('');

    return(
        <div id="productSearch">
            <Header setSearchTerm={setSearchTerm} setDistanceTerm={setDistanceTerm} setALatTerm={setALatTerm} setALngTerm={setALngTerm}/>
            <ProductsList searchTerm={searchTerm} distanceTerm={distanceTerm} aLatTerm={aLatTerm} aLngTerm={aLngTerm} />
            <Footer /> 
        </div>
    )
}
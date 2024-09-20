import React from 'react';
import {GetCategories} from '../../services/MySqlData/CategoriesService'

const SelectCategory: React.FC = () =>{
    const data = GetCategories();
    return(
        <>  <option value="0">Categorias</option>
            {data.map(item =>(
                <>
                <option value={item.idCategory}>{item.nameCategory}</option>
                </>
            ))}
        </>    
    )
}

export default SelectCategory
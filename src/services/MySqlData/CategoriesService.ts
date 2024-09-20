import { useState, useEffect } from "react";
import axios from "axios";

interface DataItem{
    idCategory: number,
    nameCategory: string,
    description: string
}

export function GetCategories () {
    const [data, setData] = useState<DataItem[]>([])
    useEffect(() => {
        axios.get<DataItem[]>('http://localhost:3001/api/data/category')
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Ocorreu um erro ao buscar os dados!', error);
          });
      }, []);
      return data
}
import axios from "axios";

export interface Business {
    id: string;
    name: string;
    createAt: Date;
    cep: string;
    country: string;
    idRegion: string;
    acronym: string;
    Region_Name: string;
    city: string;
    neighborhood: string;
    number: string;
    street: string;
    idlocation: string;
    lat: string;
    lng: string;
  }

export async function BusinessList () {
        try{
         const response = await axios.get<Business[]>('http://localhost:3001/api/data/business');
         return response.data 
        }catch(error){
          console.error('Ocorreu um erro ao buscar os dados!', error);
        }
}

export async function SearchBusiness (id: string) {
  if(!id){
    console.error('erro ao encontrar id')
  }
  const params = {idBusiness: id}
  try{
   const response = await axios.get<Business[]>('http://localhost:3001/api/data/business/search', {params});
   return response.data 
  }catch(error){
    console.error('Ocorreu um erro ao buscar os dados!', error);
  }
}
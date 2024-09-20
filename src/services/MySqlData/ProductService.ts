import axios from 'axios';
import { useState, useEffect } from "react";
import { geocodeAddress } from "../../utils/geocodeAddress";
import { formatDateToMySQL } from '../../utils/FormatDate';

export interface SetProduct {
    name: string;
    idCategory: string;
    price: string;
    mark: string;
    weight: string;
    idBusiness?: string;
    nameBusiness: string;
    cep: string;
    street: string;
    numberStreet: string;
    city: string;
    neighborhood: string;
    region: string;
    expirationPrice: string;
    image: Blob | null;
}

export interface GetProduct{
    nameProduct: string;
    price: string;
    mark: string;
    weight: string;
    category: string;
    business: string;
    imageProduct: string;
    expirationPrice: string;
    createAt: string;
}
export interface ProductSearch {
    id: string;
    nameProduct: string;
    price: number;
    mark: string;
    weight: string;
    imageProduct: string;
    idProduct:string;
    idBusiness: string;
    business: string;
    lat: number;
    lng: number;
    expirationPrice: string; 
    createAt: string;
    notesMedia: string;
}

export interface ValidationProduct {
    id: string;
    nameProduct: string;
    idCategory: string
    price: number;
    mark: string;
    weight: string;
    imageProduct: string;
    idBusiness: string;
    business: string;
    lat: number;
    lng: number;
    expirationPrice: string; 
    createAt: string;
    notesMedia: string;
}
interface Search{
  searchLowerCase?: string;
  distance?: string;
}

interface UserProductSearch{
    idUser?: string;
    searchLowerCase?: string;
  }

interface SetUpdateProduct {
    id: string;
    nameProduct: string;
    idCategory: string;
    price: string;
    mark: string;
    weight: string;
    expirationPrice: string;
    validation: string;  
}

export interface productNote{
    idNotesPrice?: string;
    idproduct: string;
    priceProduct?: number;
    nameProduct?: number;
    nameBusiness?: string;
    iduser: string;
    nameUser?: string;
    valor: string;
    comments: string;
    createAt?: string;
}
// Ofertas:

export const CreateProduct = async (data: SetProduct) => {
    const addressSearch: string = data.street.concat(", ", data.numberStreet,", ", data.city);
    const coords = await geocodeAddress(addressSearch);
    const idUser = localStorage.getItem('idUser');
        if(!data.idBusiness){
            alert('Sem id do mercado')
            return
        }
        if(!idUser){
            alert("Sem id do usuário")
            return
        }
        if (!coords) {
                alert("Sem Coordenadas")
                return;
            }   
                const formData = new FormData();
                formData.append('id', idUser);
                formData.append('nameProduct', data.name );
                formData.append('idCategory', data.idCategory );
                formData.append('price', data.price);
                formData.append('weight',data.weight)
                formData.append('mark', data.mark);
                formData.append('idBusiness', data.idBusiness)
                formData.append('nameBusiness', data.nameBusiness );
                formData.append('cep', data.cep);
                formData.append('street', data.street );
                formData.append('numberStreet', data.numberStreet );
                formData.append('city', data.city );
                formData.append('neighborhood', data.neighborhood );
                formData.append('region', data.region );
                formData.append('image', data.image as Blob);
                formData.append('expirationPrice', data.expirationPrice);
                formData.append('locLat', coords.lat.toString());
                formData.append('locLng', coords.lng.toString());
                //console.log(coords.lng.toString(),"/",coords.lat.toString())
                try {
                    const response = await axios.post('http://localhost:3001/api/data/product', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('Response:', response.data);
                    window.location.href = "/user/success";
                } catch (error) {
                    console.error('There was an error!', error);
                    window.alert(error);
                }
}

export function ListProducts(searchParams?: Search) {
    const [data, setData] = useState<ProductSearch[]>([]);
    useEffect(() => {
        if (searchParams?.searchLowerCase && searchParams?.distance) {
            const params = {
                fSearch: searchParams.searchLowerCase,
                distance: searchParams.distance
            }
            axios.get<ProductSearch[]>('http://localhost:3001/api/data/product/search', { params })
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao buscar os dados!', error);
                });

        } else {
            axios.get<ProductSearch[]>('http://localhost:3001/api/data/product')
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao buscar os dados!', error);
                });
        }
    }, [searchParams]);

    return data;
}


export function MyRegisterProducts (){
    const [data, setData] = useState<GetProduct[]>([])
      useEffect(() => {
          axios.get<GetProduct[]>('http://localhost:3001/api/data/product')
            .then(response => {
              setData(response.data);
            })
            .catch(error => {
              console.error('Ocorreu um erro ao buscar os dados!', error);
            });
        }, []);
      return data
  }

export function DescriptionProduct (id: number) {
    const [data, setData] = useState<ProductSearch[]>([]);
            const params = {productId: id}
            axios.get<ProductSearch[]>('http://localhost:3001/api/data/product/id', { params })
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao buscar os dados!', error);
                });
    return data;
}

export async function ProductValidation(id: number): Promise<ValidationProduct[]> {
    const params = { productId: id };
    try {
        const response = await axios.get<ValidationProduct[]>('http://localhost:3001/api/data/product/validation/id', { params });
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados!', error);
        return [];
    }
}



export const UpdateProduct = async ( update: SetUpdateProduct ) =>{
    const data = {
        id: update.id,
        nameProduct: update.nameProduct,
        idCategory: update.idCategory,
        valor: update.price.replace(',','.'),
        mark: update.mark,
        weight: update.weight,
        expirationPrice: formatDateToMySQL(update.expirationPrice) ,
        validation: update.validation 
    }
    console.log(data);
    try {
        const response = await axios.put('http://localhost:3001/api/data/product', data);
        alert('Produto Atualizado com sucesso');
        return response
    } catch (error) {
        alert('Erro ao registrar alteração no produto');
        return null
    }
}

export function ValidationListProducts(searchParams?: Search) {
    const [data, setData] = useState<ProductSearch[]>([]);
    useEffect(() => {
        if (searchParams?.searchLowerCase && searchParams?.distance) {
            const params = {
                fSearch: searchParams.searchLowerCase,
                distance: searchParams.distance
            }
            axios.get<ProductSearch[]>('http://localhost:3001/api/data/product/validation/search', { params })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Ocorreu um erro ao buscar os dados!', error);
            });
            
        } else {
            axios.get<ProductSearch[]>('http://localhost:3001/api/data/product/validation')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                    console.error('Ocorreu um erro ao buscar os dados!', error);
                });
        }
    }, [searchParams]);
    
    return data;
}

export function UserListProducts(searchParams?: UserProductSearch) {
    const [data, setData] = useState<ProductSearch[]>([]);
    useEffect(() => {
        if (searchParams?.searchLowerCase && searchParams?.idUser) {
            const params = {
                fSearch: searchParams.searchLowerCase,
                id: searchParams.idUser
            }
            axios.get<ProductSearch[]>('http://localhost:3001/api/data/product/user/search', { params })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Ocorreu um erro ao buscar os dados!', error);
            });
            
        } else if(searchParams?.idUser){
            const params = {idUser: searchParams.idUser}
            axios.get<ProductSearch[]>('http://localhost:3001/api/data/product/user',{params})
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Ocorreu um erro ao buscar os dados!', error);
            });
        }
    }, [searchParams]);
    return data;
}

export async function DeleteProduct (idProduct: string) {
    const params = {idProduct};
    try{
        const result = await axios.delete('http://localhost:3001/api/data/product', {params})
        return result
    }catch(error){
        console.error(error);
    }
}
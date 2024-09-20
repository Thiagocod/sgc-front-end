import axios from 'axios';
import { cpf } from 'cpf-cnpj-validator'; 
import { geocodeAddress } from "../../utils/geocodeAddress";
import { productNote } from './ProductService';
import { useState } from 'react';

export interface User {
    name:string,
    email:string,
    cep:string,
    address:string,
    number:string,
    neighborhood: string,
    city: string,
    region: string,
    newPassword: string, 
    newPasswordRepeat: string, 
    cpfInput: string
}

export interface ShowUser {
    idUser: number;
    idAddressFisic: string;
    idLocation: string;
    lat: string;
    lng: string;
    nameUser: string;
    emailUser: string;
    password: string;
    cpf: string;
    cep: string; 
    region: string;
    city: string; 
    neighborhood: string; 
    street: string;
    number: string; 
    createAt: Date; 
    removeAt?: Date;
  }

export interface UserSearchCpf{
    idUser: number;
    idAddressFisic: number;
    cpf: string;
}

export interface UserSearchEmail{
    idUser?: number;
    nameUser: string;
    emailUser: string;
    adm?: boolean;
    userPassword: string;
    idAddressFisic: number;
    idLocation?: number;
    foneUser?: string;
    foneUserSec?: string;
    cpf: string;
    rg?: string;
    photo?: string;
    createAt: Date;
    removeAt?: Date;
}

interface UpdateUser {
    idUser: string;
    idAddressFisic: string;
    idLocation: string;
    nameUser: string;
    emailUser: string;
    cep: string; 
    region: string;
    city: string; 
    neighborhood: string; 
    street: string;
    number: string;
}

export const CreateUser = async (data:User) => {
        const addressSearch:string = data.address.concat(", ",data.number,", ", data.city);
        const coords = await geocodeAddress(addressSearch);
        const dataCpf = await  SearchCpf(data.cpfInput);
        const dataEmail = await SearchEmail(data.email);
        if (dataEmail.length > 0 && dataEmail[0].emailUser === data.email) {
            alert('Já existe um usuário com esse email!');
            return;
        }

        if (dataCpf.length > 0 && dataCpf[0].cpf === data.cpfInput) {
            alert('Já existe um usuário com esse CPF!');
            return;
        }
        if (!coords) {
                alert("Sem Coordenadas")
                return;
            } else if (data.newPassword !== data.newPasswordRepeat){
                alert("Senhas não coincidem favor revisar e tentar novamente!");
                return;
            } else if (!cpf.isValid(data.cpfInput)){
                    window.alert("CPF inválido por gentileza revise e tente novamente.");
                return;
            }
            const userData = {
                name: data.name,
                email: data.email,
                cpf: data.cpfInput,
                cep: data.cep,
                address: data.address,
                number: data.number,
                neighborhood: data.neighborhood,
                city: data.city,
                region: data.region,
                password: data.newPassword,
                locLat: coords.lat.toString(),
                locLng: coords.lng.toString()
            };

            try {
                const response = await axios.post('http://localhost:3001/api/data/user', userData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Response:', response.data);
                alert("Usuário registrado com sucesso!");
                window.location.href = "/login";
            } catch (error) {
                console.error('There was an error!', error);
                window.alert(error);
            }
}

export async function ProfileUser(idUser: string): Promise<ShowUser[]> {
    const params = { id: idUser };
    try {
        const response = await axios.get<ShowUser[]>('http://localhost:3001/api/data/user', { params });
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados!', error);
        return []
    }
}

export const DataUpdateUser = async ( update: UpdateUser ) =>{
    const addressSearch:string = update.street.concat(", ",update.number,", ", update.city);
    const coords = await geocodeAddress(addressSearch);
    if (!coords) {
        alert("Sem Coordenadas")
        return;
    }
    console.log(update)
    const data = {
    id: update.idUser,
    idAddressFisic: update.idAddressFisic.toString(),
    idLocation: update.idLocation.toString(),
    name: update.nameUser,
    email: update.emailUser,
    cep: update.cep,
    region: update.region,
    city: update.city,
    neighborhood: update.neighborhood,
    street: update.street,
    number: update.number,
    locLat: coords?.lat.toString(),
    locLng: coords?.lng.toString()
    }
    try {
    const response = await axios.put('http://localhost:3001/api/data/user', data);
    return response
    } catch (error) {
    return null
    }
    
}


export function ListNotesUser (id: string ) {
    const params = {
        idUser: id
    }
    const [data, setData] = useState<productNote[]>([]);
            axios.get<productNote[]>('http://localhost:3001/api/data/user/notes', { params })
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao buscar os dados!', error);
                });
    return data;
}

export async function SearchCpf (cpf: string) {
    const params = { cpf };
    try {
        const response = await axios.get<UserSearchCpf[]>('http://localhost:3001/api/data/user/cpf', { params });
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados!', error);
        return [];
    }
}

export async function SearchEmail(email: string): Promise<UserSearchEmail[]> {
    const params = { email };
    try {
        const response = await axios.get<UserSearchEmail[]>('http://localhost:3001/api/data/user/email', { params });
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados!', error);
        return [];
    }
}
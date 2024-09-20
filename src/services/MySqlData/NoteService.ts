import axios from 'axios';
import { useState } from 'react';

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

export function ListNote (idProduct: number) {
    const [data, setData] = useState<productNote[]>([]);
    const params = {productId: idProduct}
    axios.get<productNote[]>('http://localhost:3001/api/data/note/list', { params })
    .then(response => {
        //console.log(response.data);
        setData(response.data);
    })
    .catch(error => {
        console.error('Ocorreu um erro ao buscar os dados!', error);
    });
    return data;
}

export async function DeleteNote (id: string) {
    const params = {id: id}
    try{
       await axios.delete('http://localhost:3001/api/data/note', { params });
    } catch(error){
        console.error('Erro ao tentar remover a nota!', error)
    }
}

export async function MyNoteProduct (idUser: string) {
    const params = {id: idUser}
    try{
        const response = await axios.get<productNote[]>('http://localhost:3001/api/data/note/client_notes', { params })
        return response.data
    }catch(error){
        console.error('Error ao buscar notas', error);
    }
}
export async function UserNoteProduct (idUser: string, idProduct: string) {
    const params = {id: idUser, idproduct: idProduct}
    try{
        const response = await axios.get<productNote[]>('http://localhost:3001/api/data/note/user_note_product', { params })
        return response.data
    }catch(error){
        console.error('Error ao buscar notas', error);
    }
}
export const createNote = async (data: productNote) => {
    const note = data;
    if (!note) {
            alert("Sem dados para criar a nota!")
            return;
    }
    const noteProduct = await UserNoteProduct(note.iduser,note.idproduct);
    if(!noteProduct){
        alert("Não foi possivel registrar a nota create note");
        return
    }
    const verifyNote = noteProduct[0]
    console.log(verifyNote);
    if(verifyNote){
        alert("Você já avaliou essa oferta!")
        return;
    }
    const noteData = {
        product: note.idproduct,
        user: note.iduser,
        note: note.valor,
        comments: note.comments
    };
    try {
        const response = await axios.post('http://localhost:3001/api/data/note', noteData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response.status);
        alert("Nota registrada com sucesso!");
    } catch (error) {
        console.error('There was an error!', error);
        window.alert(error);
    }
}
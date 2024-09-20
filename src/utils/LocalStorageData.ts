export class LocalStorageData {

    static async getIdUser(){
        const id = localStorage.getItem('idUser');
        if(id){
            const idUser = id
            return idUser
        }else{
            return null
        }
    }

}
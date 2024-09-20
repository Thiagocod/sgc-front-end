import axios from 'axios';
import { ProfileUser } from '../services/MySqlData/UserService';


interface IFormInput {
  emailUser: string;
  password: string;
}

interface AdminIFormInput {
  emailAdmin: string;
  password: string;
}

interface SetUpdatePassword{
  password: string;
  newPassword: string;
  replyNewPassWord: string;
  idUser: string;
}
//Usuário padrão:

export const Authenticated = async () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('idUser');
  if (token || user) {
    //console.log('null do Authenticated')
    try {
      const response = await axios.get('http://localhost:3001/api/data/user/check-auth', {
        headers: {
          Authorization: token,
        },
      });
  
      if (response.status === 200) {
        return {
          user,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error checking authentication', error);
      return undefined;
    }
  } else{
    return undefined; // Retorna null se o token ou user não existirem
  }
};



export const AuthLogin = async ( data: IFormInput ) =>{
  const emailUser = data.emailUser;
  const password = data.password;
  try {
    const response = await axios.post('http://localhost:3001/api/data/user/login', { emailUser, password });
    const StorageSetItem = [localStorage.setItem('token', response.data.token), localStorage.setItem('idUser',response.data.id)];
    return StorageSetItem
  } catch (error) {
    console.error('Erro ao logar', error);
  }
};


export const logout = async () => {
  localStorage.clear();
};


export const UpdatePassword = async (data: SetUpdatePassword)  => {
  if(data.newPassword === data.replyNewPassWord){
    try{
      const profile = await ProfileUser(data.idUser);
      const user = profile[0]
      const aut = {
        emailUser: user.emailUser,
        password: data.password
      }
      try{
        await axios.post('http://localhost:3001/api/data/user/login', aut);
        try{
          const upPassWord = {
            idUser: parseInt(data.idUser),
            newPassword: data.newPassword
          }
          const response = await axios.put('http://localhost:3001/api/data/user/password', upPassWord);
          alert('senha atualizada com sucesso!');
          return response
        } catch (error){
          return alert('Error ao atualizar a senha')
        }
      } catch (error){
        return alert('Senha errada por favor revise e tente novamente!')
      }
    } catch (error){
      return alert('As senhas não coincidem!');
    }
  }
}

//Administradores

export const AdminAuthenticated = async () => {
  const token = localStorage.getItem('token');
  const adminUser = localStorage.getItem('idUser');
  if(adminUser){
    if (!token || !adminUser) {
      return null; // Retorna null se o token ou user não existirem
    }
    try {
      const response = await axios.get('http://localhost:3001/api/data/user/adm/check-auth', {
        headers: {
          Authorization: token, 
          id: adminUser
        }
      });
      if (response.status === 200) {
        return {
          adminUser
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error checking authentication', error);
      return null;
    }
  }
  };

export const AdminAuthLogin = async ( data: AdminIFormInput ) =>{
  const emailAdmin = data.emailAdmin;
  const password = data.password;
  try {
    const response = await axios.post('http://localhost:3001/api/data/user/adm/login', { emailAdmin, password });
    const StorageSetItem = [localStorage.setItem('token', response.data.token), localStorage.setItem('idUser',response.data.id)];
    return StorageSetItem
  } catch (error) {
    alert('error ao logar');
    return null
  }
};

export const AdminLogout = async () => {
  localStorage.clear();
};
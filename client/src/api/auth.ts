import axios from 'axios';
import { IUser } from '../interface/user';
import { useAuthStore } from '../store/auth';

type ResquestData = {
    Token: string,
    user: IUser
}

export const AuthLogin = async (email: string, password: string) => {
    return axios.post<ResquestData>('http://localhost:3000/api/login', {
        email,
        password
    });
};


export const profileResquest = async (id: number) => {
    const token = useAuthStore.getState().token
    return axios.get<IUser>(`http://localhost:3000/api/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
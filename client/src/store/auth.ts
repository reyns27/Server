import create from 'zustand';
import {persist} from 'zustand/middleware';
import { IUser } from '../interface/user';

type State = {
    token: string,
    profile:IUser | any,
    isAuth:boolean
};

type Actions = {
    setToken: (token:string) => void
    setProfile:(profile:IUser) => void
};


export const useAuthStore = create(persist<State & Actions>(
    (set) => ({
    token:"",
    isAuth:false,
    profile:null,
    setToken: (token:string) => set(() =>({
        token,
        isAuth:true
    })),
    setProfile:(profile:IUser) => set(() => ({
        profile
    }))
}),{
    name:'auth'
}
));


import axios from 'axios';


const AuthApi = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

/*AuthApi.interceptors.request.use(config => {
    const token = useAuthStore.getState().token
    config.headers = {
        Authorization: token
    }
    return config
})*/

export default AuthApi
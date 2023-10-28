import { RouteObject, useRoutes } from 'react-router-dom';
import { Dashboard } from '../dashboard/Dashboard';
import Login from '../login/Login';
import { PageFound } from '../404';
import App from '../App';
import ProtectedRoute from '../libs/ProtectedRoute';
import { useAuthStore } from '../store/auth';

const RouterManager = () => {
    const isAuth = useAuthStore(state => state.isAuth);
    const routerPath: RouteObject[] = [{
        path:'/',
        element:<App />,
        children:[
            {
                index:true,
                element:<Login />,
            },
            {
                path:'/Dashboard',
                element:<ProtectedRoute isAllowed={isAuth} children={<Dashboard/>} />,
            },
            {
                path:'*',
                element:<PageFound />
            }
        ]
    }]
    const setRouterManager = useRoutes(routerPath);
    return setRouterManager;
        
}

export default RouterManager

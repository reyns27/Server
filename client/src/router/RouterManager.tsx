import { ReactElement } from 'react';
import { useRoutes } from 'react-router-dom';
import { Dashboard } from '../dashboard/Dashboard';
import Login from '../login/Login';
import App from '../App';

interface IrouterPath {
    path: string,
    element: ReactElement,
    children: [{
        path: string,
        element: ReactElement,
        children: [{
            path: string,
            element: ReactElement,
        }] | any,
    }] | any
};

const RouterManager = () => {
    const routerPath: IrouterPath[] = [{
        path:'/',
        element:<App />,
        children:[
            {
                path:'/',
                element:<Login />,
                children:null
            },
            {
                path:'/Dashboard',
                element:<Dashboard />,
            }
        ]
    }]
    const setRouterManager = useRoutes(routerPath);
    return setRouterManager;
        
}

export default RouterManager

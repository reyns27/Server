import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
    isAllowed: boolean;
    children: React.ReactNode;
};

const ProtectedRoute = ({ isAllowed, children }: Props) => {
    if (!isAllowed) return <Navigate to={"/"} />
    return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
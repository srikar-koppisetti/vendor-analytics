import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from "./Loading";

const Dashboard = React.lazy(() => import('./Dashboard'));
const Login = React.lazy(() => import('./Login'));

const App = () => {
    return (
        <React.Suspense fallback={<Loading />}>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </React.Suspense>
    );
}

export default App;
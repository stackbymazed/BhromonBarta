// src/routes/AdminRoute.js
import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Loading from '../Loading/Loading';
import useAdmin from '../../hooks/useAdmin';


const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const {isAdmin} = useAdmin();

  if (loading) return <Loading />;
  if (user && isAdmin) return children;

  return <Navigate to="/signIn" state={{ from: location }} />;
};

export default AdminRoute;

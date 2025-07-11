// src/routes/AdminRoute.js
import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Loading from '../Loading/Loading';
import useTourist from '../../hooks/useTourist';


const TouristRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const { isTourist } = useTourist();

  if (loading) return <Loading />;
  if (user && isTourist) return children;

  return <Navigate to="/signIn" state={{ from: location }} />;
};


export default TouristRoute;

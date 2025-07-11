// src/routes/GuideRoute.js
// src/routes/AdminRoute.js
import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Loading from '../Loading/Loading';
import useGuide from '../../hooks/useGuide';

const GuideRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const { isGuide } = useGuide()

  if (loading) return <Loading />;
  if (user && isGuide) return children;

  return <Navigate to="/signIn" state={{ from: location }} />;
};



export default GuideRoute;

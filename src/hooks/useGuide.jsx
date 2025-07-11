// src/hooks/useGuide.js
// src/hooks/useTourist.js
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';

const useGuide = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: userRoleData = {}, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['user-role', user?.email, user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    }
  });

  const isGuide = userRoleData?.role === 'guide';
  return { isGuide, isLoading};
};


export default useGuide;

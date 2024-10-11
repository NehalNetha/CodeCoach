import { UserContext } from '@/contexts/UserProvider';
import { useContext } from 'react';

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
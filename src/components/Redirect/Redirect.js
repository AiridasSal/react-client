import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const RedirectToLogin = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/login');
  }, [history]);

  return null;
};

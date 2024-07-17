import { createContext, useContext, useEffect, useState } from 'react';
import { UserContextValue, contextType, userType } from '../data/dto/context';
import { jwtDecode } from 'jwt-decode';

const userContext = createContext<UserContextValue>({
  user: null,
  token: null,
  setUser: () => { },
  setTokenToLocal: () => { }
});

const ContextProvider = ({ children }: contextType) => {
  const [user, setUser] = useState<userType | null>(null);
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const setTokenToLocal = (token: string) => {
    setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };
  useEffect(() => {
    if (token) {
      const userData: userType = jwtDecode(token);
      setUser(userData)
    }
  }, [token])

  return (
    <userContext.Provider value={{ user, token, setUser, setTokenToLocal }}>
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;

export const useUserContext = () => useContext(userContext);

import {createContext, useContext} from 'react';
import {User} from '../../types/user';

const UserContext = createContext<User>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = UserContext.Provider;

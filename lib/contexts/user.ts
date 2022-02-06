import {createContext, useContext} from 'react';

export type User = {
    id: number,
    login: string,
    name: string
}

const UserContext = createContext<User>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = UserContext.Provider;

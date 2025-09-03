import React, { useState, createContext, ReactNode } from 'react';
import User from '../models/user';

interface UserContext {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
	children: ReactNode;
}

export const UserContext = createContext<UserContext>({
	user: null,
	setUser: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;

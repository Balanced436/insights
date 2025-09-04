import { Box, Stack } from '@mui/material';
import UserLoginForm from '../components/user/UserLoginForm.tsx';
import { useAuthentification } from '../hooks/useLogin';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

interface Credentials {
	email: string;
	password: string;
}

const LoginPage = () => {
	const { mutate: login } = useAuthentification();
	const { setUser } = useContext(UserContext);

	const handleLogin = (userCredentials: Credentials) => {
		login(userCredentials, {
			onSuccess: (response) => {
				localStorage.setItem('user', JSON.stringify(response));
				setUser(response);
			},
		});
	};

	return (
		<Stack sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
			<Box width={'500px'}>
				<UserLoginForm onSubmit={handleLogin} variant={'filled'} />
			</Box>
		</Stack>
	);
};

export default LoginPage;

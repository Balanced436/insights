import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { error } from 'console';
import { Router, Request, Response } from 'express';
const SALT = 13;
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const prsima = new PrismaClient();

const userRouter = Router();

userRouter.post('/user', async (req: Request, res: Response): Promise<any> => {
	const { name, password, email, nickname } = req.body;

	try {
		if (!name || !password || !email || !nickname) {
			throw Error('username, password and email are required');
		}

		// checks if the user already exists

		const exists = (await prsima.user.findUnique({ where: { email: email } })) !== null;

		if (exists) {
			throw Error('this email is not available');
		}
		const newUser: User | null = await prsima.user.create({
			data: {
				email: email,
				password: bcrypt.hashSync(password, SALT),
				name: name,
				nickname: nickname,
			},
		});

		return res.status(StatusCodes.CREATED).json(newUser);
	} catch (error: any) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: ReasonPhrases.BAD_REQUEST, details: error.message });
	}
});

userRouter.delete('/user', async (req: Request, res: Response): Promise<any> => {
	return res.status(StatusCodes.NOT_IMPLEMENTED).json({ error: ReasonPhrases.NOT_IMPLEMENTED, details: '' });
});

userRouter.get('/user', async (req: Request, res: Response): Promise<any> => {
	return res.status(StatusCodes.NOT_IMPLEMENTED).json({ error: ReasonPhrases.NOT_IMPLEMENTED, details: '' });
});

userRouter.put('/user', async (req: Request, res: Response): Promise<any> => {
	return res.status(StatusCodes.NOT_IMPLEMENTED).json({ error: ReasonPhrases.NOT_IMPLEMENTED, details: '' });
});

export default userRouter;

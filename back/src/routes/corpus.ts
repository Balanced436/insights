import { Corpus, PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
export const sourceRouter = Router();
const prisma = new PrismaClient();

const corpusRouter = Router();

corpusRouter.get('/corpus/:id?', async (req: Request, res: Response): Promise<any> => {
	try {
		const id = req.params.id ? parseInt(req.params.id) : undefined;

		if (id === undefined) {
			const corpuses = await prisma.corpus.findMany();
			return res.status(StatusCodes.OK).json(corpuses);
		} else if (isNaN(id)) {
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid ID' });
		} else {
			const corpus = await prisma.corpus.findUnique({ where: { id: id } });
			if (!corpus) {
				return res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
			}
			return res.status(StatusCodes.OK).json(corpus);
		}
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR, details: '' });
	}
});

corpusRouter.post('/corpus', async (req: Request, res: Response): Promise<any> => {
	const { description, title } = req.body;
	if (!title) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: ReasonPhrases.BAD_REQUEST,
			details: 'corpus title is required',
		});
	}
	try {
		const corpus: Corpus = await prisma.corpus.create({
			data: { description: description, title: title },
		});
		return res.status(StatusCodes.CREATED).json({ corpus });
	} catch (error: any) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ReasonPhrases.NOT_IMPLEMENTED, details: error.message });
	}
});

corpusRouter.delete('/corpus', async (req: Request, res: Response): Promise<any> => {
	return res.status(StatusCodes.NOT_IMPLEMENTED).json({ error: ReasonPhrases.NOT_IMPLEMENTED, details: '' });
});

corpusRouter.put('/corpus', async (req: Request, res: Response): Promise<any> => {
	return res.status(StatusCodes.NOT_IMPLEMENTED).json({ error: ReasonPhrases.NOT_IMPLEMENTED, details: '' });
});

export default corpusRouter;

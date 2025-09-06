import { Server } from 'socket.io';
import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TaskRouter = (io: Server) => {
	const router = Router();
	router.get('/task/:id?', async (req: Request, res: Response): Promise<any> => {
		const id = req.params.id ? parseInt(req.params.id) : undefined;
		try {
			if (id === undefined) {
				const tasks = await prisma.task.findMany();
				return res.status(200).json({ data: tasks });
			} else if (isNaN(id)) {
				throw new Error('Invalid ID');
			} else {
				const task = await prisma.task.findUnique({
					where: {
						id: id,
					},
				});

				return res.status(200).json({ data: task || {} });
			}
		} catch (error: any) {
			return res.status(400).json({ error: 'Internal Server Error', details: error.message });
		}
	});

	router.post('/task', async (req: Request, res: Response): Promise<any> => {
		const transcriptionId = req.body.transcriptionId;
		const taskType = req.body.taskType;
		try {
			if (!transcriptionId) {
				throw new Error('transcriptionId is required');
			}
			if (!taskType) {
				throw new Error('taskType is required');
			}
			const task = await prisma.task.create({
				data: {
					transcriptionId: transcriptionId,
					status: 'PENDING',
					type: taskType,
				},
			});
			io.emit('task', task);
			return res.status(200).json({ data: task });
		} catch (error: any) {
			return res.status(400).json({ error: 'Internal Server Error', details: error.message });
		}
	});

	router.put('/task/:id', async (req: Request, res: Response): Promise<any> => {
		const id = parseInt(req.params.id);
		const status = req.body.status;
		try {
			if (!status) {
				throw new Error('status is required');
			}
			const task = await prisma.task.update({
				where: {
					id: id,
				},
				data: {
					status: status,
					finishedAt: new Date(),
				},
			});
			io.emit('task', task);
			return res.status(200).json({ data: task });
		} catch (error: any) {
			return res.status(400).json({ error: 'Internal Server Error', details: error.message });
		}
	});

	return router;
};

export default TaskRouter;

import { PrismaClient, Summary, TaskType, Task, Status, Transcription } from '@prisma/client';
import { error } from 'console';
import { Router, Request, Response } from 'express';
import { Server } from 'socket.io';
import { OR_COMPLETION_ENDPOINT, OR_DEFAULT_MODEL, OR_DEFAULT_SUMMARIZATION_PROMPT, OpenRouterResponse } from '../models/openrouter.model';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'winston';

const prisma = new PrismaClient();

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY || '';

const summaryRouter = (io: Server, logger: Logger) => {
	const router = Router();
	router.get('/summary/:id?', async (req: Request, res: Response): Promise<any> => {
		const id = req.params.id ? parseInt(req.params.id) : undefined;
		const transcriptionid = req.query.transcriptionid ? parseInt(req.query.transcriptionid as string) : undefined;
		const sourceid = req.query.sourceid ? parseInt(req.query.sourceid as string) : undefined;
		logger.info(`id ${id} - transcription id ${transcriptionid} - sourceid ${sourceid}`);
		const getSummaries = async (transcriptionid: number | undefined, sourceid: number | undefined) => {
			if (transcriptionid) {
				return prisma.summary.findMany({
					where: { transcriptionId: transcriptionid },
				});
			} else if (sourceid) {
				return prisma.summary.findMany({
					where: { transcription: { sourceId: sourceid } },
				});
			} else {
				return prisma.summary.findMany();
			}
		};
		try {
			if (id === undefined) {
				const summaries = await getSummaries(transcriptionid, sourceid);
				res.status(200).json({ data: summaries });
			} else if (isNaN(id)) {
				return res.status(400).json({ message: 'Invalid ID' });
			} else {
				const summary = await prisma.summary.findUnique({
					where: { id: id },
				});
				if (summary) {
					res.status(200).json(summary);
				} else {
					return res.status(404).json({ message: 'source not found' });
				}
			}
		} catch (error: any) {
			return res.status(500).json({ message: 'Internal Server Error', detail: error.message });
		}
	});
	router.post('/summary', async (req: Request, res: Response): Promise<any> => {
		const { transcriptionId, content } = req.body as Summary;

		if (!transcriptionId) {
			return res.status(400).json({ error: 'Internal Server Error' });
		}

		const transcription = await prisma.transcription.findUnique({
			where: { id: transcriptionId },
		});

		if (!transcription) {
			return res.status(404).json({ error: 'Transcription not found' });
		}

		const task = await prisma.task.create({
			data: {
				transcriptionId,
				type: TaskType.SUMMARIZATION,
				status: Status.PENDING,
			},
		});

		const summary = await prisma.summary.create({
			data: { transcriptionId },
		});

		processSummaryAsync(transcription, summary.id, task.id, content, logger);

		return res.status(StatusCodes.CREATED).json({ task });
	});

	router.put('/summary/:id?', async (req: Request, res: Response): Promise<any> => {
		const id = req.params.id ? parseInt(req.params.id) : undefined;
		try {
			if (!id) {
				throw Error('id must be provided');
			}
			if (isNaN(id)) {
				throw Error('id must be a number');
			}

			const summary: Summary | null = await prisma.summary.findUnique({
				where: { id: id },
			});
			if (!summary) {
				throw Error('no summary found with this id');
			}
		} catch (error: any) {
			return res.status(400).json({ error: 'Internal Server Error', details: error.message });
		}
		return res.status(500).json({ error: 'not implemented yet' });
	});

	router.delete('/summary/:id?', async (req: Request, res: Response): Promise<any> => {
		const id = req.params.id ? parseInt(req.params.id) : undefined;
		try {
			if (id) {
				// delete this shit
				const deleteSummary = await prisma.summary.delete({
					where: { id: id },
				});
				return res.status(201).json(deleteSummary);
			} else {
				// throw this shit
				throw Error('summary id must be provided');
			}
		} catch (error: any) {
			return res.status(400).json({ error: 'Internal Server Error', details: error.message });
		}
	});

	async function generateSummaryFromExternalService(transcriptionContent: string): Promise<string> {
		if (transcriptionContent.length == 0) throw new Error('');
		const headers = new Headers({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPEN_ROUTER_API_KEY}`,
		});

		const body = JSON.stringify({
			model: OR_DEFAULT_MODEL,
			messages: [
				{
					role: 'user',
					content: `${OR_DEFAULT_SUMMARIZATION_PROMPT}: ${transcriptionContent}`,
				},
			],
		});

		const response = await fetch(OR_COMPLETION_ENDPOINT, {
			method: 'POST',
			headers,
			body,
			redirect: 'follow',
		});

		if (!response.ok) throw new Error('SUMMARY_OPEN_ROUTER_ERROR');

		const result: OpenRouterResponse = await response.json();
		return result.choices[0].message.content;
	}

	async function processSummaryAsync(transcription: Transcription, summaryId: number, taskId: number, content: string | null, logger: Logger) {
		let generatedContent: string = '';
		try {
			if (!transcription.content) {
				throw Error('');
			}
			if (content) {
				generatedContent = content;
			} else {
				generatedContent = await generateSummaryFromExternalService(transcription.content);
			}
			logger.info(`processSummaryAsync - content ${generatedContent}`);

			await prisma.summary.update({
				where: { id: summaryId },
				data: { content: generatedContent },
			});

			await prisma.task.update({
				where: { id: taskId },
				data: { status: Status.COMPLETED, finishedAt: new Date() },
			});

			io.emit('task', { id: taskId, status: Status.COMPLETED });
		} catch (error) {
			console.error('Error during summary generation:', error);

			await prisma.task.update({
				where: { id: taskId },
				data: { status: Status.ERROR, finishedAt: new Date() },
			});
		}
	}

	return router;
};

export default summaryRouter;

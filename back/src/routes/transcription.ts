import { Request, Response, Router } from 'express';
import fs from 'fs';
import { Server } from 'socket.io';
import { WHISPER_INFERENCE_ENDPOINT, WhisperResponse } from '../models/whisper.model';
import { WhisperResponseText } from '../utils/whisper.utils';
import { Logger } from 'winston';
import { prisma } from '../lib/prisma';
import { Source, Status, Task, TaskType, Transcription } from '../lib/prisma/client';


const TRANSCRIPTION_PLACEHOLDER = `La Réunion est une île volcanique située dans l'ouest de l'océan Indien, à l'est de l'Afrique, dans l'hémisphère sud. 
									Elle constitue à la fois un département et une région d'outre-mer français (DROM).
									D'une superficie de 2 512 km2, l'île de La Réunion est située dans l'archipel des Mascareignes à 172 km à l'ouest-sud-ouest de l'île Maurice et à 679 km à l'est-sud-est de Madagascar. 
									Il s'agit d'une île volcanique créée par un point chaud. Le point culminant est le piton des Neiges[3] avec une altitude de 3 070 mètres. L'île présente un relief escarpé travaillé par une érosion très marquée.
									Le piton de la Fournaise (2 632 mètres), situé dans le sud-est de l'île, est un des volcans les plus actifs du monde. Bénéficiant d'un climat tropical d'alizé maritime et située sur la route des cyclones, 
									La Réunion abrite un endémisme exceptionnel.`

const TranscriptionRouter = (io: Server, logger: Logger) => {
	const router = Router();

	router.get('/transcription/:id?', async (req: Request, res: Response): Promise<any> => {
		const id = req.params.id ? parseInt(req.params.id) : undefined;
		const sourceid = Number(req.query.sourceid);
		logger.info(`sourceid: ${sourceid}`);

		const getTranscriptions = async (sourceid: number) => {
			return sourceid
				? await prisma.transcription.findMany({
						where: { sourceId: sourceid },
					})
				: await prisma.transcription.findMany();
		};

		try {
			if (id === undefined) {
				const transcriptions = await getTranscriptions(sourceid);
				return res.status(200).json(transcriptions);
			} else if (isNaN(id)) {
				throw new Error('Invalid ID');
			} else {
				const transcription = await prisma.transcription.findUnique({
					where: {
						id: id,
					},
				});
				return res.status(200).json({ data: transcription || {} });
			}
		} catch (error: any) {
			return res.status(400).json({ error: 'Internal Server Error', details: error.message });
		}
	});

	router.post('/transcription', async (req: Request, res: Response): Promise<any> => {
		const sourceId = req.body.sourceId;

		const skipTranscription: boolean | undefined = req.body.skipTranscription;

		try {
			if (!sourceId) {
				throw new Error('sourceId is required');
			}

			const source: Source | null = await prisma.source.findUnique({
				where: { id: sourceId },
			});
			if (!source) {
				throw Error('source not found');
			}

			const audioFile: string | null = source.audioUrl;
			if (!audioFile) {
				throw Error('Audio file not found');
			}
			const transcription: Transcription = await prisma.transcription.create({
				data: {
					sourceId: sourceId,
				},
			});

			const task: Task = await prisma.task.create({
				data: {
					transcriptionId: transcription.id,
					type: TaskType.TRANSCRIPTION,
				},
			});
			io.emit('task', task);

			if (!skipTranscription) {
				const processTranscription = async () => {
					try {
						const audioFileBlob = await fs.promises.readFile(audioFile);
						const formData = new FormData();
						formData.append('file', new Blob([audioFileBlob]), 'file.wav');

						const response = await fetch(WHISPER_INFERENCE_ENDPOINT, {
							method: 'POST',
							body: formData,
						});
						if (!response.ok) {
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						const res: WhisperResponse = await response.json();
						await prisma.transcription.update({
							where: { id: transcription.id },
							data: { content: WhisperResponseText(res) },
						});
						await prisma.task.update({
							where: { id: task.id },
							data: { status: Status.COMPLETED, finishedAt: new Date() },
						});

						// set task status to success
						const taskstatus = await prisma.task.update({
							where: { id: task.id },
							data: { status: Status.COMPLETED, finishedAt: new Date() },
						});
						io.emit('task', taskstatus);
					} catch (error) {
						console.error('Fetch error:', error);
						// set task status to error
						const taskstatus = await prisma.task.update({
							where: { id: task.id },
							data: { status: Status.ERROR, finishedAt: new Date() },
						});
						io.emit('task', taskstatus);
					}
				};
				processTranscription();
			} else {
				const fakeTranscription = async () => {
					/* console.info("skipTranscription is set to true");
          console.info("transcription.id", transcription.id);
          console.info("task.id", task.id); */
					await prisma.transcription.update({
						where: { id: transcription.id },
						data: { content: TRANSCRIPTION_PLACEHOLDER },
					});
					const taskstatus = await prisma.task.update({
						where: { id: task.id },
						data: { status: Status.COMPLETED, finishedAt: new Date() },
					});
					io.emit('task', taskstatus);
				};
				fakeTranscription();
			}
			return res.status(201).json({ task: task });
		} catch (error: any) {
			return res.status(400).json({ error: 'Internal Server Error', details: error.message });
		}
	});

	router.put('/transcription/:id?', async (req: Request, res: Response): Promise<any> => {
		const id = req.params.id ? parseInt(req.params.id) : undefined;
		try {
			if (id === undefined) {
				throw Error('transcription id must be provide');
			}
			const { content } = req.body as Transcription;

			if (!content) {
				throw Error('content must be provide');
			}
			const transcription = await prisma.transcription.update({
				where: { id: id },
				data: { content: content },
			});
			return res.status(201).json({ data: transcription });
		} catch (error: any) {
			return res.status(400).json({ error: 'Internal Server Error', details: error.message });
		}
	});

	router.delete('/transcription/:id?', async (req: Request, res: Response): Promise<any> => {
		const id = req.params.id ? parseInt(req.params.id) : undefined;
		try {
			if (id === undefined || isNaN(id)) {
				throw new Error('Invalid ID');
			}
			const transcription = await prisma.transcription.delete({
				where: {
					id: id,
				},
			});
			return res.status(201).json({ data: transcription });
		} catch (error: any) {
			return res.status(400).json({ error: 'Internal Server Error', details: error.message });
		}
	});

	return router;
};

export default TranscriptionRouter;

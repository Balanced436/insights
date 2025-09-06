import { WhisperResponse } from '../models/whisper.model';

export function WhisperResponseText(response: WhisperResponse): string {
	const res = response.data.map((e) => e.sentence).join();
	return res;
}

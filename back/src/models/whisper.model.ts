export interface WhisperResponse{
    code: number,
    data : {
        sentence: string,
        t0: string,
        t1: string
    }[]
}

export const WHISPER_INFERENCE_ENDPOINT = "http://whisper:8080/inference"
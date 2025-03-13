import request from 'supertest';
import app from '../src/app'
import path from 'path';

async function main() {
    // add some sources
    const sources = [{
        title: 'SEED1 title JT 5-11-2024-19h',
        description: 'SEED description JT 5-11-2024-19h',
        video: path.resolve(__dirname, '../src/__tests__/fixtures/5-11-2024-19h.mp4'),
        audio: path.resolve(__dirname, '../src/__tests__/fixtures/5-11-2024-19h.wav')
      },{
        title: 'SEED2 title JT 5-11-2024-19h',
        description: 'SEED description JT 5-11-2024-19h',
        video: path.resolve(__dirname, '../src/__tests__/fixtures/5-11-2024-19h.mp4'),
        audio: path.resolve(__dirname, '../src/__tests__/fixtures/5-11-2024-19h.wav')
      },{
        title: 'SEED3 title JT 5-11-2024-19h',
        description: 'SEED description JT 5-11-2024-19h',
        video: path.resolve(__dirname, '../src/__tests__/fixtures/5-11-2024-19h.mp4'),
        audio: path.resolve(__dirname, '../src/__tests__/fixtures/5-11-2024-19h.wav')
      }];

      // add some transcriptions
      const transcriptions = [
        {"sourceId":1, "skipTranscription": true},
        {"sourceId":2, "skipTranscription": true},
        {"sourceId":3, "skipTranscription": true}]

      for(var element of sources){
        await request(app)
        .post('/source')
        .field('title', element.title)
        .field('description', element.description)
        .attach('video', element.video)
        .attach('audio', element.audio);
      }

      for (var transcription of transcriptions){
        await request(app).post('/transcription').send({"sourceId": transcription.sourceId, "skipTranscription":transcription.skipTranscription})
      }
    }

main()

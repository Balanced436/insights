import request from 'supertest';
import app from '../src/app'
import path from 'path';

async function main() {
    const newSource = [{
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

  

      for(var element of newSource){
        await request(app)
        .post('/source')
        .field('title', element.title)
        .field('description', element.description)
        .attach('video', element.audio)
        .attach('audio', element.video);
      }
    }

main()

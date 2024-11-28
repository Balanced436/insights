import request from 'supertest';
import app from '../src/app'
import path from 'path';

async function main() {
    const newSource = {
        title: 'SEED title JT 5-11-2024-19h',
        description: 'SEED description JT 5-11-2024-19h',
        video: path.resolve(__dirname, '../__tests__/fixtures/5-11-2024-19h.mp4'),
        audio: path.resolve(__dirname, '../__tests__/fixtures/5-11-2024-19h.wav')
      };

      await request(app)
      .post('/source')
      .field('title', newSource.title)
      .field('description', newSource.description)
      .attach('video', newSource.audio)
      .attach('audio', newSource.video);
    }

main()

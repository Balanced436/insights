import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import app from '../app'
import path from 'path';
const prisma = new PrismaClient();

describe('CRUD operations for Source', () => {
  const newSource = {
    title: 'JT 5-11-2024-19h',
    description: 'Description of JT 5-11-2024-19h',
    video: path.resolve(__dirname, 'fixtures/5-11-2024-19h.mp4'),
    audio: path.resolve(__dirname, 'fixtures/5-11-2024-19h.wav')
  };
  let sourceId: number;

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new source', async () => {
    const response = await request(app)
      .post('/source')
      .field('title', newSource.title)
      .field('description', newSource.description)
      .attach('video', newSource.audio)
      .attach('audio', newSource.video);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Source created successfully');
    expect(response.body.data.title).toBe(newSource.title)
    expect(response.body.data.description).toBe(newSource.description)
    sourceId = response.body.data.id;
    
  });

  it('should get all sources', async () => {
    const response = await request(app).get('/source')
    const allSources = prisma.source.findMany()
    expect(response.body.length).toBe((await allSources).length)
  });

  it('should get a single source by ID', async () => {
    expect(true)
  });

  it('should update a source', async () => {
    expect(true)
  });

  it('should delete a source', async () => {
    expect(true)
  });
});
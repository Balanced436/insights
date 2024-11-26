import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import app from '../src/app'
import path from 'path';
const prisma = new PrismaClient();

describe('CRUD operations for Source', () => {
  let sourceId: number;

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new source', async () => {
    const response = await request(app)
    .post('/source')
    .field('title', 'my awesome avatar')
    .field('description','Description')
    // TODO: change 
    .attach('video',path.resolve(__dirname, 'fixtures/5-11-2024.mp4'))
    .attach('audio',path.resolve(__dirname, 'fixtures/5-11-2024.wav'))
    expect(response.body).toEqual('Source created successfully')

    const body = JSON.parse(response.body)
    expect(body.message).toEqual('201');
    
  });

  it('should get all sources', async () => {
    expect(true)
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
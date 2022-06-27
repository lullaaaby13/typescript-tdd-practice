import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import supertest, { SuperAgentTest } from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';

describe('포스트', () => {

    let app: INestApplication;
    let mongod: MongoMemoryServer;
    let agent: SuperAgentTest;

    beforeAll(async () => {
        mongod = new MongoMemoryServer({ instance: { port: 27017 } });
        await mongod.start();
    });

    afterAll(async () => {
        await mongod.stop();
    });

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                MongooseModule.forRoot(mongod.getUri()),
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        agent = request.agent(app.getHttpServer());
    });

    it('포스트를 생성한다.', async () => {
        const createResponse = await 포스트_생성({ title: 'TEST' });
        const findResponse = await 포스트_단건_조회(createResponse.body._id);

        expect(findResponse.status).toEqual(200);
        expect(findResponse.body.title).toEqual('TEST');
    });

    async function 포스트_생성(body: any) {
        return agent.post('/posts').send(body);
    }

    async function 포스트_단건_조회(_id: string) {
        return agent.get(`/posts/${_id}`);
    }

});

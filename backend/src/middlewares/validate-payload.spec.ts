import { expect } from 'chai';
import * as sinon from 'sinon';
import { validatePayload } from './validate-payload';
import { ZodSchema, ZodError, ZodIssue } from 'zod';
import { Request, Response } from 'express';
import httpMocks from 'node-mocks-http';

describe('validatePayload Middleware', () => {
  let req: Request;
  let res: httpMocks.MockResponse<Response>;
  let next: sinon.SinonStub;
  let schema: ZodSchema;

  beforeEach(() => {
    req = httpMocks.createRequest({
      body: {},
    });
    res = httpMocks.createResponse();
    next = sinon.stub();
    schema = sinon.createStubInstance(ZodSchema) as unknown as ZodSchema;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call next() if payload is valid', () => {
    schema.parse = sinon.stub().returns({});
    const middleware = validatePayload(schema);
    middleware(req, res, next);
    expect(next.called).to.be.true;
  });

  it('should return 400 if payload is invalid', () => {
    const errorMessage = 'Invalid payload';
    const zodIssue: ZodIssue = {
      code: 'invalid_type',
      expected: 'string',
      received: 'number',
      path: [],
      message: errorMessage,
    };
    schema.parse = sinon.stub().throws(new ZodError([zodIssue]));

    const middleware = validatePayload(schema);
    middleware(req, res, next);

    expect(res.statusCode).to.equal(400);
    expect(res._getData()).to.equal(JSON.stringify({ message: errorMessage }));
    expect(next.called).to.be.false;
  });
});

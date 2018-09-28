//
// Copyright 2018 Wireline, Inc.
//

import Wireline from '@wirelineio/sdk';

import awsServerlessExpress from 'aws-serverless-express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import express from 'express';

import { init } from './src/server';

const app = express();

// Must come first.
app.use(awsServerlessExpressMiddleware.eventContext());
const server = awsServerlessExpress.createServer(app);

module.exports = {
  express: Wireline.exec(async (event, context) => {
    init(app, context);
    awsServerlessExpress.proxy(server, event, context);
  })
};

//
// Copyright 2018 Wireline, Inc.
//

// Enable source map support.
// https://github.com/evanw/node-source-map-support#programmatic-usage
import 'source-map-support/register';

import Wireline from '@wirelineio/sdk';

import awsServerlessExpress from 'aws-serverless-express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import express from 'express';
import nconf from 'nconf';
import nconfYAML from 'nconf-yaml';

import { init } from './src/server';

const app = express();

// Must come first.
app.use(awsServerlessExpressMiddleware.eventContext());

// Use hierarchical node.js configuration with files, environment variables, command-line arguments, and atomic object merging.
// https://github.com/indexzero/nconf
nconf.argv().env().file({
  file: process.env[Wireline.WRL_CONFIG_PATH] || Wireline.WRL_CONFIG_PATH_DEFAULT_VALUE,
  format: nconfYAML
});

// configure app
init(app, nconf.get());

const server = awsServerlessExpress.createServer(app);

module.exports = {
  express: Wireline.exec(async (event, context, response) => {
    awsServerlessExpress.proxy(server, event, context);
  })

};

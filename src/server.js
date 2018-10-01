
import path from 'path';

import express from 'express';
import handlebars from 'express-handlebars';

export const init = (app, context) => {
  const { config, static_assets_url } = context.wireline;
  console.log(' ASSETS:', static_assets_url);

  console.log(' CONTEXT:', context.wireline);

  const ENV = {
    VIEWS_DIR: config.handlebars.views,
    ASSETS: static_assets_url
  }

  const locals = {
    // Configuration for JS app.
    appConfig: {
      rootId: 'ux-root',
    },

    appBundle: {
      js: `./assets/app.js`
    }
  };

  //
  // Middleware.
  // Assign local variables.
  //

  app.use((req, res, next) => {
    res.locals = {
      ...res.locals,
      req,
      event: req.apiGateway.event,
      root: ''
    };

    next();
  });

  //
  // Handlebars.
  //

  app.engine('hbs', handlebars({
    extname: '.hbs',
    layoutsDir: path.join(ENV.VIEWS_DIR, '/layouts'),
    defaultLayout: 'main',
    helpers: {

      // {{#section 'body'}}
      section: function (name, options) {
        this.sections = this.sections || {};
        this.sections[name] = options.fn(this);
      },

      // {{{ json var }}}
      json: function (object, indent = 0) {
        return JSON.stringify(object, null, indent);
      }
    }
  }));

  app.set('view engine', 'hbs');
  app.set('views', ENV.VIEWS_DIR);

  const staticRouter = express.Router();

  staticRouter.get(/^\/assets\/.*/, function (req, res) {
    let match = req.path.match(/^\/assets(\/.*)/);
    res.redirect(301, `${ENV.ASSETS}${match[1]}`);
  });

  staticRouter.get(/^\/favicon.ico/, function (req, res) {
    res.redirect(301, `${ENV.ASSETS}${req.path}`);
  });

  app.use('/', staticRouter);
  
  const appRouter = express.Router();

  appRouter.get('/', (req, res) => {
    res.render('index', locals);
  });

  app.use('/', appRouter);

  return app;  
}

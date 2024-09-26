const helmet = require('helmet');
const nocache = require('nocache');

module.exports = (app) => {
  app.use(helmet());
  app.use(nocache());

  let directives = {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
  };

  app.use(helmet.contentSecurityPolicy({ directives: directives }));
};

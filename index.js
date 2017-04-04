
const responseTime = require('koa-response-time');
const compress = require('koa-compress');
const logger = require('koa-logger');
const Koa = require('koa');
const router = require('koa-joi-router');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

var app = new Koa();

if ('test' != env) {
  app.use(logger());
}

app.use(responseTime());
app.use(compress());

const Joi = router.Joi;
const api = router();

const db = {users: []};

api.get('/', async (ctx) => {
  ctx.body = 'hello api!';
});

api.route({
  method: 'get',
  path: '/users',
  validate: {
    output: {
      200: {
        body: Joi.array().items({
          id: Joi.number(),
          name: Joi.string()
        })
      }
    }
  },
  handler: async (ctx) => {
    ctx.body = db.users.map((user) => {
      return {id: user.id, name: user.name}
    });
    ctx.status = 200;
  }
});


api.route({
  method: 'post',
  path: '/users',
  validate: {
    body: {
      name: Joi.string().max(100).required(),
      email: Joi.string().lowercase().email().required(),
      password: Joi.string().max(100).required(),
      _csrf: Joi.string().token()
    },
    type: 'json',
    output: {
      200: {
        body: {
          id: Joi.number(),
          name: Joi.string()
        }
      }
    }
  },
  handler: async (ctx) => {
    const user = ctx.request.body;
    const id = db.users.push(user);
    user.id = id;
    ctx.body = {id: user.id, name: user.name};
    ctx.status = 200;
  }
});

app.use(api.middleware());
app.listen(port);

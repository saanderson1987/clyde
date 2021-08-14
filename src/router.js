const Router = require('koa-router');
const Rhinoceros = require('./rhinoceros');

const handleError = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
    if (e.resStatusCode) ctx.response.status = e.resStatusCode;
    ctx.response.body = { error: e.message }
  }
}

const router = new Router();

router.use(handleError)

router.get('/rhinoceros', (ctx, next) => {
  const { query } = ctx.request;
  ctx.response.body = { 
    rhinoceroses: Object.keys(query).length 
      ? Rhinoceros.getByQuery(query) 
      : Rhinoceros.getAll() 
    };
});

router.get('/rhinoceros/:id', (ctx, next) => {
  ctx.response.body = Rhinoceros.getById(ctx.params.id);
});

router.post('/rhinoceros', (ctx, next) => {
  ctx.response.body = Rhinoceros.create(ctx.request.body);
});

module.exports = router;

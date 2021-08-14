const Router = require('koa-router');
const Rhinoceros = require('./rhinoceros');

const router = new Router();

router.get('/rhinoceros', (ctx, next) => {
  ctx.response.body = { rhinoceroses: Rhinoceros.getAll() };
});

router.get('/rhinoceros/:id', (ctx, next) => {
  ctx.response.body = Rhinoceros.getById(ctx.params.id);
});

router.post('/rhinoceros', (ctx, next) => {
  ctx.response.body = Rhinoceros.create(ctx.request.body);
});

module.exports = router;

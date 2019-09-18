import { Router } from '8track'

const router = new Router()

router.all`(.*)`.use(async (ctx, next) => {
  const url = new URL(ctx.request.url)
  console.log(`Handling ${ctx.request.method} - ${url.pathname}`)
  await next()
  console.log(`${ctx.request.method} - ${url.pathname}`)
})

router.get`/`.handle(ctx => ctx.html('Hello, world!'))

router.all`(.*)`.handle(ctx => ctx.end('Not found', { status: 404 }))

addEventListener('fetch', e => {
  e.respondWith(router.getResponseForRequest(e.request))
})

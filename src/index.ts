import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'


type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()
app.use(prettyJSON())
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))
app.get('/', (c) => c.text('GLDS1024 WEB API'))
app.get("/query/users/:id", async (c) => {
  const userId= c.req.param("id")
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(userId).all()
    return c.json(results)
  } catch (e) {
    return c.json({err: e}, 500)
  }
})

export default app

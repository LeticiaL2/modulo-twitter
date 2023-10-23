import jsonServer from 'json-server'
import auth from 'json-server-auth'
import cors from 'cors'

const app = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

app.use(cors())

app.db = router.db
app.use(middlewares)
app.use(auth)
app.use(router)

// app.get('/profile', (req, res) => {
  
// })

app.listen(3004, () => {
  console.log('JSON Server is running')
})

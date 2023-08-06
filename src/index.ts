import {connectDB } from './infra/db/dbConnect'
import buildServer from './interfaces/rest/server'

async function run () {
  await connectDB()
  await buildServer()
}

run()

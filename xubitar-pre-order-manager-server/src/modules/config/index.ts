import dotenv from "dotenv"
import path from "path"
const envPath=path.join(process.cwd(),".env")
dotenv.config({
    path:envPath
})

export default {
    databaseUrl:process.env.DATABASE_URL,
    port:process.env.PORT,
    cors_url:process.env.CORS_URL
}
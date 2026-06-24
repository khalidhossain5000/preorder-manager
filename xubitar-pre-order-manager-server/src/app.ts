import express, { Request, Response } from "express"
import cors from "cors"
import preorderRoute from "./modules/preorder/route.preorder"
const app=express()

//default middleware
app.use(cors({
    origin:"https://xubitar-pre-order-manager.vercel.app",
    credentials:true
}))
app.use(express.json())

//default hello world

app.get("/",async(req:Request,res:Response)=>{
    res.send("Hello worlds, Pre order manager server is running")
})



app.use("/api/preorder",preorderRoute)

export default app
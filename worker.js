const {Worker} = require("bullmq")
const Redis  = require("ioredis")
const { resolve } = require("path")

const redisConnection = new Redis({
    host:"127.0.0.1",
    port:6379,
    maxRetriesPerRequest:null
})

const worker = new Worker(
    "taskQueue",
    async(job)=>{
        //job...        
        console.log(`procesing job for ${job.data.name}`)
        await new Promise((resolve)=>setTimeout((resolve),  ))
        console.log(`job done for ${job.data.name}`)
    },
    {connection:redisConnection}
)
worker.on("completed",(job)=>{
    console.log("job successfully done ",job.id)
})
worker.on("failed",(job,err)=>{
    console.log("job failed...",job.id)
})
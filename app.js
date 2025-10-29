const express = require("express"); //express module..
const mongoose = require("mongoose");
const app = express();
const Redis = require("ioredis");
const { Queue } = require("bullmq");

//global middlware..
app.use(express.json()); //req.body json type excpet..

//require routes

const userRoutes = require("./routes/UserRoutes");
//app level.use
//app.use(userRoutes)
app.use("/user", userRoutes);

const roleRoutes = require("./routes/RoleRoutes");
app.use("/roles", roleRoutes);

const uploadRoutes = require("./routes/UploadRoutes");
app.use("/upload", uploadRoutes);

//db connection...
mongoose.connect("mongodb://127.0.0.1:27017/mern_club_mix").then(() => {
  console.log("database connected successfully!!");
});

//redis connection
const redisConnection = new Redis({
  host: "127.0.0.1",
  port: 6379,
});
//queue..
const myQueue = new Queue("taskQueue", { connection: redisConnection });

app.post("/set-batch", async (req, res) => {
  const { name } = req.body;
  await myQueue.add("task", { name }, { delay: 0 });
  res.json({
    message: "batch set successfully...",
  });
});

const fakeData = {
  1: { name: "ram", age: 23 },
  2: { name: "jay", age: 23 },
  3: { name: "raj", age: 23 },
  4: { name: "ajay", age: 23 },
  5: { name: "amit", age: 23 },
};

const cacheMiddleware = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cachedData = await redisConnection.get(userId);
    if (cachedData) {
      console.log("cache hit...");
      return res.json({
        message: "data fetched successfully !!",
        data: JSON.parse(cachedData),
      });
      
    }
    console.log("cache miss");
    next();
  } catch (err) {
    console.log("redis error...", err);
    next();
  }
};

app.get("/userdemo/:userId", cacheMiddleware, (req, res) => {
  const { userId } = req.params;
  const userData = fakeData[userId]; //db operation...
  //cache store...
  redisConnection.setex(userId, 600, JSON.stringify(userData));
  return res.json({
    message: "data fetched successfully !!",
    data: userData,
  });
});

//server creation...
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

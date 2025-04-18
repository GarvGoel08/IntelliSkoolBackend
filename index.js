import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/conn.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

connectDB();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://intelli-skool.vercel.app"],
  optionsSuccessStatus: 200, // Corrected property name
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

import classRouter from "./routes/classRoutes.js";
import classRoomRouter from "./routes/classRoomRoutes.js";
import userRouter from "./routes/userRoutes.js";
import registrationRouter from "./routes/registrationRoutes.js";
import testRouter from "./routes/testRoutes.js";
import assignmentRouter from "./routes/assignmentRoutes.js";

import path from "path";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = YAML.load(path.join(__dirname, "docs", "swagger.yaml"));

app.use("/api/classes", classRouter);
app.use("/api/classrooms", classRoomRouter);
app.use("/api/user", userRouter);
app.use("/api/register", registrationRouter);
app.use("/api/tests", testRouter);
app.use("/api/assignments", assignmentRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => {
  res.send("IntelliSkool API is Running");
});

const PORT = process.env.PORT || 8080;

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const server = app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});

// Socket.io Connection
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5173/",
      "https://ezinterview.vercel.app",
      "https://ezinterview.vercel.app/",
      "https://intelli-skool.vercel.app",
      "https://intelli-skool.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// import interview from "./models/interviewModel.js";
// import Candidate from "./models/candidateModel.js";
// import Submission from "./models/submissions.js";
// import Prompt from "./models/gptModel.js";

import Class from "./models/Class.js";
import User from "./models/Users.js";

io.on("connection", (socket) => {
  socket.on("connect-room", async ({ roomID, userID }) => {
    socket.join(roomID);
    socket.on("ping", async () => {
      User.findByIdAndUpdate(userID, { $inc: { attendanceMinutes: 1 } });
    });
    socket.on("Quiz", async ({ question, options, timeAlloted }) => {
      socket.emit("Quiz", { question, options, timeAlloted });
    });
    socket.on("Answer", async ({ answer, time_taken }) => {
      // submission.answers.push({ answer, time_taken });
      // await submission.save();
    });
  });
});
//     let lookAwayTimestamp = 0;
//     socket.on("look-away", () => {
//       socket.broadcast.to(roomID).emit("look-away");
//       lookAwayTimestamp += 1;
//     });
//       lookAwayTimestamp += 1;
//     });
//     socket.on("look-back", async () => {
//       socket.broadcast.to(roomID).emit("look-back");
//       if (
//         !isNaN(parseFloat(lookAwayTimestamp)) &&
//         isFinite(lookAwayTimestamp)
//       ) {
//         await interview.findByIdAndUpdate(roomID, {
//           $inc: { looking_away_time: lookAwayTimestamp },
//           isCompleted: true,
//         });
//       } else {
//         console.error("Invalid lookAwayTimestamp:", lookAwayTimestamp);
//       }
//       lookAwayTimestamp = 0;
//     });
//     socket.on("out-of-tab", () => {
//       socket.broadcast.to(roomID).emit("out-of-tab");
//       outOfTabTimestamp = Date.now();
//     });
//     socket.on("back-in-tab", async () => {
//       socket.broadcast.to(roomID).emit("back-in-tab");
//       const timeSpent = Date.now() - outOfTabTimestamp;
//       if (!isNaN(parseFloat(timeSpent)) && isFinite(timeSpent)) {
//         const int = await interview.findByIdAndUpdate(roomID, {
//           $inc: { outoftab_time: timeSpent / 1000 },
//         });
//       }
//     });
//   });
//   socket.on("connect-test", async ({ testID, candidate_id }) => {
//     socket.join(testID);
//     const test = await Prompt.find({ testId: testID });
//     if (!test) {
//       socket.emit("test-not-found");
//       socket.disconnect();
//       return;
//     }
//     const company_id = test[0].interviewerId;

//     // Check if submission already exists
//     const existingSubmission = await Submission.findOne({
//       test_id: testID,
//       candidate_id,
//       company_id,
//     });
//     if (existingSubmission) {
//       socket.emit("submission-exists");
//       socket.disconnect();
//       return; // Added to stop further execution
//     }

//     const submission = new Submission({
//       test_id: testID,
//       company_id,
//       candidate_id,
//     });
//     await submission.save();

//     let outOfTabTimestamp;
//     let lookAwayTimestamp = 0;
//     socket.on("look-away", () => {
//       socket.broadcast.to(testID).emit("look-away");
//       lookAwayTimestamp += 1;
//     });
//     socket.on("look-back", async () => {
//       socket.broadcast.to(testID).emit("look-back");
//       if (
//         !isNaN(parseFloat(lookAwayTimestamp)) &&
//         isFinite(lookAwayTimestamp)
//       ) {
//         await Submission.findByIdAndUpdate(submission._id, {
//           $inc: { looking_away_time: lookAwayTimestamp },
//           isCompleted: true,
//         });
//       } else {
//         console.error("Invalid lookAwayTimestamp:", lookAwayTimestamp);
//       }
//       lookAwayTimestamp = 0;
//     });
//     socket.on("out-of-tab", () => {
//       socket.broadcast.to(testID).emit("out-of-tab");
//       outOfTabTimestamp = Date.now();
//       console.log("Out of Tab");
//     });
//     socket.on("back-in-tab", async () => {
//       socket.broadcast.to(testID).emit("back-in-tab");
//       const timeSpent = Date.now() - outOfTabTimestamp;
//       console.log("Back in Tab" + timeSpent);
//       if (!isNaN(parseFloat(timeSpent)) && isFinite(timeSpent)) {
//         const int = await Submission.findByIdAndUpdate(submission._id, {
//           $inc: { outoftab_time: timeSpent / 1000 },
//         });
//       }
//     });
//     socket.on("Answer", async ({ questionNo, answer, time_taken }) => {
//       submission.answers.push({ answer, time_taken });
//       await submission.save();
//     });
//     socket.on("End-Test", async ({totalScore, totalTime}) => {
//       await Submission.findByIdAndUpdate(submission._id, { test_score: totalScore, time_taken: totalTime });
//       await Candidate.findByIdAndUpdate(candidate_id, {
//         current_status: "Test Submitted",
//       });
//       socket.disconnect();
//     });
//   });
// });

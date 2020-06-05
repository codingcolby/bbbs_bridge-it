import express from "express";
import bodyParser from "body-parser";
import sessionMiddleware from "./modules/session-middleware";
import passport from "./strategies/user.strategy";
import userRouter from "./routes/user.router";

const uploaderS3Router = require("react-s3-uploader/s3router"); // no @types for this module

require("dotenv").config();

const app: any = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use(
  "/s3",
  uploaderS3Router({
    bucket: "bridge-it-bucket", // required
    region: "us-east-2", // optional
    headers: { "Access-Control-Allow-Origin": "*" }, // optional
    ACL: "public-read", // this is the default - set to `public-read` to let anyone view uploads
  }) // PRIME!!! we'll need to make it so this app is the only app that may access the bucket
);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT: number | string = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, (): void => {
  console.log(`So awesome. Much wow. Listening on port: ${PORT}`);
});

export default app;

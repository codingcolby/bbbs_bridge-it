import express from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import sessionMiddleware from "./modules/session-middleware";
import passport from "./strategies/user.strategy";
import userRouter from "./routes/user.router";
import pdfRouter from "./routes/pdf.router";
import tableRouter from "./routes/table.router";

require("dotenv").config();

const app: any = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express File Upload
app.use(fileUpload());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/table", matchtableRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT: number | string = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, (): void => {
	console.log(`So awesome. Much wow. Listening on port: ${PORT}`);
});

export default app;

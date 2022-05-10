var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
// adding cors stopped frontend from trying to post to localhost3000 where react is running

// *rename to match my router files
var projectsRouter = require("./routes/projects");
var studentsRouter = require("./routes/students");
var instructorsRouter = require("./routes/instructors");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// needed to make this folder static inorder to access the file in the browser using its name
app.use("/public/files", express.static("public/files"));

// *rename to match my router files
//adding /api to every route
app.use("/api/projects", projectsRouter);
app.use("/api/students", studentsRouter);
app.use("/api/instructors", instructorsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// send the error page to client
	res.status(err.status || 500);
	res.send("error");
});

module.exports = app;

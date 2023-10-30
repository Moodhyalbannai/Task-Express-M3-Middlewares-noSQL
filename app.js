const express = require("express");
const app = express();
const postsRoutes = require("./api/posts/posts.routes");
const connectDb = require("./database");
const path = require("path");
const morgan = require("morgan");

app.use("/media", express.static(path.join(__dirname, "media")));

connectDb();
app.use(express.json());
app.use(morgan("dev"));

app.use("/posts", postsRoutes);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use((req, res, next) => {
  res.status(404).json({ msg: "Path Not Found!" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ msg: err.msg });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

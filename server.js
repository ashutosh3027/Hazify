const db = require('./db');
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv"); // loads environment variables from a .env file into process.env
dotenv.config({ path: "./.env" });
const cors = require("cors");
const app = express();
const whetherRoutes = require('./Routes/whetherRoutes');
app.use(cors());
// Body parser, reading data from body into req.body
app.use(express.json({limit:'10kb'}));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use('/api/v1/whether', whetherRoutes);






const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

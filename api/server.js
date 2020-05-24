const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//IMPORT ROUTES
require("./app/routes/webhookRoutes")(app);
require("./app/routes/webhookDataRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});

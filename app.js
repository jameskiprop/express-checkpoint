const express = require("express");
const path = require("path");
const app = express();

//middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

//middlewear that will verify the request time
function workingHoursMiddleware(req, res, next) {
  const currentDate = new Date();
  const day = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = currentDate.getHours(); // 0 to 23 (24-hour format)

  // Checking if it's Monday to Friday, 9AM to 5PM
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // the request proceeds
  } else {
    res.send(
      "<h1>Sorry, this service is only available from Monday to Friday, 9:00 to 17:00</h1>"
    );
  }
}
//applying the middlewear to all routes

app.use(workingHoursMiddleware);

//setting up the routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "views/services.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views/contact.html"));
});

//Starting server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port {PORT}`);
});

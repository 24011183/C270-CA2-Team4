const app = require("./index");
const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
});
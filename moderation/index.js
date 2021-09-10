import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const handleEvent = async (event) => {
  switch (event.type) {
    case "CommentCreated":
      event.data.status = event.data.content.includes("orange")
        ? "rejected"
        : "approved";
      await axios
        .post("http://localhost:4005/events", {
          type: "CommentModerated",
          data: event.data,
        })
        .catch((err) => {
          console.log(err);
        });
    default:
      break;
  }
};

app.post("/events", async (req, res) => {
  const event = req.body;
  await handleEvent(event);
  res.send({ status: "OK" });
});

app.listen(4003, async () => {
  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    await handleEvent(event);
  }
  console.log("Listening on port 4003");
});

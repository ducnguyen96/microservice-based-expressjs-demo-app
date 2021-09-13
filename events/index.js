import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const events = [];
app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  switch (event.type) {
    case "CommentCreated":
    case "PostCreated":
      await Promise.all([
        axios.post("http://query-clusterip-srv:4002/events", event),
        axios.post("http://moderation-clusterip-srv:4003/events", event),
      ]).catch((err) => {
        console.log(err);
      });
      break;
    case "CommentModerated":
      await axios
        .post("http://comment-clusterip-srv:4001/events", event)
        .catch((err) => {
          console.log(err);
        });
      break;
    case "CommentUpdated":
      await axios
        .post("http://query-clusterip-srv:4002/events", event)
        .catch((err) => {
          console.log(err);
        });
      break;
    default:
      break;
  }

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on port 4005");
});

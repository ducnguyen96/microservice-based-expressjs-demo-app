import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const posts = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

const handleEvent = (event) => {
  switch (event.type) {
    case "PostCreated":
      posts[event.data.id] = event.data;
      break;
    case "CommentCreated":
      const comments = posts[event.data.postId].comments || [];
      comments.push({
        id: event.data.id,
        content: event.data.content,
        status: event.data.status,
      });
      posts[event.data.postId].comments = comments;
      break;
    case "CommentUpdated":
      const comment = posts[event.data.postId].comments.find(
        (c) => c.id === event.data.id
      );
      comment.status = event.data.status;
    default:
      break;
  }
};

app.post("/events", (req, res) => {
  const event = req.body;
  handleEvent(event);

  res.send({ status: "OK" });
});

app.listen(4002, async () => {
  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    handleEvent(event);
  }
  console.log("Listening on port 4002");
});

import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const comments = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(comments[req.params.id.slice(1)] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id.slice(1);

  const postComments = comments[postId] || [];
  postComments.push({ id, content, status: "pending" });

  comments[postId] = postComments;

  await axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        postId,
        id,
        content,
        status: "pending",
      },
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(200).send(postComments);
});

app.post("/events", async (req, res) => {
  const event = req.body;

  switch (event.type) {
    case "CommentModerated":
      const comment = comments[event.data.postId].find(
        (c) => c.id === event.data.id
      );
      comment.status = event.data.status;
      await axios
        .post("http://localhost:4005/events", {
          type: "CommentUpdated",
          data: event.data,
        })
        .catch((err) => {
          console.log(err);
        });
    default:
      break;
  }
  res.send({ status: "OK" });
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});

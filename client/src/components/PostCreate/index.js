import { useState } from "react";

const PostCreate = (props) => {
  const [title, setTitle] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    fetch("http://posts.com/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title }),
    })
      .then((response) => response.json())
      .then((_) => {
        props.setNumPost(props.numPost + 1);
        setTitle("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h2>PostCreate</h2>
      <form
        action="/posts"
        method="POST"
        onSubmit={onSubmit}
        style={{ borderBottom: "1px solid black" }}
      >
        <label htmlFor="form-input">
          <p>Title</p>
        </label>
        <input
          type="text"
          id="form-input"
          placeholder="post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block" }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default PostCreate;

import { useState } from "react";
const Post = (props) => {
  const [comments, setComments] = useState(props.comments || []);
  const [comment, setComment] = useState("");
  // useEffect(() => {
  //   fetch(`http://posts.com/posts/:${props.id}/comments`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((data) => data.json())
  //     .then((data) => {
  //       setComments(data);
  //     });
  // }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(`http://posts.com/posts/:${props.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: comment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        className="comment"
        style={{ margin: "2px", backgroundColor: "#c4ffff", padding: "10px" }}
      >
        <p>{props.title}</p>
        <span style={{ fontStyle: "italic" }}>{comments.length} comments</span>
        <ul>
          {comments.map((c) => (
            <li key={c.id}>{c.status === "approved" ? c.content : c.status}</li>
          ))}
        </ul>
        <p>Comment</p>
        <form
          action={`http://posts.com/posts/:${props.id}/comments`}
          method="POST"
        >
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
          <button type="submit" onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default Post;

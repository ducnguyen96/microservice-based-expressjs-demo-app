import { useEffect, useState } from "react";
import Post from "../Post";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://posts.com/posts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => setPosts(data));
  }, [props.numPost]);

  return (
    <>
      <div style={{ display: "flex" }}>
        {Object.keys(posts).map((key) => (
          <Post
            key={key}
            id={posts[key].id}
            title={posts[key].title}
            comments={posts[key].comments}
          />
        ))}
      </div>
    </>
  );
};
export default PostList;

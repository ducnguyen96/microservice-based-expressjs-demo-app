import { useState } from "react/cjs/react.development";
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";

function App() {
  const [numPost, setNumPost] = useState(0);
  return (
    <div className="App">
      <PostCreate setNumPost={setNumPost} numPost={numPost} />
      <PostList numPost={numPost} />
    </div>
  );
}

export default App;

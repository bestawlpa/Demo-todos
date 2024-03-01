import { useState } from "react";
import Post from "./component/Post";

function App() {
  return (
    <div className="flex justify-center items-center h-[480px] w-[300px] bg-transparent rounded-[28px] relative top-2 overflow-hidden">
      <Post />
    </div>
  );
}

export default App;

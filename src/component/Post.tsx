import { useState, useEffect } from "react";
import { ItemPost } from "../interface/ItemPost";
import EastIcon from "@mui/icons-material/East";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/firemase";
import List from "./List";
import Edit from "./Edit";
import Zoom from "./Zoom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";


const Post = () => {
  const [todos, setTodos] = useState<ItemPost[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [clickedItem, setClickedItem] = useState<string | null>(null);


  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("time"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todoArr: ItemPost[] = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id } as ItemPost);

      });
      setTodos(todoArr);
    });
    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("Please fill in both title and content.");
      return;
    }
    try {
      await addDoc(collection(db, "todos"), {
        id: uuidv4(),
        title: title,
        content: content,
        status: "complete",
        isEditing: false,
        time: new Date(),
      });
      setTitle("");
      setContent("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleClick = (id: string) => {
    setClickedItem(clickedItem === id ? null : id);
  };

  const editTodo = (id: string) => {
    setTodos(todos.map((e) => (e.id === id ? { ...e, isEditing: true } : e)));
  };

  const saveTodo = async (id: string, newTitle: string, newContent: string) => {
  try {
    await updateDoc(doc(db, "todos", id), {
      title: newTitle,
      content: newContent,
      status: "complete",
      isEditing: false,
    });
    setTodos(todos.map((e) =>
      e.id === id
        ? { ...e, title: newTitle, content: newContent, status: "complete", isEditing: false }
        : e
    ));
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

  const remove = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const backEdit = (id: string) => {
    setTodos(todos.map((todo) =>
      todo.id === id
        ? { ...todo, isEditing: false, status: "complete" }
        : todo
    ));
  };

  return (
    <div className=" bg-[#436850] pt-[20px] pb-[8px]  px-[20px] w-full absolute top-0 rounded-[28px]">
      <div className=" flex flex-row justify-between">
        <form className=" flex flex-col">
          <input
            type="text"
            value={title}
            placeholder="Title..."
            onChange={(t) => setTitle(t.target.value)}
            className=" h-[30px] w-[260px] rounded-[10px] px-[10px] pt-[2px] overflow-hidden  bg-[#FBFADA] focus:outline-[#E0AED0] "
          />
          <textarea
            value={content}
            placeholder="Content..."
            onChange={(c) => setContent(c.target.value)}
            className="mt-[15px] h-[80px] w-full rounded-[6px] px-[10px] pt-[2px] bg-[#FBFADA] focus:outline-[#E0AED0]"
          />
        </form>
        <button
          onClick={addTodo}
          type="button"
          className=" relative top-[100px] right-6 text-[#F875AA] hover:text-[#0766AD] ring-4 ring-[#E0AED0] bg-[#AEDEFC] hover:bg-[#F4F27E] hover:ring-4 hover:outline-none hover:ring-[#3081D0] font-black rounded-full text-[5px] p-2.5 flex justify-center items-center w-[28px] h-[28px]"
        >
          <EastIcon />
        </button>
      </div>
      <div className=" w-full mt-5 mb-1 rounded-[12px] bg-[#9d9898] overflow-auto max-h-[300px] ">
        <div className=" flex justify-center items-center flex-col p-[3px]">
          {todos.map((todo) =>
            todo.isEditing ? (
              <Edit
                key={todo.id}
                todo={todo}
                setTodos={setTodos}
                saveTodo={saveTodo}
                backEdit={backEdit}
              />
            ):(
              <List
                key={todo.id}
                todo={todo}
                editTodo={editTodo}
                handleClick={handleClick}
                remove={remove}
              />
            )
          )}
        </div>
      </div>
      <Zoom
        clickedItem={clickedItem}
        todos={todos}
        setClickedItem={setClickedItem}
      />
    </div>
  );
};

export default Post;

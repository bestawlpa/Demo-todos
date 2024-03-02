import React, { useState, useEffect } from "react";
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
  setDoc,
  updateDoc,
} from "firebase/firestore";

const Post = () => {
  const [todos, setTodos] = useState<ItemPost[]>([]);

  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("time"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
        console.log(doc.data());
      });
      setTodos(todoArr);
    });
    return () => unsubscribe();
  }, []);

  const [title, setTitle] = useState<string>("");

  const [content, setContent] = useState<string>("");

  const [clickedItem, setClickedItem] = useState(null);

  const [editTitle, editSetTitle] = useState<string>("");

  const [editContent, editSetContent] = useState<string>("");

  const addTodo = async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        id: uuidv4(),
        title: title,
        content: content,
        status: "complete",
        time: new Date(),
      });
      setTitle("");
      setContent("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleClick = (id: string) => {
    if (clickedItem === id) {
      setClickedItem(null);
    } else {
      setClickedItem(id);
    }
  };

  const editTodo = (id: string) => {
    const edited = todos.filter((todo) => {
      return todo.id === id;
    });
    edited[0].status = "edit";
    editSetTitle(edited[0].title);
    editSetContent(edited[0].content);
    setTodos([...todos]);
  };

  const saveTodo = (id: string) => {
    const saved = todos.filter((todo) => {
      return todo.id === id;
    });
    saved[0].title = editTitle;
    saved[0].content = editContent;
    saved[0].status = "complete";
    setTodos([...todos]);
  };

  const remove = (id: string) => {
    const dataId = query(collection(db, "todos"));
    const unsubscribeId = onSnapshot(dataId, (item) => {
      let todoArrId = [];
      item.forEach((item) => {
        todoArrId.push({ ...item.data(), id: item.data().id });
        console.log(item.data().id);
        deleteDoc(doc(db, "todos", id));
      });
    });
  };

  const backEdit = (id: string) => {
    const back = todos.filter((todo) => {
      return todo.id === id;
    });
    back[0].status = "complete";
    setTodos([...todos]);
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
          {todos.map((todo: ItemPost) => {
            if (todo.status == "complete") {
              return (
                <List
                  todo={todo}
                  editTodo={editTodo}
                  handleClick={handleClick}
                  remove={remove}
                />
              );
            } else {
              return (
                <Edit
                  todo={todo}
                  editTitle={editTitle}
                  editSetTitle={editSetTitle}
                  editContent={editContent}
                  editSetContent={editSetContent}
                  saveTodo={saveTodo}
                  backEdit={backEdit}
                />
              );
            }
          })}
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

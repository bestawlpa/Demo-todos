import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

const List = (props) => {
  const { todo, editTodo, handleClick, remove } = props;
  return (
    <div
      key={todo.id}
      className=" relative w-[98%] h-[140px] bg-[#FAF0E6] rounded-lg px-2 my-1 overflow-hidden text-[#4F709C] text-base "
    >
      <ul className=" h-[22px] w-full text-wrap overflow-hidden font-bold">
        title :{" "}
        <span className=" text-[#352F44] font-normal">{todo.title}</span>
      </ul>
      <ul className=" h-[78px] overflow-clip w-full text-wrap font-bold">
        content :{" "}
        <span className=" text-[#352F44] text-wrap font-normal">
          {todo.content}
        </span>
      </ul>
      <div className=" flex flex-row w-[70%] justify-around relative left-[70px] top-3">
        <button
          id="btn-edit"
          onClick={() => editTodo(todo.id)}
          className="focus:bg-[#0766AD]  bg-[#9B4444]  w-10 h-6 rounded-full flex justify-center items-center text-[#F2F1EB] focus:text-[#C5E898]"
        >
          <EditIcon />
        </button>
        <button
          id="btn-zoomin"
          onClick={() => handleClick(todo.id)}
          className="  focus:bg-[#0766AD]  bg-[#9B4444] w-10 h-6 rounded-full flex justify-center items-center text-[#F2F1EB] focus:text-[#C5E898]"
        >
          <ZoomInIcon />
        </button>
        <button
          id="btn-delete"
          onClick={() => remove(todo.id)}
          className="  focus:bg-[#0766AD]  bg-[#9B4444]   w-10 h-6 rounded-full flex justify-center items-center text-[#F2F1EB] focus:text-[#C5E898]"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default List;

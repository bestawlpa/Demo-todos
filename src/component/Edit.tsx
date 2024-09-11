// import { Title } from "@mui/icons-material";
import ReplyIcon from "@mui/icons-material/Reply";
import SaveAltIcon from "@mui/icons-material/SaveAlt";


const Edit = (props: any) => {
  const {
    todo,
    todos,
    setTodos,
    saveTodo,
    backEdit,
  } = props;
  return (
    <div
      key={todo.id}
      className=" relative w-[98%] h-[200px] bg-[#FAF0E6] rounded-lg px-2 my-1 overflow-hidden text-[#4F709C] text-base "
    >
      <div>
        <ul className=" font-bold">
          Title :
          <textarea
            value={todo.title}
            onChange={(event) => {
              setTodos((prevTodos) =>
                prevTodos.map((e: any) =>
                  e.id === todo.id
                    ? { ...e, title: event.target.value }
                    : e
                )
              );
            }}
            className=" bg-[#BFCFE7] rounded-[8px] w-full h-[50px] overflow-y-auto p-2 text-wrap font-normal focus:outline-[#E0AED0]"
          />
        </ul>
        <ul className=" mt-[-6px] font-bold">
          Content :
          <textarea
            value={todo.content}
            onChange={(event) => {
              setTodos((prevTodos) =>
                prevTodos.map((e: any) =>
                  e.id === todo.id
                    ? { ...e, content: event.target.value }
                    : e
                )
              );
            }}
            className=" bg-[#BFCFE7] rounded-[8px]  w-full h-[60px] p-2 font-normal focus:outline-[#E0AED0]"
          />
          <div className=" h-[30px] w-[140px] flex items-center justify-around mt-[2px] absolute left-[98px]">
            <button
              className=" h-6 w-10 bg-[#4942E4] rounded-[8px] hover:bg-[#E0AED0] hover:text-[#756AB6] flex items-center justify-center text-[#E6B9DE]"
              onClick={() => saveTodo(todo.id, todo.title ,todo.content)}
            >
              <SaveAltIcon />
            </button>
            <button
              id="btn-replay-todo"
              className=" h-6 w-10 rounded-[8px] bg-[#4942E4] text-[#E6B9DE] hover:bg-[#E0AED0] hover:text-[#756AB6] flex items-center justify-center"
              onClick={() => backEdit(todo.id)}
            >
              <ReplyIcon />
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Edit;

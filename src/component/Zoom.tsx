import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { ItemPost } from "../interface/ItemPost";

const Zoom = (props: any) => {
  const { clickedItem, todos, setClickedItem } = props;
  return (
    clickedItem && (
      <div className="fixed -top-20 -left-[2px] w-full h-full  bg-opacity-50 flex justify-center items-center">
        <div className=" bg-[#dee0a3] text-[#561C24] text p-4 rounded-2xl w-[400px] h-[200px] shadow-inner shadow-3xl relative">
          <h2 className=" overflow-y-auto h-[30%] font-bold text-wrap p-2 bg-white rounded-[8px] mb-1">
            Title : {"  "}
            <span className=" text-[#637A9F] font-normal">
              {
                todos.filter((item: ItemPost) => {
                  return item.id === clickedItem;
                })[0]?.title
              }
            </span>
          </h2>
          <p className=" overflow-y-auto w-[370px] h-[70%] font-bold bg-white p-2 rounded-[8px]">
            Content :{"  "}
            <span className=" text-[#637A9F] font-normal">
              {
                todos.find((item: ItemPost) => {
                  return item.id === clickedItem;
                })?.content
              }
            </span>
          </p>
          <button
            id="btn-close"
            onClick={() => setClickedItem(null)}
            className=" absolute right-1 -top-[4px] h-[24px] w-[24px] rounded-[50%] bg-transparent flex flex-col  items-center justify-center  mt-1"
          >
            <PowerSettingsNewIcon />
          </button>
        </div>
      </div>
    )
  );
};

export default Zoom;

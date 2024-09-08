import "../styles/pagination.css";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md"; //<MdOutlineKeyboardDoubleArrowLeft />
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"; //<MdOutlineKeyboardArrowLeft />
import { MdOutlineKeyboardArrowRight } from "react-icons/md"; //<MdOutlineKeyboardArrowRight />
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"; //<MdOutlineKeyboardDoubleArrowRight />

const Pagination = ({ page, setPage, pagemax, limit, setLimit, datacount }) => {
  return (
    <>
      <div className="paginationdiv">
        <div className="subpaginationdiv">
          <label htmlFor="characterspage"> PAGE </label>
          <button
            className="paginationbutton"
            onClick={(event) => {
              if (page > 5) {
                setPage(page - 5);
              } else {
                setPage(1);
              }
            }}
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          <button
            className="paginationbutton"
            onClick={(event) => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <span>1...</span>
          <input
            id="characterspage"
            type="number"
            value={page || ""}
            min="1"
            max={`${pagemax}`}
            required
            onChange={(event) => {
              // console.log("event.target.max", Number(event.target.max));
              let { value, min, max } = event.target;
              if (value === "") {
                setPage(null);
              } else {
                value = Math.max(
                  Number(min),
                  Math.min(Number(max), Number(value))
                );
                setPage(value);
              }
            }}
          />
          <span>...{pagemax}</span>
          <button
            className="paginationbutton"
            onClick={(event) => {
              if (page < pagemax) {
                setPage(page + 1);
              }
            }}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
          <button
            className="paginationbutton"
            onClick={(event) => {
              if (page < pagemax - 5) {
                setPage(page + 5);
              } else {
                setPage(pagemax);
              }
            }}
          >
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </div>
        <div>
          <label htmlFor="limit">Nombre de personnages par page :</label>
          <select
            style={{ borderColor: "#757575", borderRadius: 3 }}
            name="limit"
            onChange={(event) => {
              // console.log("event.target.value ==>", event.target.value);
              setLimit(event.target.value);
              setPage(1);
              //   if (page > datacount / event.target.value) {
              //     setPage(1);
              //   }
            }}
          >
            <option value={20}> 20 </option>
            <option value={50}> 50 </option>
            <option value={100}> 100 </option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Pagination;

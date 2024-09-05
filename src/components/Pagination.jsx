const Pagination = ({ page, setPage, pagemax, limit, setLimit, datacount }) => {
  return (
    <>
      <label htmlFor="characterspage"> Quelle page </label>
      <button
        onClick={(event) => {
          if (page > 5) {
            setPage(page - 5);
          } else {
            setPage(1);
          }
        }}
      >
        &lt;&lt;
      </button>
      <button
        onClick={(event) => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        &lt;
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
            value = Math.max(Number(min), Math.min(Number(max), Number(value)));
            setPage(value);
          }
        }}
      />
      <span>...{pagemax}</span>
      <button
        onClick={(event) => {
          if (page < pagemax) {
            setPage(page + 1);
          }
        }}
      >
        &gt;
      </button>
      <button
        onClick={(event) => {
          if (page < pagemax - 5) {
            setPage(page + 5);
          } else {
            setPage(pagemax);
          }
        }}
      >
        &gt;&gt;
      </button>

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
    </>
  );
};

export default Pagination;

import React from "react";
import Foodinsert from "../components/Foodinsert";
import axios from "axios";
const insert = ({ cate }) => {
  return (
    <>
      <Foodinsert cate={cate} />
    </>
  );
};

export default insert;

insert.getInitialProps = async (ctx) => {
  const res = await axios.get("http://localhost:3001/category");
  const json = await res.data.data;
  console.log(json);

  return { cate: json };
};

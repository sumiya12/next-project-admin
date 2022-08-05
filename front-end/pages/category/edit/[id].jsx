import axios from "axios";
import React, { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export default function cat({ category }) {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState();
  // useEffect(() => {
  //   setCategoriesData(category);
  // }, [categoriesData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const name = e.target[0].value;
    console.log("this is name", name);
    const color = e.target[1].value;
    console.log("this is color", color);
    const _v = e.target[2].value;
    console.log("this is _v", _v);
    const _id = category[0]._id;
    console.log(_id);
    axios
      .put("http://localhost:3001/category", {
        name,
        color,
        _v,
        _id,
      })
      .then((res) => console.log(res.statusText))
      .catch((error) => console.error(error));
    router.push("/category");
  };
  // console.log(category && category);

  return (
    <>
      <h1 style={{ color: "black" }}>One category</h1>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          defaultValue={category[0].name}
          name="name"
          label="Name"
          variant="standard"
        />

        <TextField
          id="standard-basic"
          defaultValue={category[0].color}
          label="Color"
          name="color"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={category[0]._v}
          label="_v"
          name="_v"
          variant="standard"
        />
        <Button type="submit">Update category</Button>
      </Box>
    </>
  );
}
export async function getStaticPaths() {
  // console.log("staticpath");
  const res = await axios.get("http://localhost:3001/category");
  // console.log(res.data);
  // console.log("staticpath");
  return {
    fallback: false,
    paths: res.data.data.map((category) => ({
      params: { id: category._id.toString() },
    })),
    // paths: { params: {} },
  };
}

export async function getStaticProps({ params }) {
  // console.log(params.id);
  const res = await axios.get(`http://localhost:3001/category/${params.id}`);
  return {
    props: {
      category: res.data.data,
    },
  };
}

import axios from "axios";
import React, { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export default function cat({ role }) {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState();
  useEffect(() => {
    setCategoriesData(role);
  }, [categoriesData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const role_name = e.target[0].value;
    console.log("this is role_name", role_name);
    const role_description = e.target[1].value;
    const id = role[0].id;
    console.log("this is role_description", role_description);
   
    axios
      .put("http://localhost:3001/role", {
        role_name,
        role_description,
        id,
      })
      .then((res) => console.log(res.statusText))
      .catch((error) => console.error(error));
    router.push("/role");
  };
  // console.log(category && category);

  return (
    <>
      <h1 style={{ color: "black" }}>update role</h1>
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
          defaultValue={role[0].role_name}
          name="role_name"
          label="role_name"
          variant="standard"
        />

        <TextField
          id="standard-basic"
          defaultValue={role[0].role_description}
          label="role_description"
          name="role_description"
          variant="standard"
        />
       
        <Button type="submit" variant="contained">Update role</Button>
      </Box>
    </>
  );
}
export async function getStaticPaths() {
  // console.log("staticpath");
  const res = await axios.get("http://localhost:3001/role");
  // console.log(res.data);
  // console.log("staticpath");
  return {
    fallback: false,
    paths: res.data.data.map((role) => ({
      params: { id: role.id.toString() },
    })),
    // paths: { params: {} },
  };
}

export async function getStaticProps({ params }) {
  // console.log(params.id);
  const res = await axios.get(`http://localhost:3001/role/${params.id}`);
  return {
    props: {
        role: res.data.data,
    },
  };
}

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CategoryTable from "../components/CategoryTable";
import { Container } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
interface Props {
  categories?: {
    id: Number;
    name: String;
    color: String;
    _v: number;
  };
}

const category: NextPage<Props> = ({ categories }) => {
  return (
    <Container maxWidth="lg">
      <h1>All categories page</h1>

      <CategoryTable categories={categories} />
    </Container>
  );
};
export default category;

// useEffect(() => {
//   let token = localStorage.getItem("token");
//   console.log(token);
// }, []);

category.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://localhost:3001/category");
  const json = await res.data.data;
  // console.log(json);
  return { categories: json };
};

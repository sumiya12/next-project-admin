import * as React from "react";
import Button from "@mui/material/Button";
import Foodtable from "../components/Foodtable";
import { Container } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
interface Props {
  categories?: {
    id: Number;
    name: String;
    price: number;
    ingredients: string;
    category_id: number;
    stock: number;
    portion: number;
    image: string;
    tumb_img: string;
    discount: number;
    sales: number;
  };
}

const category: NextPage<Props> = ({ categories }) => {
  return (
    <>
      <h1>All Foods page</h1>

      <Foodtable categories={categories} />
    </>
  );
};
export default category;
category.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://localhost:3001/food");
  const json = await res.data.data;
  console.log(json);
  return { categories: json };
};

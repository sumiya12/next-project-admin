// import axios from "axios";
// import {
//   NextPageContext,
//   NextPage,
//   InferGetServerSidePropsType,
//   InferGetStaticPropsType,
// } from "next";
// import React from "react";
// import CategoryTable from "../components/CategoryTable";

// type Category = {
//   _id: number;
//   name: string;
//   color: string;
//   _v: number;
// };
// export const getStaticProps = async () => {
//   const res = await axios.get("http://localhost:3001/category");
//   const categories: Category[] = await res.data.data;
//   return { props: { categories } };
// };

// function Category({
//   categories,
// }: InferGetStaticPropsType<typeof getStaticProps>) {
//   return <CategoryTable categories={categories} />;
// }

// export default Category;
import * as React from "react";
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
      <Button variant="contained">Hello World</Button>
      <CategoryTable categories={categories} />
    </Container>
  );
};
export default category;
category.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://localhost:3001/category/get");
  const json = await res.data.data;
  console.log(json);
  return { categories: json };
};

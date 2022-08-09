import * as React from "react";
import Button from "@mui/material/Button";
import Usertable from "../components/Usertable";
import { Container } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
interface Props {
  users?: {
    id: Number;
    firstname: String;
    lastname: String;
    email: String;
    address: String;
    phone_number: String;
    rode_id: number;
  };
}
const category: NextPage<Props> = ({ users }) => {
  return (
    <Container maxWidth="lg">
      <h1>All user page</h1>

      <Usertable users={users} />
    </Container>
  );
};
export default category;
category.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://localhost:3001/user");
  const json = await res.data.data;
  // console.log(json);
  return { users: json };
};

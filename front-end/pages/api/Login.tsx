import React from "react";
import LoginTable from "../../components/LoginTable";
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
const Login: NextPage<Props> = () => {
  return (
    <Container maxWidth="lg">
      <h1>Pls... login</h1>

      <LoginTable />
    </Container>
  );
};
export default Login;

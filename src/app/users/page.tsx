import { UsersList } from "@/components/organisms/UsersList";
import { UsersContextProvider } from "@/contexts/UsersContext";
import React from "react";

// /users
const Users = () => {
  return (
    <UsersContextProvider>
      <UsersList />
    </UsersContextProvider>
  );
};

export default Users;

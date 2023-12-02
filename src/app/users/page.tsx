import { UsersList } from "@/components/organisms/UsersList";
import { ProtectedPage } from "@/components/wrappers/ProtectedPage";
import { UsersContextProvider } from "@/contexts/UsersContext";
import React from "react";

// /users
const Users = () => {
  return (
    <ProtectedPage>
      <UsersContextProvider>
        <UsersList />
      </UsersContextProvider>
    </ProtectedPage>
  );
};

export default Users;

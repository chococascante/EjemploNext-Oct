import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/configureStore";
import { useUserContext } from "../../contexts/UsersContext";

export const UsersList = () => {
  const userList = useSelector((state: RootState) => state.user.users);
  const { users } = useUserContext();
  return (
    <>
      <ul>
        <h2>Lista redux</h2>
        {userList.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <ul>
        <h2>Lista Context</h2>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

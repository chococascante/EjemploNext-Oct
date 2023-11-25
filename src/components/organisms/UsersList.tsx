"use client";
import React from "react";
import { useUserContext } from "../../contexts/UsersContext";

export const UsersList = () => {
  const { users } = useUserContext();
  return (
    <>
      <ul>
        <h2>Lista Context</h2>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

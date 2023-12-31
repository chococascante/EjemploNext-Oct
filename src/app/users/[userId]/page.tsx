import { ProtectedPage } from "@/components/wrappers/ProtectedPage";
import React from "react";

// /users/[userId]
const UserProfile = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const datosUsuario = await traerDatosUsuario(userId);

  return (
    <ProtectedPage>
      <div>
        <h1>{datosUsuario.name}</h1>
        <p>{datosUsuario.email}</p>
      </div>
    </ProtectedPage>
  );
};

async function traerDatosUsuario(userId: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const data = await response.json();

  return data;
}

export default UserProfile;

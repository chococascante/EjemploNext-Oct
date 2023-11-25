import React from "react";
import { Publicacion } from "../molecules/Publicacion/Publicacion";
import { List } from "@mui/material";
import type { Post } from "../../types/Post";

interface ListaPublicacionesProps {
  publicaciones: Post[];
}

export const ListaPublicaciones: React.FC<ListaPublicacionesProps> = ({
  publicaciones,
}) => {
  return (
    <List>
      {publicaciones.map((publicacion) => (
        <Publicacion key={publicacion.id} publicacion={publicacion} />
      ))}
    </List>
  );
};

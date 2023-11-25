import React from "react";
import { Comentario } from "../molecules/Comentario";
import { List } from "@mui/material";
import type { Comment } from "../../types";

interface ListaComentariosProps {
  comentarios: Comment[];
}

export const ListaComentarios: React.FC<ListaComentariosProps> = ({
  comentarios,
}) => {
  return (
    <List>
      {comentarios.map((comentario) => (
        <Comentario key={comentario.id} comentario={comentario} />
      ))}
    </List>
  );
};

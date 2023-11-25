import React from "react";
import { ListaComentarios } from "../../organisms/ListaComentarios";
import { ListItem, Card, CardContent, Typography } from "@mui/material";
import "./Publicacion.css";
import "./Publicacion.scss";
import type { Post } from "../../../types/Post";

interface PublicacionProps {
  publicacion: Post;
}

export const Publicacion: React.FC<PublicacionProps> = ({ publicacion }) => {
  return (
    <ListItem>
      <Card variant="outlined">
        <CardContent className="flex">
          <h5 id="titulo" className="publicacion--titulo text-azul-cenfotec">
            {publicacion.usuario?.name ?? "Anónimo"}
          </h5>
          <Typography variant="body1">{publicacion.body}</Typography>

          {publicacion.comentarios && (
            <ListaComentarios comentarios={publicacion.comentarios} />
          )}
        </CardContent>
      </Card>
    </ListItem>
  );
};

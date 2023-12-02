import { ListaPublicaciones } from "@/components/organisms/ListaPublicaciones";
import { ProtectedPage } from "@/components/wrappers/ProtectedPage";
import { Post, User, Comment } from "@/types";
import axios from "axios";
import React from "react";

const Publicaciones = async () => {
  const publicaciones = await getData();
  return (
    <ProtectedPage>
      <p>Existen {publicaciones.length} publicaciones:</p>
      <ListaPublicaciones publicaciones={publicaciones} />
    </ProtectedPage>
  );
};

async function getData() {
  const publicaciones = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const comentarios = await axios.get<Comment[]>(
    "https://jsonplaceholder.typicode.com/comments"
  );

  const usuarios = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  const posts = publicaciones.data.map((publicacion: Post) => {
    const comentariosPublicacion = comentarios.data.filter(
      (comentario: Comment) => {
        return comentario.postId === publicacion.id;
      }
    );

    const usuario = usuarios.data.find((usuario: User) => {
      return usuario.id === publicacion.userId;
    });

    return { ...publicacion, usuario, comentarios: comentariosPublicacion };
  });

  return posts;
}

export default Publicaciones;

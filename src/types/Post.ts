import type { Comment } from "./Comment";
import type { User } from "./User";

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  comentarios?: Comment[];
  usuario?: User;
};

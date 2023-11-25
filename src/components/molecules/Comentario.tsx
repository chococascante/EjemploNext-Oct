import React from "react";
import { ListItem, Card, CardContent, Typography } from "@mui/material";
import type { Comment } from "../../types";
import styled from "styled-components";

interface ComentarioProps {
  comentario: Comment;
}

export const Comentario: React.FC<ComentarioProps> = ({ comentario }) => {
  return (
    <ListItem>
      <Card>
        <CardContent>
          <TituloComenario index={1}>{comentario.name}</TituloComenario>
          <Typography variant="body2">{comentario.body}</Typography>
        </CardContent>
      </Card>
    </ListItem>
  );
};

interface TituloProps {
  primary?: boolean;
  index: number;
}

const TituloComenario = styled.h5<TituloProps>`
  font-weight: ${(props) => (props.index % 2 === 0 ? "bold" : "normal")};
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  color: ${(props) => (props.primary ? "#1976d2" : "#000")};
`;

export const ComentarioModificado = styled(Comentario)`
  background-color: #f00;
`;

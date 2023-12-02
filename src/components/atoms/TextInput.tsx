"use client";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

interface TextInputProps {
  fullWidth?: boolean;
}

type Props = TextInputProps & TextFieldProps;

export const TextInput: React.FC<Props> = ({ fullWidth = true, ...props }) => {
  return (
    <TextField
      className={`max-w-full mb-6 ${fullWidth ? "w-full" : ""}`}
      variant="filled"
      InputLabelProps={{
        shrink: true,
        className: "font-semibold",
      }}
      {...props}
    />
  );
};

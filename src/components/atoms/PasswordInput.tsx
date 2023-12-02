"use client";
import React from "react";
import { TextInput } from "./TextInput";
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const PasswordInput: React.FC<TextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextInput
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Mostrar/esconder contraseña"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff aria-label="Esconder contraseña" />
              ) : (
                <Visibility aria-label="Mostrar contraseña" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import { TextInput } from "../atoms/TextInput";
import { PasswordInput } from "../atoms/PasswordInput";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Debe ser un email válido.")
    .required("Campo requerido.")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Formato de email inválido."
    ),
  password: Yup.string()
    .required("Campo requerido.")
    .min(6, "Mínimo 6 caracteres."),
});

export const LoginForm = () => {
  const { login } = useFirebaseAuthContext();

  const handleSubmit = React.useCallback(
    async (values: LoginFormValues) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        console.error(error);
      }
    },
    [login]
  );

  return (
    <Paper className="flex flex-col w-4/5 sm:w-1/2  lg:w-1/3 bg-white p-8 space-y-5 shadow-xl divide-y-2 divide-blue divide-solid">
      <Formik<LoginFormValues>
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnMount
        validateOnChange
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          isValid,
          isValidating,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <Typography>¡Bienvenido de nuevo!</Typography>

            <TextInput
              id="email"
              type="email"
              label="Correo electrónico"
              placeholder="correo.ejemplo@gmail.com"
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <PasswordInput
              id="password"
              label="Contraseña"
              placeholder="******"
              required
              value={values.password}
              error={!!(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <LoadingButton
              type="submit"
              loading={isSubmitting || isValidating}
              disabled={!isValid || isValidating}
            >
              Iniciar sesión
            </LoadingButton>

            <div>
              <Link href="/signup">¿No tenés cuenta?</Link>
            </div>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

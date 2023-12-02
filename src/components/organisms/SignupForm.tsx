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

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe?: boolean;
}

const SignupSchema = Yup.object().shape({
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
  confirmPassword: Yup.string()
    .required("Campo requerido.")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden."),
});

export const SignupForm = () => {
  const { registerUser } = useFirebaseAuthContext();

  const handleSubmit = React.useCallback(
    async (values: SignupFormValues) => {
      try {
        await registerUser(values.email, values.password);
      } catch (error) {
        console.error(error);
      }
    },
    [registerUser]
  );

  return (
    <Paper className="flex flex-col w-4/5 sm:w-1/2  lg:w-1/3 bg-white p-8 space-y-5 shadow-xl divide-y-2 divide-blue divide-solid">
      <Formik<SignupFormValues>
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
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

            <PasswordInput
              id="confirmPassword"
              label="Confirmar contraseña"
              placeholder="******"
              required
              value={values.confirmPassword}
              error={!!(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <LoadingButton
              type="submit"
              loading={isSubmitting || isValidating}
              disabled={!isValid || isValidating}
            >
              Crear cuenta
            </LoadingButton>

            <div>
              <Link href="/login">¿Ya tenés cuenta?</Link>
            </div>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

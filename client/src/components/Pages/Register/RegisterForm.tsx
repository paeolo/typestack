import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import { useObserver } from "mobx-react-lite";
import { UserController } from "@openapi/.";

import {
  Field,
  Label,
  Control,
  Input,
  Heading,
  Help,
} from "@components/Core/Form";
import {
  Section,
  Divider,
  Submit
} from "@components/Layout";
import { useTranslate } from "../../../hooks";

export const RegisterForm = () => {

  const router = useRouter();
  const { locale } = useTranslate();
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async values => {
      try {
        await UserController.register({
          username: values.username,
          password: values.password
        });
        await UserController.login({
          username: values.username,
          password: values.password
        });
        router.replace('/[lang]', `/${locale}`);
        setError(false);
      } catch {
        setError(true);
      }
    }
  });

  return useObserver(() =>
    <Section
      title='Register'
      subtitle='Fill the following form...'>
      <form className="box" onSubmit={formik.handleSubmit} >
        <Heading>Register</Heading>
        <Field>
          <Label>Username</Label>
          <Control>
            <Input
              id='username'
              value={formik.values.username}
              onChange={formik.handleChange}
              type="text"
              placeholder="john.smith" />
          </Control>
        </Field>
        <Field>
          <Label>Password</Label>
          <Control>
            <Input
              id='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              placeholder="********" />
          </Control>
        </Field>
        <Divider />
        {
          error &&
          <Help color="danger">An error occured. Try again</Help>
        }
        <Submit />
      </form >
    </Section >
  )
}

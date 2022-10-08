import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./Login.module.scss";
import { Button } from "../../components";

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters required")
    .required("Password is required"),
});

const Login = ({ isSignup }) => {
  return (
    <div className={s.wrap}>
      <Formik
        initialValues={{
          username: "",
          password: "",
          isEmployer: false,
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isValid }) => (
          <Form className={s.form}>
            <Field
              name="username"
              placeholder="Username*"
              className={s.form__field}
            />
            <ErrorMessage
              component="div"
              name="username"
              className={s.form__error}
            />
            <Field
              name="password"
              placeholder="Password*"
              type="password"
              className={s.form__field}
            />
            <ErrorMessage
              component="div"
              name="password"
              className={s.form__error}
            />
            {isSignup && (
              <div className={s.form__checkboxWrap}>
                <label htmlFor="isEmployer">Are you a employer?</label>
                <Field name="isEmployer" type="checkbox" />
              </div>
            )}
            <Button
              type="submit"
              disabled={isValid}
              text={isSignup ? "Sign Up" : "Login"}
            />
          </Form>
        )}
      </Formik>
      {isSignup ? (
        <Link to={{ pathname: "/login" }}>Existing User</Link>
      ) : (
        <Link to={{ pathname: "/signup" }}>New User</Link>
      )}
    </div>
  );
};

export default Login;

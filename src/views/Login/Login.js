import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./Login.module.scss";
import { Button } from "../../components";
import { register, login } from "../../slices/auth";

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters required")
    .required("Password is required"),
});

const Login = ({ isSignup }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const goToHome = () => {
    window.location.href = "/";
  };
  const loginUser = (payload) => {
    const { username, password } = payload;
    dispatch(login({ username, password }));
  };
  const registerUser = (payload) => {
    const { name, username, password, isEmployer } = payload;
    dispatch(
      register({
        name,
        username,
        password,
        userType: isEmployer ? "employer" : "freelancer",
      })
    );
  };
  if (isLoggedIn) {
    goToHome();
  }
  return (
    <div className={s.wrap}>
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
          isEmployer: false,
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          isSignup ? registerUser(values) : loginUser(values);
        }}
      >
        {({ isValid, touched }) => (
          <Form className={s.form}>
            {isSignup && (
              <>
                <Field
                  name="name"
                  placeholder="Name"
                  className={s.form__field}
                />
                <ErrorMessage
                  component="div"
                  name="name"
                  className={s.form__error}
                />
              </>
            )}
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
              disabled={!isValid || !touched.username || !touched.password}
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

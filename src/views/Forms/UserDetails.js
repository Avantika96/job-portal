import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./Form.module.scss";
import { Button } from "../../components";

const ValidationSchema = Yup.object().shape({
  githubUsername: Yup.string().required("Github username is required"),
});

const UserDetails = () => {
  return (
    <div>
      <Formik
        initialValues={{
          githubUsername: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Form className={s.form}>
            <Field
              name="githubUsername"
              placeholder="Github Username*"
              className={s.form__field}
            />
            <ErrorMessage
              component="div"
              name="githubUsername"
              className={s.form__error}
            />
            <Button type="submit" disabled={isValidating} text="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserDetails;

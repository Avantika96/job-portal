import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import s from "./Form.module.scss";
import { Button } from "../../components";
import { addJob } from "../../slices/jobs";

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .max(16000, "Description must be less than 16KB (16000 characters)")
    .required("Description is required"),
  requirements: Yup.string().required("Requirements is required"),
  company: Yup.string().required("Company Name is required"),
  name: Yup.string().required("Recruiter name is required"),
  phone: Yup.string().required("Recruiter Phone number is required"),
});

const NewJob = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const submitForm = (data) => {
    const {
      title = "",
      description = "",
      requirements = "",
      company = "",
      name = "",
      phone = "",
    } = data;
    dispatch(
      addJob({
        title,
        description,
        requirements,
        company,
        contact: {
          name,
          phone,
        },
        applicants: [],
        date: new Date().toDateString(),
        employerId: currentUser.id,
      })
    );
  };
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
          requirements: "",
          company: "",
          name: "",
          phone: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          submitForm(values);
        }}
      >
        {({ touched, isValid }) => (
          <Form className={s.form}>
            <Field
              name="title"
              placeholder="Title*"
              className={s.form__field}
            />
            <ErrorMessage
              component="div"
              name="title"
              className={s.form__error}
            />
            <Field
              name="description"
              placeholder="Description*"
              as="textarea"
              className={s.form__field}
            />
            <ErrorMessage
              component="div"
              name="description"
              className={s.form__error}
            />
            <Field
              name="requirements"
              placeholder="Requirements*"
              as="textarea"
              className={s.form__field}
            />
            <ErrorMessage
              component="div"
              name="requirements"
              className={s.form__error}
            />
            <Field
              name="company"
              placeholder="Company*"
              className={s.form__field}
            />
            <ErrorMessage
              component="div"
              name="company"
              className={s.form__error}
            />
            <Field
              name="name"
              placeholder="Recruiter Name*"
              className={s.form__field}
            />
            <ErrorMessage
              component="div"
              name="name"
              className={s.form__error}
            />
            <Field
              name="phone"
              placeholder="Recruiter Phone No*"
              type="tel"
              className={s.form__field}
            />
            <ErrorMessage
              component="div"
              name="phone"
              className={s.form__error}
            />
            <Button
              type="submit"
              disabled={
                !isValid ||
                !touched.title ||
                !touched.description ||
                !touched.requirements ||
                !touched.company ||
                !touched.name ||
                !touched.phone
              }
              text="Submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewJob;

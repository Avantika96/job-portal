import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import s from "./Form.module.scss";
import { Button, TagInput } from "../../components";
import { disableSubmitOnEnter } from "../../utils";
import { updateUser } from "../../slices/auth";
import UserService from "../../services/userService";

const ValidationSchema = Yup.object().shape({
  githubUsername: Yup.string().required("Github username is required"),
});

const UserDetails = () => {
  const [repos, setRepos] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { githubUsername = "", skills = [] } = user;
  const dispatch = useDispatch();
  useEffect(() => {
    if (githubUsername) {
      UserService.getGithubRepos(githubUsername).then((response) =>
        setRepos(response.data)
      );
    }
  }, [user]);

  const submitUserDetails = (data) => {
    dispatch(updateUser({ id: user.id, payload: { ...user, ...data } })).then(
      () => window.location.reload()
    );
  };
  return (
    <div>
      <Formik
        initialValues={{
          githubUsername,
          skills,
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          submitUserDetails(values);
        }}
      >
        {({ touched, isValid, setFieldValue }) => (
          <Form className={s.form} onKeyDown={disableSubmitOnEnter}>
            <TagInput
              name="skills"
              placeholder="Enter Skills"
              handleChange={(skills) => setFieldValue("skills", skills)}
              initialTags={skills}
            />
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
            <Button
              type="submit"
              disabled={!isValid && !touched.githubUsername}
              text="Submit"
            />
          </Form>
        )}
      </Formik>

      {repos.length > 0 && (
        <div className={s.repos}>
          <span>Repos:</span>
          {repos.map(({ name, html_url }, index) => (
            <a href={html_url} target="_blank" rel="noreferrer" key={index}>
              {name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import s from "./Form.module.scss";
import { Button, TagInput, Tag } from "../../components";
import { disableSubmitOnEnter } from "../../utils";
import { updateUser } from "../../slices/auth";
import UserService from "../../services/userService";
import AuthService from "../../services/authService";

const ValidationSchema = Yup.object().shape({
  githubUsername: Yup.string().required("Github username is required"),
});

const UserDetails = ({ isDetailPage = false }) => {
  const { userId } = useParams();
  const [repos, setRepos] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { githubUsername = "", skills = [] } = user;
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser && currentUser.githubUsername) {
      UserService.getGithubRepos(currentUser.githubUsername).then((response) =>
        setRepos(response.data)
      );
    }
  }, [currentUser]);
  useEffect(() => {
    if (isDetailPage) {
      AuthService.getUser(userId).then((res) => setCurrentUser(res.data));
    } else {
      setCurrentUser(user);
    }
  }, []);
  const submitUserDetails = (data) => {
    dispatch(updateUser({ id: user.id, payload: { ...user, ...data } })).then(
      () => window.location.reload()
    );
  };
  return (
    <div>
      {!isDetailPage && (
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
      )}
      {isDetailPage && (
        <div className={s.details}>
          <p>
            <span>Name: </span>
            {currentUser.name}
          </p>
          <p>
            <span>Github Username: </span>
            {currentUser.githubUsername}
          </p>

          {currentUser?.skills?.length > 0 && (
            <>
              <span>Skills:</span>
              <div className={s.details__tab}>
                {currentUser.skills.map((skill, index) => (
                  <Tag name={skill} key={index} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
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

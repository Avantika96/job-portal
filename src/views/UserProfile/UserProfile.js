import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import s from "./UserProfile.module.scss";
import { Tag } from "../../components";
import UserService from "../../services/userService";
import { setTitle } from "../../slices/view";

const UserProfile = () => {
  const { userId } = useParams();
  const [repos, setRepos] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const { githubUsername = "", skills = [], name = "" } = currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && currentUser.githubUsername) {
      UserService.getGithubRepos(currentUser.githubUsername).then((response) =>
        setRepos(response.data)
      );
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(setTitle("User Profile"));
    UserService.getUser(userId).then((res) => setCurrentUser(res.data));
  }, []);

  return (
    <div>
      <div className={s.details}>
        <p>
          <span>Name: </span>
          {name}
        </p>
        <p>
          <span>Github Username: </span>
          {githubUsername}
        </p>

        {skills.length > 0 && (
          <>
            <span>Skills:</span>
            <div className={s.details__tab}>
              {skills.map((skill, index) => (
                <Tag name={skill} key={index} />
              ))}
            </div>
          </>
        )}
      </div>
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

export default UserProfile;

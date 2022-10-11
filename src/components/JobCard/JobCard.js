import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import s from "./JobCard.module.scss";
import { AppContext } from "../../AppContext";
import { Tag } from "../";

const JobCard = ({
  id,
  title = "",
  description = "",
  tags = [],
  applicants = [],
  date = "",
}) => {
  const { isFreelancer } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/job-detail/${id}`)} className={s.card}>
      <span className={s.card__title}>{title}</span>
      <p className={s.card__desc}>
        <span>Description: </span>
        {description}
      </p>
      {!isFreelancer ? (
        <p className={s.card__desc}>
          <span>No of applicants: </span>
          {applicants.length}
        </p>
      ) : (
        <div className={s.card__desc}>
          {tags.map((tag, index) => (
            <Tag name={tag} key={index} />
          ))}
        </div>
      )}
      <p className={s.card__date}>
        <span>Posted On: </span>
        {date}
      </p>
    </div>
  );
};

export default JobCard;

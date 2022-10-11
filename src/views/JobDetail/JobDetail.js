import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyToJob } from "../../slices/jobs";
import { setTitle } from "../../slices/view";
import s from "./JobDetail.module.scss";
import { Button, Tag } from "../../components";
import { AppContext } from "../../AppContext";
import JobsService from "../../services/jobsService";

const JobDetail = () => {
  const { isFreelancer } = useContext(AppContext);
  const { jobId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [job, setJob] = useState({});
  const {
    id,
    title = "",
    description = "",
    requirements = "",
    company = "",
    contact: { name, phone } = {},
    tags = [],
    applicants = [],
    date = "",
    salary = 0,
  } = job;
  const isApplied = applicants.find((item) => item.id === user.id);
  const dispatch = useDispatch();

  const getJob = async (id) => {
    const res = await JobsService.getJobById(id);
    setJob(res.data);
  };

  useEffect(() => {
    if (jobId) {
      getJob(jobId);
    }
  }, [jobId]);

  useEffect(() => {
    dispatch(setTitle(title));
  }, [job, title, dispatch]);

  const applyJob = () => {
    dispatch(
      applyToJob({
        jobId: id,
        payload: {
          ...job,
          applicants: [...job.applicants, { id: user.id, name: user.name }],
        },
      })
    );
  };

  return (
    <div className={s.wrap}>
      <div className={s.details}>
        <p>
          <span className={s.details__title}>Company: </span>
          <span>{company}</span>
        </p>
        <p>
          <span className={s.details__title}>Posted On: </span>
          <span>{date}</span>
        </p>
        <div className={s.details__tag}>
          {tags.map((tag, index) => (
            <Tag key={index} name={tag} />
          ))}
        </div>
        <span className={s.details__title}>Description</span>
        <p>{description}</p>
        <span className={s.details__title}>Requirements</span>
        <p>{requirements}</p>
        <div className={s.details__contact}>
          <span className={s.details__title}>Contact of the Recruiter</span>
          <span>{name}</span>
          <span>{phone}</span>
        </div>
        <span className={s.details__title}>Salary per hour</span>
        <p>&#8377;{salary}</p>
        {isFreelancer && !isApplied && (
          <Button text="Apply" handleClick={() => applyJob()} />
        )}
        {isFreelancer && isApplied && (
          <span className={s.details__applied}>Applied!</span>
        )}
      </div>
      {!isFreelancer && applicants.length > 0 && (
        <div className={s.applicants}>
          <span className={s.details__title}>Applicants</span>
          <ul>
            {applicants.map(({ name, id }) => (
              <li key={id}>
                <Link to={{ pathname: `/user-profile/${id}` }}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDetail;

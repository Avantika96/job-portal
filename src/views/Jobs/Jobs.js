import React, { useEffect, useContext, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { getJobs } from "../../slices/jobs";
import { setTitle } from "../../slices/view";
import { JobCard } from "../../components";
import { AppContext } from "../../AppContext";
import s from "./Jobs.module.scss";
import { Button, TagInput } from "../../components";
import { disableSubmitOnEnter } from "../../utils";

const PAGE_LIMIT = 10;

const Jobs = () => {
  const lastItemRef = useRef();
  const observer = useRef();
  const [page, setPage] = useState(1);
  const jobs = useSelector((state) => state.jobs);
  const [jobList, setJobList] = useState(jobs);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { isFreelancer } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filteredJobs.length > 0) {
      setJobList(filteredJobs.slice(0, page * PAGE_LIMIT));
    } else if (jobs.length > 0) {
      setJobList(jobs.slice(0, page * PAGE_LIMIT));
    }
  }, [jobs, page, filteredJobs]);

  useEffect(() => {
    dispatch(setTitle("Jobs"));
    dispatch(getJobs());
  }, []);

  useEffect(() => {
    const options = {
      root: document,
      rootMargin: "20px",
      threshold: 1,
    };
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        setPage(page + 1);
      }
    };
    observer.current = new IntersectionObserver(callback, options);
    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }
    return () => {
      observer.current.disconnect();
    };
  });

  const checkSkills = (jobTags = [], skills) => {
    for (let i = 0; i < skills.length; i++) {
      if (
        jobTags.some((tag) => tag.toLowerCase() === skills[i].toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  };

  const filterJobs = (filters) => {
    const { skills, minSalary } = filters;
    const filteredData = jobs.filter((job) => {
      const { tags = [], salary = 0 } = job;
      return (
        (skills.length > 0 && checkSkills(tags, skills)) ||
        (minSalary && parseInt(salary) >= parseInt(minSalary))
      );
    });
    setFilteredJobs(filteredData);
  };

  return (
    <div className={s.wrap}>
      <div className={s.wrap__jobs}>
        {jobList.length > 0 ? (
          jobList.map((job, index) => {
            if (index === jobList.length - 1) {
              return (
                <>
                  <JobCard {...job} key={index} />
                  <span ref={lastItemRef}></span>
                </>
              );
            } else {
              return <JobCard {...job} key={index} />;
            }
          })
        ) : (
          <span>No Jobs Found!</span>
        )}
      </div>
      {isFreelancer && (
        <div className={s.wrap__filters}>
          <span>Filter Jobs</span>
          <Formik
            initialValues={{
              skills: [],
              minSalary: undefined,
            }}
            onSubmit={(values) => {
              filterJobs(values);
            }}
          >
            {({ setFieldValue }) => (
              <Form onKeyDown={disableSubmitOnEnter}>
                <TagInput
                  name="skills"
                  placeholder="Enter Skills"
                  handleChange={(tags) => setFieldValue("skills", tags)}
                />
                <Field
                  name="minSalary"
                  placeholder="Enter Min Salary per hour"
                  type="number"
                  className={s.wrap__field}
                />
                <Button type="submit" text="Submit" />
                <Button
                  type="button"
                  text="Clear Filter"
                  handleClick={() => setFilteredJobs([])}
                  customStyle={{ marginLeft: "10px" }}
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Jobs;

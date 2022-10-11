import React, { useEffect, useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { getJobs } from "../../slices/jobs";
import { setTitle } from "../../slices/view";
import { JobCard } from "../../components";
import { AppContext } from "../../AppContext";
import s from "./Jobs.module.scss";
import { Button, TagInput } from "../../components";
import { disableSubmitOnEnter } from "../../utils";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const jobs = useSelector((state) => state.jobs);
  const { isFreelancer } = useContext(AppContext);
  const dispatch = useDispatch();
  const init = useCallback(() => {
    dispatch(setTitle("Jobs"));
    dispatch(getJobs()).then((jobs) => setJobList(jobs.payload));
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

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
        (minSalary && salary >= minSalary)
      );
    });
    setJobList(filteredData);
  };

  return (
    <div className={s.wrap}>
      <div className={s.wrap__jobs}>
        {jobList.length > 0 ? (
          jobList.map((job, index) => <JobCard {...job} key={index} />)
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
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Jobs;

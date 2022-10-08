import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../slices/jobs";
import { setTitle } from "../slices/view";

const Jobs = () => {
  const jobs = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const init = useCallback(() => {
    dispatch(setTitle("Jobs"));
    dispatch(getJobs());
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);
  return <div>{jobs.length > 0 && jobs.map((job) => <p>{job.title}</p>)}</div>;
};

export default Jobs;

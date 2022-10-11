import MockAdapter from "axios-mock-adapter";
import store from "../store/store";
import httpService from "../services/httpService";
import { JOBS_API } from "../constants";
import { getJobs, addJob, applyToJob } from "./jobs";

const getJobsResponse = [
  {
    id: "A42E6793-F24C-38A3-A25C-ABCB4E86EF85",
    title: "Devops",
    description: "Nam Limited",
    requirements: "Sed Institute",
    tags: [],
    salary: 1200,
    date: "Nov 14, 2021",
    company: "Facilisis Corp.",
    employerId: "EVW82LTQ1XK",
    applicants: [],
    employerPhone: "(271) 454-1215",
    employerName: "Bryar Logan",
  },
];

const newJobData = {
  id: "46C4A2E2-7250-9737-6D1C-F3EC8D1CD54E",
  title: "Product Manager",
  description: "Tempor Est Corp.",
  requirements: "Felis Foundation",
  tags: [],
  salary: 1200,
  date: "Dec 5, 2022",
  company: "Duis A Associates",
  employerId: "LEX26PWK1TT",
  applicants: [],
  employerPhone: "1-935-661-1780",
  employerName: "Rosalyn Soto",
};

const userMockData = {
  name: "Avantika",
  username: "Avantika96",
  password: "abcd4321",
  userType: "freelancer",
  id: "uXgvmiJ",
  githubUsername: "Avantika96",
  skills: ["html", "css", "js"],
};

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const mockNetworkResponse = () => {
  const mock = new MockAdapter(httpService);
  mock.onGet(JOBS_API).reply(200, getJobsResponse);
  mock.onPost(JOBS_API, newJobData).reply(200, newJobData);
};

describe("Jobs redux state tests", () => {
  const original = window.location;
  beforeAll(() => {
    window.localStorage.setItem("user", JSON.stringify(userMockData));
    mockNetworkResponse();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: original,
    });
  });

  it("Should initially set jobs an empty array and fetchingJobs to false", () => {
    const state = store.getState().jobs;
    expect(state.jobs).toEqual([]);
    expect(state.fetchingJobs).toEqual(false);
  });

  it("Should be able to fetch all the jobs", async () => {
    const result = await store.dispatch(getJobs());
    const jobs = result.payload;

    expect(result.type).toBe("jobs/getAll/fulfilled");
    expect(jobs).toEqual(getJobsResponse);

    const state = store.getState().jobs;
    expect(state.jobs).toEqual(
      expect.arrayContaining([expect.objectContaining(jobs[0])])
    );
    expect(state.fetchingJobs).toEqual(false);
  });

  it("Should be able to add a new job", async () => {
    const result = await store.dispatch(addJob(newJobData));
    const job = result.payload;

    expect(result.type).toBe("jobs/addJob/fulfilled");

    const state = store.getState().jobs;
    expect(state.jobs).toEqual(
      expect.arrayContaining([expect.objectContaining(job)])
    );
  });
});

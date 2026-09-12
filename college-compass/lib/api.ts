import axios from "axios";

export const API = axios.create({
  baseURL: "/api",
});

// LOGIN
export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

// REGISTER
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await API.post("/auth/register", {
    name,
    email,
    password,
  });

  return response.data;
};

// GET SAVED COLLEGES
export const getSavedColleges = async (token: string) => {
  const response = await API.get("/saved-colleges", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// SAVE COLLEGE
export const saveCollege = async (
  token: string,
  collegeId: number
) => {
  const response = await API.post(
    "/saved-colleges",
    {
      collegeId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// REMOVE SAVED COLLEGE
export const removeSavedCollege = async (
  token: string,
  collegeId: number
) => {
  const response = await API.delete(
    `/saved-colleges/${collegeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
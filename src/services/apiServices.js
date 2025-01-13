import axios from "../utils/axiosCustomize";
// import axios from "axios";

const login = (email, password) => {
  return axios.post(
    "auth/login",
    {
      email: email,
      password: password,
    },
    {
      headers: { "Content-Type": "application/json" },
      // withCredentials: true,
    }
  );
};

const getClass = () => {
  return axios.get("class/search", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

const addClass = (classId, className) => {
  console.log(classId, className);
  return axios.post("class/create", {
    classId: classId,
    className: className,
  });
};

const updataClass = (id, classId, className) => {
  console.log("id, classId, className", id, classId, className);
  return axios.patch(`class/update/${id}`, {
    classId: classId,
    className: className,
  });
};

const getSubject = () => {
  return axios.get("department/search", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

const addSubject = (departmentId, departmentName) => {
  // console.log(classId, className);
  return axios.post("department/create", {
    departmentId: departmentId,
    departmentName: departmentName,
  });
};

const updateSubject = (id, departmentId, departmentName) => {
  return axios.patch(`department/update/${id}`, {
    departmentId: departmentId,
    departmentName: departmentName,
  });
};

const getGroupUsers = () => {
  return axios.get("role/search", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

const addGroupUsers = (roleId, roleName, description) => {
  // console.log(classId, className);
  return axios.post("role/create", {
    roleId: roleId,
    roleName: roleName,
    description: description,
  });
};

const updateGroupUsers = (
  id,
  roleId,
  roleName,
  personalRule,
  informationLookupRule,
  administrationRule,
  description
) => {
  return axios.patch(`role/create/${id}`, {
    roleId: roleId,
    roleName: roleName,
    personalRule: personalRule,
    informationLookupRule: informationLookupRule,
    administrationRule: administrationRule,
    description: description,
  });
};

const getUserCurrent = () => {
  return axios.get("user/current", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

const getKeys = () => {
  return axios.get("school-year/search", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

const addKey = (schoolYearId, schoolYearName, startYear, endYear) => {
  // console.log(classId, className);
  return axios.post("school-year/create", {
    schoolYearId: schoolYearId,
    schoolYearName: schoolYearName,
    startYear: startYear,
    endYear: endYear,
  });
};

const updateKey = (id, schoolYearId, schoolYearName, startYear, endYear) => {
  return axios.patch(`school-year/update/${id}`, {
    schoolYearId: schoolYearId,
    schoolYearName: schoolYearName,
    startYear: startYear,
    endYear: endYear,
  });
};

const getMajor = () => {
  return axios.get("major/search", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

const addMajor = (majorId, majorName) => {
  // console.log(classId, className);
  return axios.post("major/create", {
    majorId: majorId,
    majorName: majorName,
  });
};

const updateMajor = (id, majorId, majorName) => {
  console.log("id, majorId, majorName", id, majorId, majorName);
  return axios.patch(`major/update/${id}`, {
    majorId: majorId,
    majorName: majorName,
  });
};

const getUsers = () => {
  return axios.get("user/search", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

const addUser = (
  email,
  userId,
  password,
  firstName,
  lastName,
  gender,
  position,
  schoolYearId,
  classId,
  pastMajorId,
  currentMajorId,
  secondMajorId,
  departmentId,
  roleId
) => {
  // console.log(classId, className);
  return axios.post("user/create", {
    email: email,
    userId: userId,
    password: password,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    position: position,
    schoolYearId: schoolYearId,
    classId: classId,
    pastMajorId: pastMajorId,
    currentMajorId: currentMajorId,
    secondMajorId: secondMajorId,
    departmentId: departmentId,
    roleId: roleId,
  });
};

const getEvent = () => {
  return axios.get("event/search", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

const getEventCurrent = () => {
  return axios.get("event/current", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

const addEvent = (eventType, startTime, endTime, schoolYearId) => {
  return axios.post("event/create", {
    eventType: eventType,
    startTime: startTime,
    endTime: endTime,
    schoolYearId: schoolYearId,
  });
};

const getSJ = () => {
  return axios.get("subject/search", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

const getSJNew = () => {
  return axios.get("search?sort=created_at_desc", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

const addSJ = (
  subjectId,
  subjectName,
  credits,
  theoreticalHours,
  practicalHours,
  prerequisiteCourses, // Remove the `[]` here
  equivalentCourses, // Remove the `[]` here
  coefficient,
  departmentId
) => {
  return axios.post("subject/create", {
    subjectId,
    subjectName,
    credits,
    theoreticalHours,
    practicalHours,
    prerequisiteCourses, // Pass the array directly
    equivalentCourses, // Pass the array directly
    coefficient,
    departmentId,
  });
};

const changePassword = (oldPassword, newPassword) => {
  console.log("oldPassword, newPassword", oldPassword, newPassword);
  return axios.post("auth/change-password", {
    oldPassword: oldPassword,
    newPassword: newPassword,
  });
};

const getProgram = () => {
  return axios.get("program/search", {
    // params: param, // Pass search parameters as query parameters
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
    },
  });
};

export {
  login,
  getClass,
  addClass,
  updataClass,
  getSubject,
  addSubject,
  updateSubject,
  getGroupUsers,
  addGroupUsers,
  updateGroupUsers,
  getUserCurrent,
  getKeys,
  addKey,
  updateKey,
  getMajor,
  addMajor,
  updateMajor,
  getUsers,
  addUser,
  getEvent,
  getEventCurrent,
  addEvent,
  getSJ,
  getSJNew,
  addSJ,
  changePassword,
  getProgram,
}; // Export both functions

import api from "./axios";

export const listCourses = () => api.get("/student/courses");

export const enrollCourse = (courseId) =>
  api.post(`/student/course/${courseId}/enroll`);

export const getCourseMedia = (courseId) =>
  api.get(`/student/course/${courseId}/media`);


export const getCourseStudents = (courseId) =>
  api.get(`/instructor/course/${courseId}/students`);

export const removeStudent = (courseId, studentId) =>
  api.delete(`/instructor/course/${courseId}/student/${studentId}`);

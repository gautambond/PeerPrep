import api from "./axios";

// ⭐ NEW — FIXED missing function
export const getInstructorCourses = () => 
  api.get("/instructor/courses");

// Create a course
export const createCourse = (data) => 
  api.post("/instructor/course", data);

// Upload media (images/videos)
export const uploadMedia = (courseId, file) => {
  const form = new FormData();
  form.append("file", file);
  return api.post(`/instructor/course/${courseId}/media`, form);

};


export const getCourseStudents = (courseId) =>
  api.get(`/instructor/course/${courseId}/students`);


// Add student to a course
export const addStudent = (courseId, studentId) =>
  api.post(`/instructor/course/${courseId}/add-student`, { studentId });

// Delete media file
export const deleteMedia = (courseId, mediaId) =>
  api.delete(`/instructor/course/${courseId}/media/${mediaId}`);

// Remove student from a course
export const removeStudent = (courseId, studentId) =>
  api.delete(`/instructor/course/${courseId}/student/${studentId}`);

// Delete course entirely
export const deleteCourse = (courseId) =>
  api.delete(`/instructor/course/${courseId}`);

// Get statistics (not used but OK)
export const getStats = () => 
  api.get("/instructor/stats/courses");

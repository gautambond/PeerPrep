import api from "./axios";

export const getUsers = () => api.get("/admin/users");

export const deleteMediaAdmin = (mediaId) =>
  api.delete(`/admin/media/${mediaId}`);


export const getAllMedia = () => api.get("/admin/media");
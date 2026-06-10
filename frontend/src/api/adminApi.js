import API from "./axios";

// Stats
export const fetchStats = () => API.get("/admin/stats");

// Users
export const fetchUsers = (params) => API.get("/admin/users", { params });
export const updateUser = (id, data) => API.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

// Agencies
export const fetchAdminAgencies = (params) => API.get("/admin/agencies", { params });
export const createAgency = (data) => API.post("/admin/agencies", data);
export const updateAgency = (id, data) => API.put(`/admin/agencies/${id}`, data);
export const deleteAgency = (id) => API.delete(`/admin/agencies/${id}`);

// Reports
export const fetchAdminReports = (params) => API.get("/admin/reports", { params });
export const updateReport = (id, data) => API.put(`/admin/reports/${id}`, data);
export const deleteReport = (id) => API.delete(`/admin/reports/${id}`);

// Posts
export const fetchAdminPosts = (params) => API.get("/admin/posts", { params });
export const updatePost = (id, data) => API.put(`/admin/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/admin/posts/${id}`);

// Jobs
export const fetchAdminJobs = (params) => API.get("/admin/jobs", { params });
export const createJob = (data) => API.post("/admin/jobs", data);
export const updateJob = (id, data) => API.put(`/admin/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/admin/jobs/${id}`);
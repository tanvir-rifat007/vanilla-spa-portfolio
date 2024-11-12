import { API } from "../services/api.js";
import STATE from "../services/state.js";
export const fetchProjects = async function () {
  const projects = await API.fetchProjects();
  STATE.projects = projects;
};

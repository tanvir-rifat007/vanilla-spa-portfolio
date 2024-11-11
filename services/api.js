export const API = {
  url: "../projects.json",
  fetchProjects: async function () {
    const response = await fetch(this.url);
    const data = await response.json();
    return data.projects;
  },
};

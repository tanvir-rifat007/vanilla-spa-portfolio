const router = {
  init: function () {
    const routes = document.querySelectorAll("a.navlink");
    routes.forEach((route) => {
      route.addEventListener("click", (e) => {
        e.preventDefault();
        const path = e.target.getAttribute("href");
        this.navigate(path);
      });
    });

    globalThis.addEventListener("popstate", (e) => {
      this.navigate(e.state?.path || "/", false);
    });

    // Load the current location on init
    this.navigate(location.pathname);
  },

  navigate: function (path, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ path }, null, path);
    }

    // Start view transition if supported
    if (document.startViewTransition) {
      document.startViewTransition();
    }

    // Clear or hide sections based on the route
    const projectDetails = document.querySelector("#project-details");
    const projectsSection = document.querySelector("#projects-section");
    const projects = document.querySelector("#projects");
    const contactPage = document.querySelector("#contact");
    const about = document.querySelector("#about");
    const projectsHeader = document.querySelector("#projects-header");

    // Home page route
    if (path === "/") {
      // Remove any previous instances of the projects component
      projects.innerHTML = "";

      projectsHeader.innerHTML = "Projects";
      projectDetails.innerHTML = "";
      about.classList.remove("hidden");
      contactPage.classList.add("hidden");
      projectsSection.classList.remove("hidden");
      projects.classList.remove("hidden");

      projectDetails.classList.remove("hidden");

      // Create and append the ProjectsComponent
      const ProjectsComponent = document.createElement("app-projects");
      projects.appendChild(ProjectsComponent);
    }

    // Project details route
    else if (path.includes("/details-")) {
      // Clear previous content
      projects.innerHTML = "";
      projectsHeader.innerHTML = "";
      about.classList.add("hidden");
      projectDetails.innerHTML = "";

      // Create and append the DetailsComponent
      const detailsComponent = document.createElement("app-projects-details");
      projectDetails.appendChild(detailsComponent);
    }

    // Contact page route
    else if (path === "/contact") {
      // Hide other sections
      projectDetails.classList.add("hidden");
      about.classList.add("hidden");
      projectsSection.classList.add("hidden");
      projects.classList.add("hidden");

      // Clear any previous contact component and show the new one
      contactPage.innerHTML = "";
      contactPage.classList.remove("hidden");

      const contactComponent = document.createElement("app-projects-contact");
      contactPage.appendChild(contactComponent);
    }
  },
};

export default router;

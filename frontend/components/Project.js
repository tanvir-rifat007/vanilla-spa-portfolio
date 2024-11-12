export class Projects extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    this.root.appendChild(style);
    async function loadCSS() {
      const css = await fetch("./components/Project.css");
      style.textContent = await css.text();
    }
    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById("projects-template");
    const templateContent = template.content;
    this.root.appendChild(templateContent.cloneNode(true));

    globalThis.addEventListener("app:projects-updated", () => {
      this.render();
    });

    this.render();
  }

  render() {
    const projects = app.state.projects;
    console.log("projects", projects);

    if (!projects.length) {
      return;
    }

    const projectsHome = this.root.querySelector("#projects");
    projectsHome.innerHTML = "";

    projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project card glass glass-pane-header ";
      projectCard.innerHTML = `
        <h3>${project.name}</h3>
        <img src="${project.image}" alt="${project.name}" />
        <p>${project.description.slice(0, 40) + "..."}</p>
      `;

      projectCard.onclick = () => {
        // Set the selected product in the global state and navigate to details
        // so the details page can render the selected product
        app.state.selectedProject = project;
        app.router.navigate(`/details-${project.id}`);
      };

      projectsHome.appendChild(projectCard);
    });

    console.log("Home page rendered");
  }
}

customElements.define("app-projects", Projects);

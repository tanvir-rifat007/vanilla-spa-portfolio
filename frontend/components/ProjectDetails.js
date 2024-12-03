export class ProjectDetails extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    this.root.appendChild(style);
    async function loadCSS() {
      const css = await fetch("./components/ProjectDetails.css");
      style.textContent = await css.text();
    }
    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById("projects-details-template");
    const templateContent = template.content;
    this.root.appendChild(templateContent.cloneNode(true));
    this.render();
  }

  render() {
    const project = app.state.selectedProject;
    const detailSection = this.root.querySelector("#projects-details");

    detailSection.innerHTML = "";

    if (project) {
      detailSection.innerHTML = `
        <button class="glass glass-pane-header" onclick="app.router.navigate('/')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="15 18 9 12 15 6"></polyline>
</svg>
</button>
        <h2>${project.name}</h2>
        <img style="width:100%;height:100%;  object-fit: contain;
" src="${project.image}" alt="${project.name}" />

        <p><span style="font-size:1.2rem; font-weight:bold;">Description: </span>${
          project.description
        }.</p>

        ${
          project.live
            ? `<p><span style="font-size:1.2rem; font-weight:bold;">Live:</span> <a href="${project.live}">${project.live}</a></p>`
            : ""
        }
        
        <p><b style="font-size:1.2rem;">Github:</b> <a href="${
          project.github
        }">${project.github}</a></p>
      `;
    } else {
      detailSection.innerHTML = `<p>project not found</p>`;
    }
  }
}

customElements.define("app-projects-details", ProjectDetails);

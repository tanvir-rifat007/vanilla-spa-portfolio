import { Projects } from "./components/projects.js";
import { ProjectDetails } from "./components/ProjectDetails.js";
import { Contact } from "./components/Contact.js";

import { fetchProjects } from "./utils/loadProjects.js";
import STATE from "./services/state.js";
import router from "./services/router.js";
import { ai } from "./services/ai.js";

globalThis.app = {
  state: STATE,
  router,
  ai,
};

globalThis.addEventListener("DOMContentLoaded", () => {
  fetchProjects();

  app.router.init();

  // for flip animation
  const image = document.querySelector(".flip-trigger");
  const aboutContent = document.querySelector(".about-content");

  image.addEventListener("click", () => {
    if (aboutContent.classList.contains("hidden")) {
      aboutContent.classList.remove("hidden", "hidden-back");

      setTimeout(() => {
        aboutContent.classList.add("flipping");
      }, 10);
    } else {
      aboutContent.classList.remove("flipping");
      aboutContent.classList.add("hidden-back");

      setTimeout(() => {
        aboutContent.classList.add("hidden");
      }, 600);
    }

    image.classList.remove("prompt-animation");
  });
});

var navLinks = document.querySelectorAll("nav a");
console.log(navLinks);
for (var i = 0; i < navLinks.length; i++) {
  var link = navLinks[i];
  if (link.getAttribute("href") == window.location.pathname) {
    link.classList.add("live");
    break;
  }
}

import { ProjectDetails } from "./components/ProjectDetails.js";
import { Contact } from "./components/Contact.js";

import { fetchProjects } from "./utils/loadProjects.js";
import STATE from "./services/state.js";
import router from "./services/router.js";
import { ai } from "./services/ai.js";
import { Projects } from "./components/Project.js";

navigator.serviceWorker.register("/sw.js");

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

  const menu = document.querySelector(".menu");
  const close = document.querySelector(".close");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav a");

  menu.addEventListener("click", () => {
    menu.classList.add("menu-hide");
    close.classList.add("close-show");
    nav.classList.add("nav-show");
  });

  close.addEventListener("click", () => {
    menu.classList.remove("menu-hide");
    close.classList.remove("close-show");
    nav.classList.remove("nav-show");
  });

  // for when click on the link:

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("menu-hide");
      close.classList.remove("close-show");
      nav.classList.remove("nav-show");
    });
  });
});

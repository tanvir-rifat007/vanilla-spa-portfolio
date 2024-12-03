import { ProjectDetails } from "./components/ProjectDetails.js";
import { Contact } from "./components/Contact.js";

import { fetchProjects } from "./utils/loadProjects.js";
import STATE from "./services/state.js";
import router from "./services/router.js";
import { ai } from "./services/ai.js";
import { Projects } from "./components/Project.js";

const URL = "https://teachablemachine.withgoogle.com/models/oF9z45RJn/";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
} else {
  console.log("Service Worker is not supported in this browser.");
}

globalThis.app = {
  state: STATE,
  router,
  ai,
};

globalThis.addEventListener("DOMContentLoaded", () => {
  init();

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

let isDark = false;

function showMessage(message) {
  const messageContainer = document.getElementById("mode-message");
  messageContainer.textContent = message;
  messageContainer.classList.add("show");
  console.log(messageContainer);

  setTimeout(() => {
    messageContainer.classList.remove("show");
  }, 3000); // 3 seconds
}

async function startAudio() {
  const recognizer = speechCommands.create(
    "BROWSER_FFT",
    undefined,
    URL + "model.json",
    URL + "metadata.json"
  );

  await recognizer.ensureModelLoaded();

  return recognizer;
}

async function init() {
  const recognizer = await startAudio();
  console.log(recognizer);
  const classLabels = recognizer.wordLabels();

  recognizer.listen(
    (result) => {
      const { scores } = result;
      const maxValue = Math.max(...scores);
      const index = scores.indexOf(maxValue);
      const label = classLabels[index];

      console.log(label);

      if (label === "singleClap" && !isDark) {
        document.documentElement.classList.add("dark");

        isDark = true;
        showMessage("You are in dark mode");

        return;
      }
      if (label === "singleClap" && isDark) {
        document.documentElement.classList.remove("dark");
        isDark = false;
        showMessage("You are in light mode");

        return;
      }

      if (label === "doubleClap") {
        const aboutContent = document.querySelector(".about-content");
        const image = document.querySelector(".flip-trigger");

        // Trigger flip animation
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
      }
    },
    {
      includeSpectrogram: true,
      probabilityThreshold: 0.85,
      invokeCallbackOnNoiseAndUnknown: true,
      overlapFactor: 0.5,
    }
  );
}

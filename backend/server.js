import express from "express";
import cors from "cors";
import "dotenv/config";
import OpenAI from "openai";
import fs from "node:fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(express.json());
app.use(cors());

const feededData = {
  name: "Tanvir Rifat",
  role: "Software Engineer",
  projects: [
    {
      id: 1,
      name: "Nudity Checker Fullstack Dating App",
      description:
        "Built a full-featured dating application with real-time matching and automated nudity detection. Implemented using Next.js and containerize with Docker",
      image: "./images/projects/dating1.png",
      live: "https://fullstack-dating-app-nextjs.vercel.app/login",
      github: "https://github.com/tanvir-rifat007/fullstack-dating-app-nextjs",
    },
    {
      id: 2,
      name: "MoodyPlayer AI Music Player",
      description:
        "Developed a mood-based music player using TensorFlow.js to detect emotions and suggest songs, with a JavaScript and CSS interface and Service Worker for offline capability",
      image: "./images/projects/moodyPlayer.png",
      live: "https://moodyplayer.netlify.app/",
      github: "https://github.com/tanvir-rifat007/MoodyPlayerv2",
    },
    {
      id: 3,
      name: "CodeClips PWA",
      description:
        "Developed a Go-based code snippet management tool with a Progressive Web App (PWA) interface. Used Go for backend API, HTML templates for UI and Service Worker for offline capability.",
      image: "./images/projects/codeClips.png",
      live: "https://codeclips-go-app-5.onrender.com/",
      github: "https://github.com/tanvir-rifat007/codeclips-go-app",
    },
    {
      id: 4,
      name: "Soroborno Likhi",
      description:
        "Developed a full-featured blogging platform with a React.js frontend and a Node.js backend. Implemented user authentication, CRUD operations, and a responsive design.",
      image: "./images/projects/soroborno.png",
      live: "https://soroborno-likhi-h2va-ja7x59q9g-tanvir-rifats-projects.vercel.app/",
      github: "https://github.com/tanvir-rifat007/soroborno-likhi",
    },
    {
      id: 5,
      name: "Syshealth Checker for Macbook",
      description:
        "Created a systemhealth checker for Macbook using Golang. It checks the system health and provides a notification to the user.",
      image: "./images/projects/syshealth.png",

      github: "https://github.com/tanvir-rifat007/mac-syshealthcheck-cli",
    },
  ],
  contactInfo: {
    email: "tanvirhassanrifat50@gmail.com",
    location: "Bamoil,Demra-Dhaka",
  },
};

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  // Load your JSON data (could be from a file or database)
  const userData = feededData;
  console.log(userData);

  const personalizedPrompt = `
            You are assisting visitors on ${userData.name}'s portfolio site.
            Here's some context:
            - Name: ${userData.name}
            - Role: ${userData.role}
            - Email: ${userData.contactInfo.email}
            - Location: ${userData.contactInfo.location}
            - Projects: ${userData.projects
              .map((project) => `${project.name} - ${project.description}`)
              .join(", ")}
            
            Visitor's message: ${message}
        `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: personalizedPrompt,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  console.log(response.choices[0].message.content);
  res.json(response.choices[0].message.content);
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});

export const ai = async () => {
  const chatBox = document.querySelector("app-projects-contact");
  const shadowRoot = chatBox.shadowRoot;

  const userInput = shadowRoot.getElementById("user-input").value;

  console.log(userInput);
  if (!userInput) return;

  const userMessage = document.createElement("div");
  userMessage.innerText = `👤 ${userInput}`;
  shadowRoot.getElementById("chat-messages").appendChild(userMessage);

  // Send the message to your backend API
  let botMessage = document.createElement("div");
  try {
    shadowRoot.getElementById("user-input").value = "🤖 AI is working...";

    const response = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();

    console.log(data);

    botMessage.style.marginTop = "1.5rem";
    botMessage.style.marginBottom = "1.5rem";

    botMessage.innerText = `🤖 ${data}`;
    shadowRoot.getElementById("chat-messages").appendChild(botMessage);
    shadowRoot.getElementById("user-input").value = "";
  } catch (err) {
    console.log(err.message);
    botMessage.style.marginTop = "1.5rem";
    botMessage.style.marginBottom = "1.5rem";

    botMessage.innerText = `🤖 Server is down!`;
    shadowRoot.getElementById("chat-messages").appendChild(botMessage);
    shadowRoot.getElementById("user-input").value = "";
  }
};

export class Contact extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    this.root.appendChild(style);
    async function loadCSS() {
      const css = await fetch("./components/Contact.css");
      style.textContent = await css.text();
    }
    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById("contact-template");
    const templateContent = template.content;
    this.root.appendChild(templateContent.cloneNode(true));
    this.render();
  }

  render() {
    const contactSection = this.root.querySelector("#contact");

    contactSection.innerHTML = `
      <button class="glass glass-pane-header" onclick="app.router.navigate('/')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg></button>
      <section class="form">
        <textarea class="glass glass-pane-header" style="max-width:50%;" id="user-input" placeholder="Enter Your chat about me and my project..."></textarea>
        <button class="glass glass-pane-header" style="font-size:1rem;"  onclick="app.ai()" id="send-btn" class="glass">Chat about me with AI</button>
      </section>
      <div id="chat-messages"></div>
    `;
  }
}

customElements.define("app-projects-contact", Contact);

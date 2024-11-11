const STATE = {
  projects: [],
};
const proxiedStore = new Proxy(STATE, {
  set: (target, property, value) => {
    target[property] = value;
    if (property === "projects") {
      globalThis.dispatchEvent(new Event("app:projects-updated"));
    }

    return true;
  },
  get: (target, property) => {
    return target[property];
  },
});
export default proxiedStore;

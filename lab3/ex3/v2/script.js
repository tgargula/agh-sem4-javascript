class MySpan extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    let interval = -1;
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(val) {
    return this.setAttribute("value", val);
  }

  decrement() {
    this.value = this.value > 0 ? this.value - 1 : 0;
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === "value") {
      this.render();
      if (newVal === "0") {
        document.getElementById("licznik").value = "0";
      }
    }
  }

  connectedCallback() {
    this.render();
    const btn = document.getElementById("btn");
    btn.addEventListener("click", (e) => {
      window.clearInterval(this.interval);
      this.value = document.getElementById("licznik").value;
      this.interval = window.setInterval(() => this.decrement(), 1000);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `<span>${this.value}</span>`;
  }
}

customElements.define("my-span", MySpan);

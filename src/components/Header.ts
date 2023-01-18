import HTMLElementViewModel from "../core/HTMLElementViewModel";
import Router from "../utils/Router";

const html = /* html */ `
<header>
  <div class="wrapper">
    <div m-ref="prev" @click="clickPrev">
      <svg width="16" height="33" viewBox="0 0 16 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.1566 32.5416C12.82 32.5428 12.4875 32.4672 12.1834 32.3205C11.8793 32.1738 11.6114 31.9596 11.3994 31.6937L0.518228 17.9437C0.186878 17.5336 0.0057373 17.0193 0.0057373 16.4885C0.0057373 15.9577 0.186878 15.4433 0.518228 15.0333L11.7824 1.28328C12.1647 0.815287 12.7142 0.520981 13.3099 0.465111C13.9056 0.409241 14.4988 0.596383 14.9588 0.985367C15.4189 1.37435 15.7082 1.93331 15.7631 2.53929C15.8181 3.14527 15.6341 3.74862 15.2517 4.21662L5.18157 16.4999L14.9138 28.7833C15.1893 29.1197 15.3643 29.5293 15.418 29.9637C15.4718 30.398 15.4022 30.839 15.2173 31.2344C15.0325 31.6298 14.7402 31.963 14.3749 32.1947C14.0097 32.4263 13.5869 32.5467 13.1566 32.5416Z" fill="#1e1e20"/>
      </svg>
    </div>
    <h1>HPNY 2023</h1>
  </div>
</header>

<style scoped>
  :host {
    width: 100%;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  header {
    width: 100%;
    height: 83px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--grayscale-1);
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h1 {
    color: var(--grayscale-6);
    margin: 0;
  }
  div.hidden {
    visibility: hidden;
  }
  svg {
    cursor: pointer;
  }
  @media (min-width: 1201px) {
    .wrapper {
      width: 1200px;
    }
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    .wrapper{
      width: 768px;
    }
  }
  @media (max-width: 767px) {
    .wrapper {
      width: 360px;
    }
  }
</style>
`;

export default window.customElements.define(
  "hny-header",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
        methods: {
          clickPrev: () => {
            Router.push("/");
          },
        },
        mounted: () => {
          const isHome = window.location.pathname === "/";

          if (isHome) this.$ref.prev.classList.add("hidden");
          else this.$ref.prev.classList.remove("hidden");
        },
      });
    }
  }
);

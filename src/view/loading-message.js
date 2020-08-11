import {createElement} from "../utils.js";

class LoadingMessage {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<p class="board__no-tasks">
                Loading...
            </p>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default LoadingMessage;

import {createElement} from "../../../cinemaddict/src/utils";

class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantaite Abstract? only cocrete one.`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getElement());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Abstract;

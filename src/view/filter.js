import {createElement} from "../utils.js";

class Filter {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  createFilterItemTemplate(filter, isChecked) {
    const {name, count} = filter;
    return `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}      
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`;
  }

  getTemplate(filterItems) {
    const filterItemsTemplate = filterItems
      .map((filter, index) => this.createFilterItemTemplate(filter, index === 0))
      .join(``);

    return (
      `<section class="main__filter filter container">
      ${filterItemsTemplate}
        </section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._filters));
    }

    return this._element;
  }
}

export default Filter;

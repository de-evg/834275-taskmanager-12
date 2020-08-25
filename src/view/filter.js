import AbtractView from "./abstract.js";

class Filter extends AbtractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
  }

  createFilterItemTemplate(filter, currentFilterType) {
    const {type, name, count} = filter;
    return `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${type === currentFilterType ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}  
      value="${type}"    
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`;
  }

  createFilterTemplate(filterItems, currentFilterType) {
    const filterItemsTemplate = filterItems
      .map((filter) => this.createFilterItemTemplate(filter, currentFilterType))
      .join(``);

    return (
      `<section class="main__filter filter container">
    ${filterItemsTemplate}
      </section>`
    );
  }

  getTemplate() {
    return this.createFilterTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}

export default Filter;

import Observer from "../utils/oserver.js";
import {FilterType} from "../const.js";

class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FIlterType.All;
  }

  setFilter(uppdateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}

export default Filter;

import TaskView from "../view/task.js";
import TaskEditView from "../view/task-edit.js";
import {render, RenderPosition, replace} from "../utils.render.js";

class Task {
  constructor(taskListContainer) {
    this._taskListContainer = taskListContainer;

    this._taskComponent = null;
    this._taslEditComponent = null;

    this._handleEditCLick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(task) {
    this._task = task;
  
    this._taskComponent = new TaskView(task);
    this._taskEditComponent = new TaskEditView(task);
  
    this._taskComponent.setEditClickHandler(this._handleEditCLick);
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);
  
    render(this.taskListContainer, this._taskComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardTOForm() {
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardTOForm();
  }

  _haldeFormToCard() {
    this._replaceFormToCard();
  }
}

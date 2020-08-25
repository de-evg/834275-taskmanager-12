import BoardView from "../view/board.js";
import SortView from "../view/sort.js";
import TaskListView from "../view/tasks-list.js";
import NoTaskView from "../view/no-tasks.js";
import LoadMoreBtnView from "../view/load-more-btn";

import TaskPresenter from "./task.js";
import TaskNewPresenter from "./task-new.js";

import {RenderPosition, render, remove} from "../utils/render.js";
import {sortTaskUp, sortTaskDown} from "../utils/task.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";
import {filter} from "../utils/filter.js";

const TASK_COUNT_PER_STEP = 8;

class Board {
  constructor(boardContainer, tasksModel, filterModel) {
    this._boardContainer = boardContainer;
    this._tasksModel = tasksModel;
    this._filterModel = filterModel;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._taskPresenter = {};

    this._sortComponent = null;
    this._loadMoreBtnComponent = null;
    this._boardComponent = new BoardView();
    this._taskListComponent = new TaskListView();
    this._noTaskComponent = new NoTaskView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonCLick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._tasksModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._taskNewPresenter = new TaskNewPresenter(this._taskListComponent, this._handleViewAction);
  }

  init() {
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._taskListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  createTask() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this._taskNewPresenter.init();
  }

  _getTasks() {
    const filterType = this._filterModel.getFilter();
    const tasks = this._tasksModel.getTasks();
    const filtredTasks = filter[filterType](tasks);
    switch (this._currentSortType) {
      case SortType.DATE_UP:
        return filtredTasks.sort(sortTaskUp);
      case SortType.DATE_DOWN:
        return filtredTasks.sort(sortTaskDown);
      default:
        return filtredTasks;
    }
  }

  _handleModeChange() {
    this._taskNewPresenter.destroy();
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.resetView);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._tasksModel.updateTask(updateType, update);
        break;
      case UserAction.ADD:
        this._tasksModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._tasksModel.deleteTask(updateType, update);
        break;
      default:
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._taskPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearBoard({resetRenderedTaskCount: true});
    this._renderBoard();
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.DATE_UP:
        this._boardTasks.sort(sortTaskUp);
        break;
      case SortType.DATE_DOWN:
        this._boardTasks.sort(sortTaskDown);
        break;

      default:
        this._boardTasks = this._sourcedBoardTasks.slice();
    }

    this._currentSortType = sortType;
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const taskCount = this._getTasks().length;

    this._taskNewPresenter.destroy();
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.destroy());
    this._taskPresenter = {};

    remove(this._sortComponent);
    remove(this._noTaskComponent);
    remove(this._loadMoreBtnComponent);

    if (resetRenderedTaskCount) {
      this._renderedTaskCount = TASK_COUNT_PER_STEP;
    } else {
      this._renderedTaskCOunt = Math.min(taskCount, this._renderedTaskCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTask(task) {
    const taskPresenter = new TaskPresenter(this._taskListComponent, this._handleViewAction, this._handleModeChange);
    taskPresenter.init(task);
    this._taskPresenter[task.id] = taskPresenter;
  }

  _renderTasks(tasks) {
    tasks.forEach((task) => this._renderTask(task));
  }

  _renderNoTasks() {
    render(this._boardComponent, this._noTaskComponent, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreButtonCLick() {
    const taskCount = this._getTasks().length;
    const newRenderedTaskCount = Math.min(taskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);
    const tasks = this._getTasks().slice(this._renderedTaskCount, newRenderedTaskCount);

    this._renderTasks(tasks);
    this._renderedTaskCount = newRenderedTaskCount;

    if (this._renderedTaskCount >= taskCount) {
      remove(this._loadMoreBtnComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._loadMoreBtnComponent !== null) {
      this._loadMoreBtnComponent = null;
    }

    this._loadMoreBtnComponent = new LoadMoreBtnView();
    this._loadMoreBtnComponent.setClickHandler(this._handleLoadMoreButtonClick);

    render(this._boardComponent, this._loadMoreBtnComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    const tasks = this._getTasks();
    const taskCount = tasks.length;

    if (taskCount === 0) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();

    this._renderTasks(tasks.slice(0, Math.min(taskCount, this._renderedTaskCount)));

    if (taskCount > this._renderedTaskCount) {
      this._renderLoadMoreButton();
    }
  }
}

export default Board;

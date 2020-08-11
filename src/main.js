import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import BoardView from "./view/board.js";
import SortView from "./view/sort.js";
import TaskListView from "./view/tasks-list.js";
import TaskView from "./view/task.js";
import TaskEditView from "./view/task-edit.js";
import LoadMoreBtnView from "./view/load-more-btn";
import LoadingView from "./view/loading-message.js";
import NoTaskView from "./view/no-tasks-message.js";
import StatisticView from "./view/statistic.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuView();
render(siteHeaderElement, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);
const filterComponent = new FilterView(filters);
render(siteMainElement, filterComponent.getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const sortComponent = new SortView();
render(boardComponent.getElement(), sortComponent.getElement(), RenderPosition.AFTERBEGIN);

const taskListComponent = new TaskListView();
render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);

const taskEditComponent = new TaskEditView(tasks[0]);
render(taskListComponent.getElement(), taskEditComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(taskListComponent.getElement(), new TaskView(tasks[i]).getElement(), RenderPosition.BEFOREEND);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const loadMoreBtnComponent = new LoadMoreBtnView();
  render(boardComponent.getElement(), loadMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreBtnComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(taskListComponent.getElement(), new TaskView(task).getElement(), RenderPosition.BEFOREEND));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreBtnComponent.removeElement();
    }
  });
}

const loadingMessageComponent = new LoadingView();
render(boardComponent.getElement(), loadingMessageComponent.getElement(), RenderPosition.BEFOREEND);

const noTasksMessageComponent = new NoTaskView();
render(boardComponent.getElement(), noTasksMessageComponent.getElement(), RenderPosition.BEFOREEND);

const statisticComponent = new StatisticView();
render(siteMainElement, statisticComponent.getElement(), RenderPosition.BEFOREEND);

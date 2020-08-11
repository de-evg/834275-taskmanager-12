import SiteMenuView from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
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
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuView();
renderElement(siteHeaderElement, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilterTemplate(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
renderElement(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const sortComponent = new SortView();
renderElement(boardComponent.getElement(), sortComponent.getElement(), RenderPosition.AFTERBEGIN);

const taskListComponent = new TaskListView();
renderElement(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);

const taskEditComponent = new TaskEditView(tasks[0]);
renderElement(taskListComponent.getElement(), taskEditComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderElement(taskListComponent.getElement(), new TaskView(tasks[i]).getElement(), RenderPosition.BEFOREEND);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const loadMoreBtnComponent = new LoadMoreBtnView();
  renderElement(boardComponent.getElement(), loadMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreBtnComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderElement(taskListComponent.getElement(), new TaskView(task).getElement(), RenderPosition.BEFOREEND));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreBtnComponent.removeElement();
    }
  });
}

const loadingMessageComponent = new LoadingView();
renderElement(boardComponent.getElement(), loadingMessageComponent.getElement(), RenderPosition.BEFOREEND);

const noTasksMessageComponent = new NoTaskView();
renderElement(boardComponent.getElement(), noTasksMessageComponent.getElement(), RenderPosition.BEFOREEND);

const statisticComponent = new StatisticView();
renderElement(siteMainElement, statisticComponent.getElement(), RenderPosition.BEFOREEND);

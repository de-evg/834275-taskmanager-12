import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createBoardTemplate} from "./view/board.js";
import {createSortTemplate} from "./view/sort.js";
import {createTasksListTemplate} from "./view/tasks-list.js";
import {createCardTemplate} from "./view/card.js";
import {createCardEditTemplate} from "./view/card-edit.js";
import {createLoadMoreBtnTemplate} from "./view/load-more-btn";
import {createLoadingMessageTemplate} from "./view/loading-message.js";
import {createNoTasksMessageTemplate} from "./view/no-tasks-message.js";
import {createStatisticTemplate} from "./view/statistic.js";
import {generateTask} from "./mock/task.js";

const TASK_COUNT = 3;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

render(siteMainControlElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createSortTemplate());
render(boardElement, createTasksListTemplate());

const tasksListElement = boardElement.querySelector(`.board__tasks`);
for (let i = 0; i < TASK_COUNT; i++) {
  render(tasksListElement, createCardTemplate(tasks[i]));
}

render(tasksListElement, createCardEditTemplate());
render(boardElement, createLoadMoreBtnTemplate());
render(boardElement, createLoadingMessageTemplate());
render(boardElement, createNoTasksMessageTemplate());
render(siteMainElement, createStatisticTemplate());

import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createBoardTemplate} from "./view/board.js";
import {createSortTemplate} from "./view/sort.js";
import {createTasksListTemplate} from "./view/tasks-list.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskEditTemplate} from "./view/task-edit.js";
import {createLoadMoreBtnTemplate} from "./view/load-more-btn";
import {createLoadingMessageTemplate} from "./view/loading-message.js";
import {createNoTasksMessageTemplate} from "./view/no-tasks-message.js";
import {createStatisticTemplate} from "./view/statistic.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

render(siteMainControlElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createSortTemplate());
render(boardElement, createTasksListTemplate());

const tasksListElement = boardElement.querySelector(`.board__tasks`);
render(tasksListElement, createTaskEditTemplate(tasks[0]));
for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(tasksListElement, createTaskTemplate(tasks[i]));
}


if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(boardElement, createLoadMoreBtnTemplate());

  const loadMoreBtnElement = boardElement.querySelector(`.load-more`);

  loadMoreBtnElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(tasksListElement, createTaskTemplate(task)));
    renderedTaskCount += TASK_COUNT_PER_STEP;
    if (renderedTaskCount >= tasks.length) {
      loadMoreBtnElement.remove();
    }
  });
}
render(boardElement, createLoadingMessageTemplate());
render(boardElement, createNoTasksMessageTemplate());
render(siteMainElement, createStatisticTemplate());

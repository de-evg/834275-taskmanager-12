import SiteMenuView from "./view/site-menu.js";
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
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);


renderElement(siteMainControlElement, new SiteMenuView(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilterTemplate(filters));
renderTemplate(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
renderTemplate(boardElement, createSortTemplate());
renderTemplate(boardElement, createTasksListTemplate());

const tasksListElement = boardElement.querySelector(`.board__tasks`);
renderTemplate(tasksListElement, createTaskEditTemplate(tasks[0]));
for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderTemplate(tasksListElement, createTaskTemplate(tasks[i]));
}


if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  renderTemplate(boardElement, createLoadMoreBtnTemplate());

  const loadMoreBtnElement = boardElement.querySelector(`.load-more`);

  loadMoreBtnElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTemplate(tasksListElement, createTaskTemplate(task)));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreBtnElement.remove();
    }
  });
}
renderTemplate(boardElement, createLoadingMessageTemplate());
renderTemplate(boardElement, createNoTasksMessageTemplate());
renderTemplate(siteMainElement, createStatisticTemplate());

import BoardPresenter from "./presenter/board.js";

import TasksModel from "./models/tasks.js";
import FilterModel from "./models/filter.js";

import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import StatisticView from "./view/statistic.js";

import {generateTask} from "./mock/task.js";

import {RenderPosition, render} from "./utils/render.js";

const TASK_COUNT = 22;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = [
  {
    type: `all`,
    name: `all`,
    count: 0
  }
];

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel);

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters, `all`), RenderPosition.BEFOREEND);
boardPresenter.init();
render(siteMainElement, new StatisticView(), RenderPosition.BEFOREEND);

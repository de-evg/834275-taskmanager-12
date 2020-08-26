import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";

import TasksModel from "./models/tasks.js";
import FilterModel from "./models/filter.js";

import SiteMenuView from "./view/site-menu.js";
import StatisticView from "./view/statistic.js";

import {MenuItem} from "./const.js";
import {generateTask} from "./mock/task.js";

import {RenderPosition, render} from "./utils/render.js";

const TASK_COUNT = 22;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuView();

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

const handleSiteMenuCLick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      //показать доску
      //скрыть статистику
      break;
    case MenuItem.TASKS:
      //показать доску
      //скрыть статистику
      break;
    case MenuItem.STATISTIC:
      //скрыть доску
      //показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuCLick);

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
filterPresenter.init();
boardPresenter.init();

document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});

render(siteMainElement, new StatisticView(), RenderPosition.BEFOREEND);

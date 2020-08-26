import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";

import TasksModel from "./models/tasks.js";
import FilterModel from "./models/filter.js";

import SiteMenuView from "./view/site-menu.js";
import StatisticView from "./view/statistic.js";

import {MenuItem, UpdateType, FilterType} from "./const.js";
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

const handleTaskNewFormClose = () => {
  siteMenuComponent.setMenuItem(MenuItem.TASKS);
};

const handleSiteMenuCLick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      boardPresenter.createTask(handleTaskNewFormClose);
      break;
    case MenuItem.TASKS:
      boardPresenter.init();
      //скрыть статистику
      break;
    case MenuItem.STATISTIC:
      boardPresenter.destroy();
      //показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuCLick);

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
filterPresenter.init();
boardPresenter.init();

render(siteMainElement, new StatisticView(), RenderPosition.BEFOREEND);

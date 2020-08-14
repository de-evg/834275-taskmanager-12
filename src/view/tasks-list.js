import AbstractView from "./abstract.js";

class TaskListView extends AbstractView {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}

export default TaskListView;

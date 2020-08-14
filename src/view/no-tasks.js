import AbstractView from "./abstract.js";

class NoTasksMessage extends AbstractView {
  getTemplate() {
    return `<p class="board__no-tasks">
              Click «ADD NEW TASK» in menu to create your first task
            </p>`;
  }
}

export default NoTasksMessage;

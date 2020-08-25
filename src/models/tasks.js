import Observer from "../utils/observer.js";

class Tasks extends Observer {
  constructor() {
    super();
    this._tasks = [];
  }

  getTasks() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = tasks.slice();
  }

  updateTasks(id, updatedTask) {

  }
}

export default Tasks;

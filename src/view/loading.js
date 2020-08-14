import AbstractView from "./abstract.js";

class Loading extends AbstractView {
  getTemplate() {
    return `<p class="board__no-tasks">
                Loading...
            </p>`;
  }
}

export default Loading;

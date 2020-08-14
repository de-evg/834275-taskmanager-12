import AbstractView from "./abstract.js";

class Board extends AbstractView {
  getTemplate() {
    return (
      `<section class="board container"></section>`
    );
  }
}

export default Board;

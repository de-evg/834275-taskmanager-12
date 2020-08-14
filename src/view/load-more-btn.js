import AbstractView from "./abstract.js";

class LoadMoreBtn extends AbstractView {
  getTemplate() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }
}

export default LoadMoreBtn;

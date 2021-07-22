class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(action) {
    this.observers.forEach((observer) => {
      observer.update(action);
    });
  }

  addToJqueryData(element) {
    if ($) {
      $(element).data({
        instance: this,
      });
    }
  }
}

export default Observable;

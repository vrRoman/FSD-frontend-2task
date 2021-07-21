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
}

export default Observable;

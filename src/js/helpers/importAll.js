const importAll = (...requireContexts) => {
  requireContexts.forEach((context) => context.keys().forEach(context));
};

export default importAll;

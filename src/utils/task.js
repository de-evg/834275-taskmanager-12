const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};

const isTaskExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = getCurrentDate();

  return currentDate.getTime() > dueDate.getTime();
};

const isTaskExpiringToday = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = getCurrentDate();
  return currentDate.getTime() === dueDate.getTime();
};

const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

const humanizeTaskDueDate = (dueDate) => {
  if (!dueDate) {
    return ``;
  }
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};

const getWightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortTaskUp = (taskA, taskB) => {
  const weight = getWightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskA.dueDate.getTime() - taskB.dueDate.getTime();
};

const sortTaskDown = (taskA, taskB) => {
  const weight = getWightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskB.dueDate.getTime() - taskA.dueDate.getTime();
};

export {isTaskExpired, isTaskExpiringToday, isTaskRepeating, humanizeTaskDueDate, sortTaskUp, sortTaskDown};

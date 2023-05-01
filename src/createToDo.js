function toDo(title, description = "", priority = 0) {
  return {
    title,
    description,
    priority
  }
}

export default toDo;

// skipping due date for now because I don't really understand date-fns
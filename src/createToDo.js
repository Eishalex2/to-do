const CreateTask = (title, description='', priority=0) => ({
  title,
  description,
  priority
});

export default CreateTask;

// skipping due date for now because I don't really understand date-fns
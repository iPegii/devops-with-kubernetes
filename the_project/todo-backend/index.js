const express = require("express")

const app = express()
app.use(express.urlencoded({ extended: true }));

const port = 3001

const todos = [
    { id: 1, task: "Learn Kubernetes", completed: false },
    { id: 2, task: "Build awesome apps", completed: false },
    { id: 3, task: "Contribute to Open Source", completed: false }
]

app.get('/todos', async (req, res) => {
    res.json(todos)
    res.send();
  })

app.post('/todos', async (req, res) => {
    const { task } = req.body;
  console.log("Received new todo", req.body);
    const newTodo = {
        id: todos.length + 1,
        task: task,
        completed: false
    };
    todos.push(newTodo);
    console.log("Added new todo:", newTodo);
    res.status(201).json(newTodo);
})

app.listen(port, () => {
console.log(`todo-backend started in port ${port}`)
})

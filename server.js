const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const data = require('./src/data')

const app = express()
const jsonMiddleware = bodyParser.json()

app.use(morgan('tiny'))
app.use(express.static('public'))

app.get('/api/todos', (req, res) => {
  res.send(data.todos)
})

//todayDate
app.get('/api/time', (req, res) => {
  function todayDate() {
    const today = ['Sun','Mon','Tue','Wen','Thu','Fri','Sat'];
    const date = new Date();

    //오늘 날짜
    return date.toLocaleDateString() + " " + today[date.getDay()]
  }
  let date = todayDate();
  res.send(date);
})

//percent
app.get('/api/percent', (req, res) => {
  function percent() {
    let num = 0;
    data.todos.forEach(item => {
      if(item.complete == true){
        num++;
      }
    });
    return Math.floor((num/data.todos.length)*100)+"%"
  }
  let percentResult = percent();
  res.send(percentResult);
});

app.post('/api/todos', jsonMiddleware, (req, res) => {
  const {title} = req.body
  if (title) {
    const todo = data.addTodo({title})
    res.send(todo)
  } else {
    res.status(400)
    res.end()
  }
})

app.patch('/api/todos/:id', jsonMiddleware, (req, res) => {
  let id;
  try {
    id = parseInt(req.params.id)
  } catch (e) {
    res.status(400)
    res.end()
    return // 바로 라우트 핸들러를 종료합니다.
  }
  const todo = data.updateTodo(id, req.body)
  res.send(todo)
})

app.delete('/api/todos/:id', jsonMiddleware, (req, res) => {
  let id;
  try {
    id = parseInt(req.params.id)
  } catch (e) {
    res.status(400)
    res.end()
    return // 바로 라우트 핸들러를 종료합니다.
  }
  data.deleteTodo(id)
  res.end()
})

app.listen(3000, () => {
  console.log('3000번 포트로 와라.')
})

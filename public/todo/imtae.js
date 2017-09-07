function loadTodos() {
  console.log('start loadTodos')
  const checkedList = 0;
  render({
    target: '#todos',
    templatePath: '/templates/todos.ejs',
    dataPath: '/api/todos'
  }).then(todosEl => {
    todosEl.querySelectorAll('.todo-item').forEach(todoItem => {
      const id = todoItem.dataset.id
      if(todoItem.dataset.complete == true){
        checkedList++;
      }else{
        checkedList--;
      }

      // 체크박스 클릭시
      // 낙관적 업데이트
      const checkboxEl = todoItem.querySelector('.todo-checkbox')
      checkboxEl.addEventListener('click', e => {
        axios.patch(`/api/todos/${id}`, {
          complete: e.currentTarget.checked
        }).then(res => {
          loadTodos()
        })
      })
      const percent = (checkedList/todosEl.length) * 100
      // 삭제 아이콘 클릭시
      // 비관적 업데이트
      const removeLink = todoItem.querySelector('.todo-remove')
      removeLink.addEventListener('click', e => {
        axios.delete(`/api/todos/${id}`).then(res => {
          loadTodos()
        })
      })
    })
  })
}


function todoDate(limit){
  const date = new Date();
  const limitList = new Date(limit);
}

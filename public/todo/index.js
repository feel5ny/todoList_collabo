(function (window, document) {

  /**
   * 서버에서 할일 템플릿과 할일 데이터를 가져온 후, #todos 요소 안에 렌더링하는 함수
   */
  function loadTodos() {
    console.log('start loadTodos')
    render({
      target: '#uncount',
      templatePath: '/todo/templates/uncount.ejs',
      dataPath: '/api/uncount'
    });
    render({
      target: '#count',
      templatePath: '/todo/templates/count.ejs',
      dataPath: '/api/count'
    });
    render({
      target: '#todayDate',
      templatePath: '/todo/templates/todayDate.ejs',
      dataPath: '/api/time'
    });
    render({
      target: '#percent',
      templatePath: '/todo/templates/percent.ejs',
      dataPath: '/api/percent'
    });
    render({
      target: '#todos',
      templatePath: '/todo/templates/todos.ejs',
      dataPath: '/api/todos'
    }).then(todosEl => {
      todosEl.querySelectorAll('.todo-item').forEach(todoItem => {
        const id = todoItem.dataset.id

        // 체크박스 클릭시
        // 낙관적 업데이트
        const checkboxEl = todoItem.querySelector('.todo-checkbox')
        checkboxEl.addEventListener('click', e => {
          axios.patch(`/api/todos/${id}`, {
            complete: e.currentTarget.checked
          }).then(res => {
            loadTodos();
            // changeProg();
          })
        })

        // 삭제 아이콘 클릭시
        // 비관적 업데이트
        const removeLink = todoItem.querySelector('.todo-remove')
        removeLink.addEventListener('click', e => {
          axios.delete(`/api/todos/${id}`).then(res => {
            loadTodos();
            // changeProg();
          })
        })
      })
    })
  }

  document.querySelector('#todo-form').addEventListener('submit', e => {
    e.preventDefault()
    const form = e.currentTarget
    axios.post('/api/todos', {
      title: form.elements.task.value
    })
      .then(loadTodos)

      .then(() => {

        form.elements.task.value = null
      })
  })

  loadTodos();


})(window, document)

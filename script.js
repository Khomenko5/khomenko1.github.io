const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = []
let id = 100

function loadFromLocalStorage() {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    todos = JSON.parse(savedTodos)
    id = Math.max(...todos.map(todo => todo.id), 100)
    render()
    updateCounter()
  }
}

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function newTodo() {
  const text = prompt('Enter todo:')
  if (text) {
    const todo = {
      id: ++id,
      text: text,
      checked: false
    }
    todos.push(todo)
    saveToLocalStorage()
    render()
    updateCounter()
  }
}

function renderTodo(todo) {
  const textClass = todo.checked ? 'text-success text-decoration-line-through' : ''
  return `
    <li class="list-group-item" data-id="${todo.id}">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''}/>
      <label for="${todo.id}"><span class="${textClass}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end">delete</button>
    </li>
  `
}

function render() {
  const todoItems = todos.map(todo => renderTodo(todo)).join('')
  list.innerHTML = todoItems
}

function updateCounter() {
  itemCountSpan.textContent = todos.length
  const uncheckedCount = todos.filter(todo => !todo.checked).length
  uncheckedCountSpan.textContent = uncheckedCount
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  saveToLocalStorage()
  render()
  updateCounter()
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    todo.checked = !todo.checked
    saveToLocalStorage()
    render()
    updateCounter()
  }
}

document.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON' && e.target.textContent === 'delete') {
    const id = parseInt(e.target.parentElement.getAttribute('data-id'))
    deleteTodo(id)
  }

  if (e.target.type === 'checkbox') {
    const id = parseInt(e.target.id)
    checkTodo(id)
  }
})

loadFromLocalStorage()
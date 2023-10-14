const API = "https://jsonplaceholder.typicode.com/todos/";

const requestStatusEl = document.querySelector('#request-status')
const list = document.querySelector('ol');
const form = document.querySelector('form');
const counterNum = document.querySelector('.counter');
let allTodos;
let counter = 0;


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const number = +form.text.value;
    const newTodos = allTodos.slice(0, number)
    updateUI(newTodos);
    counter += number
    counterNum.textContent = `Counter : ${counter}`
})


const request = new XMLHttpRequest();

request.addEventListener("readystatechange", ()=>{
  if(request.readyState !== 4){
    requestStatusEl.textContent = 'Loading...'
  }else if(request.readyState == 4){
    const data = JSON.parse(request.responseText);
    allTodos = data;
    updateUI(allTodos);
    requestStatusEl.textContent = 'Done !'
  }
})

request.open('GET', API);
request.send();

function updateUI(todos){
  list.innerHTML = ''
  todos.forEach((todo)=>{
    const li = document.createElement('li');
    const pId = document.createElement('p');
    const pTitle = document.createElement('p');
    const pCompl = document.createElement('p');
    const btn = document.createElement('button');

    btn.textContent = 'Delete';
    btn.classList.add('btn')
    btn.addEventListener('click', ()=>{
        li.classList.add('hidden')
    })

    pId.textContent = `Id : ${todo.id}`;
    pTitle.textContent = `Title:  ${todo.title}`;
    pCompl.textContent = `Complited : ${todo.completed}`;
    li.classList.add('list-item')

    li.append(pId, pTitle, pCompl, btn);
    list.appendChild(li)
  })
}
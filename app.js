const form =document.querySelector("#task-form")

const tasklist=document.querySelector(".collection")

const clrbtn=document.querySelector(".clear-task");

const filter=document.querySelector("#filter")

input=document.querySelector("#task")

loadEventListeners();
function loadEventListeners(){
  //DOM Load Event
  document.addEventListener("DOMContentLoaded",getTasks)
  //ADD TASK
  form.addEventListener("submit",addtask)
  //Remove Task
  tasklist.addEventListener("click",removetask)
  clrbtn.addEventListener("click",clearTasks)
  //filter
  filter.addEventListener("keyup",filterTasks)
  //store in lS

}
//get Tasks from local storage
function getTasks(){
  let tasks
  if(localStorage.getItem("tasks")!=null){
    tasks=JSON.parse( localStorage.getItem("tasks"))
    tasks.forEach(function(task){
      const li=document.createElement("li")
      li.className="collection-item hoverable";
      li.appendChild(document.createTextNode(task))
      //create new link
      const link=document.createElement("a")
      link.className="delete-item secondary-content"
      link.innerHTML='<i class="fa fa-remove"></i>'
      li.appendChild(link)
      //append li to ul
      tasklist.append(li)


    })

  }

}
//AddTask
function addtask(e){
  if(input.value===""){
    alert("ADD a TASKS")
  }
  const li=document.createElement("li")
  li.className="collection-item hoverable";
  li.appendChild(document.createTextNode(input.value))
  //create new link
  const link=document.createElement("a")
  link.className="delete-item secondary-content"
  link.innerHTML='<i class="fa fa-remove"></i>'
  li.appendChild(link)
  //append li to ul
  tasklist.append(li)

  //store task in ls
  storeTaskInLocalStorage(input.value)


  input.value=""
  e.preventDefault()
}
//even delegation
function removetask(e){
  
  if(e.target.className==="fa fa-remove")
  {
    if(confirm("are u sure?"))
    {
      e.target.parentElement.parentElement.remove()
      removeTaskFromLocalStorage(e.target.parentElement.parentElement.textContent)
    }
  }

}
//remove task from ls 
function removeTaskFromLocalStorage(task){
  let tasks;
  if(localStorage.getItem("tasks")===null)
  {
    tasks=[]
  }
  else{
    tasks=JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.forEach(function(item,index){
    if(task===item){
      tasks.splice(index,1)
    }
  })

  localStorage.setItem("tasks",JSON.stringify(tasks))
}
function clearTasks(e){
  e.preventDefault()
  //tasklist.innerHTML="";
  while(tasklist.firstChild){
    tasklist.removeChild(tasklist.firstChild);
  
  }
  localStorage.clear();

}
function filterTasks(e){
  const text =e.target.value.toLowerCase();
  list=document.querySelectorAll(".collection-item")
  list.forEach(function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!=-1){
      task.style.display="block"
    }else{
      task.style.display="none";
    }
  })
}

//store in ls
function storeTaskInLocalStorage(task)
{
  let tasks;
  if(localStorage.getItem("tasks")===null)
  {
    tasks=[]
  }
  else{
    tasks=JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.push(task)
  localStorage.setItem("tasks",JSON.stringify(tasks))
}














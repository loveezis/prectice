import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";
import React, { useState } from "react";

function App(props) {
  //all,active,completed 상태관리 및 클릭했을때 동작
  const [filter, setFilter] = useState("All")
  const filterMap = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed
  }
  const filterKey = Object.keys(filterMap);
  const filterList = filterKey.map((fList) => (
    <FilterButton
        key={fList}
        name={fList}
        pressed={fList === filter}
        setFilter={setFilter}
    />
  ))
  const [tasks, setTasks] = useState(props.tasks)
  const taskList = tasks.filter(filterMap[filter]).map((task) => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      toggleCompleted={toggleCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />))

  //작업 수정 (edit)
  function editTask(newName, id) {
    const editTask = tasks.map((edit) => {
      if (id === edit.id) {
        return { ...edit, name: newName }
      }
      return edit
    })
    setTasks(editTask)
  }

  //작업갯수 갱신변수
  const taskLength = taskList.length + " tasks remaining";

  //체크박스 상태관리
  function toggleCompleted(id) {
    const toggle = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(toggle)
  }

  //작업추가 (add)
  function addTask(name) {
    const newTasks = { id: `${nanoid()}`, name }
    if (taskList.length >= 5) {
      return alert("최대 5개까지 추가가능합니다.")
    }
    else {
      setTasks([...tasks, newTasks])
    }
  }

  //삭제기능 (delete)
  function deleteTask(id) {
    const delTask = tasks.filter((del) => id !== del.id)
    setTasks(delTask)
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form
        addTask={addTask}
      />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{taskList.length > 0 ? taskLength : "목록이 비어있습니다."}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
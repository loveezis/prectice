import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import React, { useState } from "react";
import { nanoid } from "nanoid";

function App(props) {
  const [filter, setFilter] = useState("All")
  const filterMap = {
    All: () => true,
    Active: (task) => task.completed,
    Completed: (task) => !task.completed
  }
  const filterKey = Object.keys(filterMap)
  const filterList = filterKey.map((filterName) => (
    <FilterButton
      key={filterName}
      name={filterName}
      pressed={filter === filterName} //같으면 true 틀리면 false를 반환하기위한속성
      //해당 버튼을 눌렀을때 (All, Acive , Completed) true, false를 반환하면 filterMap의 객체 속성에 맞게 로직을 구성
      setFilter={setFilter} />
  ))
  const [tasks, setTasks] = useState(props.tasks);
  const taskList = tasks.filter(filterMap[filter]).map((task) => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask} />
  ))
  function editTask(id, newName) {
    const editUpdate = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task;
    })
    setTasks(editUpdate)
  }
  function deleteTask(id) {
    const delTask = tasks.filter((task) => id !== task.id)
    setTasks(delTask)
  }
  function toggleTaskCompleted(id) {
    const checkBox = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    })
    setTasks(checkBox)
  }
  function addTask(name) {
    const newTask = { id: `${nanoid()}`, name }
    if (name === "") {
      alert("제목을 입력해주세요")
    }
    else {
      if (taskList.length === 5) {
        alert("최대 5개까지 추가가능합니다")
        return;
      }
      setTasks([...tasks, newTask])
    }
  }
  const taskLength = `${taskList.length} tasks remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoList 목록</h1>
      <Form
        addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{taskList.length === 0 ? "목록이 비어있습니다" : taskLength}</h2>
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

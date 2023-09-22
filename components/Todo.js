import React, { useState, useRef } from "react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editInputValue = useRef(null);

  function handleChange(e) {
    setNewName(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (newName === "") {
      alert("수정할 내용을 입력하세요")
      editInputValue.current.focus();
      return;
    }
    props.editTask(newName, props.id)
    setEditing(false)
    setNewName("");
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          {props.name}의 새로운 이름
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editInputValue} />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          취소
          <span className="visually-hidden">{props.name} 이름 바꾸기</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          저장
          <span className="visually-hidden">{props.name}의 새로운 이름</span>
        </button>
      </div>
    </form>
  )
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleCompleted(props.id)}
        />
        <label className="todo-label" htmlFor="todo-0">
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">Eat</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}>
          Delete <span className="visually-hidden">Eat</span>
        </button>
      </div>
    </div>
  )
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
}

export default Todo;
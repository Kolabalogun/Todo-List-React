import React from 'react'

const List = ({name, id, onEdit, onDelete}) => {
  return (
    <div className="list">
    <p>{name}</p>
    <div className="btn">
      <span onClick={() => onEdit(id)}>edit</span>
      <span onClick={() => onDelete(id)} className="danger">Delete</span>
    </div>
  </div>
  )
}

export default List
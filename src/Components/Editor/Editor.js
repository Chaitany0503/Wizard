import React from 'react'
import "./Editor.scss";
import Right_Component from './Right_Component';
export default function Editor() {
  return (
    <div className='container'>
      <div className="left-Container">
        <button>My Project</button>
      </div>
      <Right_Component/>
    </div>
  )
}

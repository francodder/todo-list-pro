import React, { useState } from 'react';

export default function Issue({id, done, name, updateIssue, deleteIssue}) {

    const [editMode, setEditMode] = useState(false)

    // Marca una tarea como finalizda o pendiente
    const markAsDone = () => {
        updateIssue({
            id,
            name,
            done: !done
        })
    }

    // Permite cambiar el nombre de la issue
    const enableEditMode = (e) => {
        e.stopPropagation()
        setEditMode(true)
    }

    // Cambia el nombre de la issue
    const editName = (e) => {
        e.stopPropagation()

        if(e.type === 'keydown' && e.key !== 'Enter') {
            return 
        }
        const issueName = e.target.value.trim()

        if(issueName.length === 0) return

        updateIssue({
            id,
            name: issueName,
            done
        })
        setEditMode(false)
    }

    // Elimina una issue de la lista
    const handleDeleteIssue = (e) => {
        e.stopPropagation()
        deleteIssue(id)
    }

    return (
        <div className="issue" 
             onClick={() => markAsDone(!done) }>

            {!editMode &&
            <span className={"issue__name " + 
                            (done ? "issue__name--done" : "")}>
                {name}
            </span>}

            {editMode &&
            <input type="text" 
                   className="issue__input" 
                   defaultValue={name} 
                   autoFocus
                   onKeyDown={editName}
                   onBlur={editName}/>
            }

            <div className="issue__actions-box">
                {!editMode && 
                <span className="issue__icon-button issue__icon-button--edit"
                      onClick={enableEditMode}>
                    <i className="fa fa-pen"></i>
                </span>}
                <span className="issue__icon-button issue__icon-button--delete"
                      onClick={handleDeleteIssue}>
                    <i className="fa fa-trash"></i>
                </span>
            </div>
        </div>
    )
}

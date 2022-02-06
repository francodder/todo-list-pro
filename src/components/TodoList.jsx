
import {useState, useEffect, useReducer} from 'react'
import { issuesReducer } from '../reducers/issuesReducer'

import Issue from './Issue'

export default function TodoList({id, name, issuesList, updateList, deleteList}) {

    const [editMode, setEditMode] = useState(false) 
    const [addMode, setAddMode] = useState(false) 

    const [issues, dispatch] = useReducer(issuesReducer, issuesList)

    // Actualiza las issues del listado
    useEffect(() => {
        updateList({
            id,
            name,
            issues
        })
    }, [issues])


    // Elimina la lista del dashboard
    const removeList = () => {   
        deleteList(id)
    }

    // Modifica el nombre de la lista
    const editName = (e) => {
        if(e.type === 'keydown' && e.key !== 'Enter') {
            return 
        }
        const listName = e.target.value.trim()

        if(listName.length === 0) return
        
        updateList({
            id,
            name: listName,
            issues: issuesList
        })
        setEditMode(false)
    }

    // Añade una issue a la lista
    const addIssue = (e) => {
        if(e.type === 'keydown' && e.key !== 'Enter') {
            return 
        }

        const issueName = e.target.value.trim()

        if(issueName.length > 0) {
            dispatch({
                type: 'add',
                payload: {
                    id: Date.now(),
                    name: issueName,
                    done: false
                }
            })
            setAddMode(false)
        } 
        else if(e.type === 'blur') {
            setAddMode(false)
        }
    }

    // Ejecuta el reducer que actualiza una issue
    const updateIssue = (issue) => {
        dispatch({
            type: 'update',
            payload: issue
        })
    }

    // Ejecuta el reducer que elimina una issue
    const deleteIssue = (issueId) => {
        dispatch({
            type: 'delete',
            payload: issueId
        })
    }

    return (
        <div className="todo-list">

            <div className="todo-list__header">
                
                {!editMode && 
                <span className="todo-list__name"
                      onClick={() => setEditMode(true)}>
                    {name}
                </span>}

                {editMode && 
                <input className="todo-list__name-input"
                       type="text"
                       defaultValue={name} // De esta manera el valor no es persistente
                       onBlur={editName}
                       onKeyDown={editName}
                       autoFocus>
                    </input>}

                <span className="todo-list__delete"
                      onClick={ removeList }>
                    <i className="fa fa-trash"></i>
                </span>

            </div>

            <div className="todo-list__body">

                {issues.map(issue => {
                    const {id, name, done} = issue
                    return <Issue key={id} 
                                  id={id}
                                  name={name} 
                                  done={done} 
                                  updateIssue={updateIssue}
                                  deleteIssue={deleteIssue} />
                })}
                
                {!addMode && 
                <div className="add-issue"
                     onClick={() => setAddMode(true)}>
                    <i className="add-issue__icon fa fa-plus"></i>
                    <span className="add-issue__label">Añadir nuevo item</span>
                </div>}

                {addMode &&
                    <input type="text" 
                           className="add-input" 
                           placeholder="Escriba algo..."
                           onBlur={addIssue}
                           onKeyDown={addIssue}
                           autoFocus
                           />
                }

            </div>
        </div>
    )
}

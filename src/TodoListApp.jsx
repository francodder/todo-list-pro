import {useState, useEffect, useReducer} from 'react'
import TodoList from './components/TodoList'
import {loadData, saveData} from './helpers/storage'
import { listsReducer } from './reducers/listsReducer'

// Carga la información al iniciar la app
const init = () => {
    return loadData('lists')
}

export default function TodoListApp({defaultLists = []}) {

    const [lists, dispatch] = useReducer(listsReducer, [], init)

    const [addMode, setAddMode] = useState(false)

    // Guarda la información en cada cambio
    useEffect(() => {
        saveData('lists', lists)
    }, [lists])

    // Añade nuevas listas al dashboard
    const addList = (e) => {

        if(e.type === 'keydown' && e.key !== 'Enter') {
            return 
        }

        const listName = e.target.value.trim()
        setAddMode(false)

        if(listName.length === 0) return

        dispatch({
            type: 'add',
            payload: {
                id: Date.now(),
                name: listName,
                issues: []
            }
        })
    }

    // Acualiza el nombre o las issues de una lista
    const updateList = (list) => {
        dispatch({
            type: 'update',
            payload : list
        })
    }

    // Elimina una lista del dashboard
    const deleteList = (listId) => {

        dispatch({
            type: 'delete',
            payload: listId
        })
    }



    return (
        <div className="app-container dashboard">
            
            { lists.map(list => {
                return <TodoList key = {list.id} 
                                 id = {list.id} 
                                 name = {list.name} 
                                 issuesList = {list.issues}
                                 updateList = {updateList} 
                                 deleteList = {deleteList} /> 
                }) 
            }

            { !addMode && 
                <div className="add-list"
                    onClick={ () => setAddMode(true) }>
                    <button className="add-list__button">
                        <i className="fa fa-plus"></i>
                    </button>
                    <span className="add-list__label">
                        Nueva lista
                    </span>
                </div>
            }

            { addMode && 
                <div className="todo-list">
                    <div className="todo-list__header">
                        <input type="text" 
                               className='todo-list__name-input'
                               id="add-list-input"
                               placeholder='Escriba un título'
                               onBlur={addList}
                               onKeyDown={addList}
                               autoFocus/>
                    </div>  
                </div>
            }

        </div>
    )
}

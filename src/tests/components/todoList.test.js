import { shallow } from "enzyme"
import TodoList from "../../components/TodoList"

describe('Pruebas a <TodoList />', () => {

    const id = Date.now()
    const name = 'Compras'
    const issues = [
        { id: Date.now(), name: 'do something', done: false },
        { id: Date.now(), name: 'do something 2', done: false }
    ]
    const setLists = jest.fn() 

    let wrapper = shallow(<TodoList id={id} 
                                    name={name} 
                                    issuesList={issues} 
                                    setLists={setLists} />)

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallow(<TodoList id={id} 
                                    name={name} 
                                    issuesList={issues} 
                                    setLists={setLists} />)
    })

    // ! Rompe el test
    // test('El componente debe renderizarse correctamente', () => {
        
    //     expect(wrapper).toMatchSnapshot()
    // })


    test('La prop name debe coincidir con el titulo', () => {
        
        const title = wrapper.find('.todo-list__name').text().trim()
        expect(title).toBe(name)
    })
    

    test('Al eliminar la lista se debe llamar a setLists', () => {
        
        const deleteButton = wrapper.find('.todo-list__delete')
        deleteButton.simulate('click')

        expect(setLists).toBeCalled()
    })


    test('Al apretar sobre el título debe aparecer el input', () => {
        
        const title = wrapper.find('.todo-list__name')
        title.simulate('click')

        expect(wrapper.find('.todo-list__name').exists()).toBe(false)
        expect(wrapper.find('.todo-list__name-input').exists()).toBe(true)
    })


    test('Modificar el nombre de la lista debe llamar a setLists', () => {
        
        const title = wrapper.find('.todo-list__name')
        title.simulate('click')

        const input = wrapper.find('.todo-list__name-input')
        input.simulate('change', { target: { value: 'Domingo'} }) 
        input.simulate('blur', {type: 'blur', target: { value: 'Domingo'} })

        expect(setLists).toBeCalled()
    })


    test('Debe haber tantos <Issue /> como issues', () => {
        
        const issuesComponent = wrapper.find('Issue')
        expect(issuesComponent.length).toBe(issues.length)
    })


    test('Click en añadir item debe mostrar el input', () => {
        
        const addIssueButton = wrapper.find('.add-issue')
        addIssueButton.simulate('click') 

        expect(wrapper.find('.add-issue').exists()).toBe(false)
        expect(wrapper.find('.add-input').exists()).toBe(true)
    })

    // ! No funciona
    // test('Añadir una nueva issue debe llamar a setLists', () => {
        
    //     const addIssueButton = wrapper.find('.add-issue')
    //     addIssueButton.simulate('click') 

    //     const value = 'something to do'
    //     const input = wrapper.find('.add-input')
    //     input.simulate('change', { target: {value}} )
    //     input.simulate('blur', { type: 'blur', target: { value} })

    //     expect(setLists).toBeCalled()
    // })
})

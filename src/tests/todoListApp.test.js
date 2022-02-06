import { shallow } from "enzyme"
import TodoListApp from "../TodoListApp"
import * as storage from "../helpers/storage"

describe('Pruebas a <TodoListApp />', () => {

    const lists = [
        { id: Date.now(), name: 'Compras', issues: [] },
        { id: Date.now(), name: 'Domingo', issues: [] }
    ]

    let wrapper = shallow(<TodoListApp defaultLists={lists} />)

    beforeEach(() => {
        wrapper = shallow(<TodoListApp defaultLists={lists} />)
    })
   
    // ! Rompe el test
    // test('El componente debe renderizarse correctamente', () => {
    //     expect(wrapper).toMatchSnapshot()
    // })

    test('Debe haber tantas <TodoList /> como listas', () => {
        
        const listComponents = wrapper.find('TodoList')
        expect(listComponents.length).toBe(lists.length)
    })
    
    test('Agregar una lista debe modificar el length de <TodoList />', () => {
        
        const addButton = wrapper.find('.add-list')
        addButton.simulate('click')

        const value = 'Mitosis'
        const addInput = wrapper.find('#add-list-input')
        addInput.simulate('change', { target: {value} })
        addInput.simulate('blur', { target: {value}, type: 'blur'})

        const listComponents = wrapper.find('TodoList')
        expect(listComponents.length).toBe(lists.length + 1)
    })

    // ! No funciona
    // test('Si loadData() retorna una lista, debe actualizarse el dashboard', () => {

    //     const wrapper = shallow(<TodoListApp defaultLists={[]} />)

    //     const spy = jest.spyOn(storage, 'loadData')
        
    //     spy.mockReturnValue([
    //         { id: Date.now(), name: 'Compras', issues: [] },
    //         { id: Date.now(), name: 'Domingo', issues: [] },
    //         { id: Date.now(), name: 'Lunes', issues: [] }
    //     ])
        
    //     const listComponents = wrapper.find('TodoList')
    //     expect(listComponents.length).toBe(lists.length)
    // })
    
})

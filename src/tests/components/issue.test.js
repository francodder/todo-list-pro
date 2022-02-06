import { shallow } from "enzyme"
import Issue from "../../components/Issue"

describe('Pruebas a <Issue />', () => {
    
    const id = Date.now()
    const name = 'Sacar basura'
    const done = false
    const setIssues = jest.fn()

    let wrapper = shallow(<Issue id={id} name={name} done={done} setIssues={setIssues} />)

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallow(<Issue id={id} name={name} done={done} setIssues={setIssues} />)
    })
    

    test('El componente debe mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot()
    })
    

    test('El texto de la issue debe coincidir con el prop', () => {

        const issueName = wrapper.find('.issue__name').text().trim()
        expect(issueName).toBe(name)
    })


    test('Cuando done = true debe aplicar la clase --done', () => {
        
        const wrapper = shallow(<Issue id={id} name={name} done={true} setIssues={setIssues}/>)
        const className = wrapper.find('.issue__name').prop('className')
        expect(className.includes('--done')).toBeTruthy()
    })
    
    
    test('Cuando done = false no debe aplicar la clase --done', () => {  

        const className = wrapper.find('.issue__name').prop('className')
        expect(className.includes('--done')).toBeFalsy()
    })


    test('Cuando hacemos click editar debe aparecer el input y desaparecer span', () => {

        const editButton = wrapper.find('.issue__icon-button--edit')
        editButton.simulate('click', { stopPropagation(){}})

        expect(wrapper.find('.issue__input').exists()).toBe(true)
        expect(wrapper.find('.issue__name').exists()).toBe(false)
    })


    test('Eliminar la issue debe llamar a setIssues una vez', () => {

        const deleteButton = wrapper.find('.issue__icon-button--delete')
        deleteButton.simulate('click', { stopPropagation(){}})

        expect(setIssues).toBeCalled()
    })


    test('Modificar la issue debe llamar a setIssues una vez', () => {

        const editButton = wrapper.find('.issue__icon-button--edit')
        editButton.simulate('click', { stopPropagation(){}})

        const input = wrapper.find('.issue__input')
        const value = 'Amasar la masa'
        input.simulate('change', { target: {value} })
        input.simulate('blur', { stopPropagation(){}, target: {value} })
        
        expect(setIssues).toBeCalled()
    })

    
})

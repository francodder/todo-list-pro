// Guarda una cookie con toda la información deseada
export function saveData(itemName, data = []) {
    localStorage.setItem(itemName, JSON.stringify(data))
}

// Carga la info almacenada en una cookie si existe
export function loadData(itemName) {

    let data = []

    if(localStorage.getItem(itemName)) {
        const stringData = localStorage.getItem(itemName)
        data = JSON.parse(stringData)
    }

    return data
}
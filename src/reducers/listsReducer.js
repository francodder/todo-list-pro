export const listsReducer = (lists = [], action) => {

    switch (action.type) {

        case 'add': 
            return [...lists, action.payload]

        case 'update':
            return lists.map(list => (
                list.id === action.payload.id
                ? list = action.payload
                : list
            ))

        case 'delete':
            return lists.filter(list => list.id !== action.payload)
    } 
}
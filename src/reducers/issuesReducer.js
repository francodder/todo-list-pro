export const issuesReducer = (issues = [], action) => {

    switch (action.type) {

        case 'add': 
            return [...issues, action.payload]

        case 'update':
            return issues.map(issue => (
                issue.id === action.payload.id
                ? issue = action.payload
                : issue
            ))

        case 'delete':
            return issues.filter(issue => issue.id !== action.payload)
    } 
}
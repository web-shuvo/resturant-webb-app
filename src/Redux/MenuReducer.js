
let Data = {
    data: null,
    Name: '',
    Message: '',
    select: '1'

}

let MenuReducer = (state = Data, Action) => {
    if (Action.type === 'MENU_COMMENT') {
        const newDataArr = [];
        for (let objData in Action.value) {
            newDataArr.push(Action.value[objData])
        }
        return {
            ...state,
            data: newDataArr,
        }
    } else if (Action.type === 'COMM_FORM_DATA') {
        return {
            ...state,
            [Action.name]: Action.value
        }
    } else if (Action.type === 'ADD_COMMENTS') {
        let addComment = Action.newVal;

        return {
            ...state,
            data: state.data.concat(addComment),
            Name: '',
            Message: '',
            select: '1'
        }
    }
    return state;
}

export default MenuReducer;
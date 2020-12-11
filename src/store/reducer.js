const initialState = {
    items: []
}

const reducer = (state = initialState, action) => {
    if (action && action.type === 'SET_ITEMS' && action.value) {
        return {
            ...state,
            items: action.value
        }
    }

    if (action && action.type === 'ADD_ITEM' && action.value) {
        return {
            ...state,
            items: [
                ...state.items,
                action.value
            ]
        }
    }

    if (action && action.type === 'REMOVE_ITEM' && action.index > -1) {
        if (state.items.length == 1) {
            return {items: []}
        } else {
            state
                .items
                .splice(action.index, 1);
            return {
                ...state,
                items: [...state.items]
            }
        }
    }

    return {
        ...state
    }
};

export default reducer;
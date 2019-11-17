import produce from 'immer';

export default function cart(state = [], action) {
    switch (action.type) {
        case 'ADD_TO_CART_SUCCESS':
            return produce(state, draft => {
                const { item } = action;
                draft.push(item);
            });
        case 'DELETE_TO_CART':
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);
                draft.splice(productIndex, 1);
            });
        case 'UPDATE_AMOUNT_SUCCESS': {
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);
                draft[productIndex].amount = Number(action.amount);
            });
        }
        default:
            return state;
    }
}

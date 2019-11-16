import produce from 'immer';

export default function cart(state = [], action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return produce(state, draft => {
                const productIndex = draft.findIndex(
                    p => p.id === action.item.id
                );
                if (productIndex >= 0) {
                    draft[productIndex].amount += 1;
                } else {
                    draft.push({
                        ...action.item,
                        amount: 1,
                    });
                }
            });
        case 'DELETE_TO_CART':
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);
                draft.splice(productIndex, 1);
            });
        case 'UPDATE_AMOUNT': {
            if (action.amount <= 0) {
                return state;
            }
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);
                draft[productIndex].amount = Number(action.amount);
            });
        }
        default:
            return state;
    }
}

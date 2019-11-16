export function addToCart(item) {
    return {
        type: 'ADD_TO_CART',
        item,
    };
}
export function removeFromCart(id) {
    return {
        type: 'DELETE_TO_CART',
        id,
    };
}
export function updateAmount(id, amount) {
    return {
        type: 'UPDATE_AMOUNT',
        id,
        amount,
    };
}

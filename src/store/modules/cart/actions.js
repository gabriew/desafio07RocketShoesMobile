export function addToCartRequest(id) {
    return {
        type: 'ADD_TO_CART_REQUEST',
        id,
    };
}
export function addToCartSuccess(item) {
    return {
        type: 'ADD_TO_CART_SUCCESS',
        item,
    };
}
export function removeFromCart(id) {
    return {
        type: 'DELETE_TO_CART',
        id,
    };
}
export function updateAmountRequest(id, amount) {
    return {
        type: 'UPDATE_AMOUNT_REQUEST',
        id,
        amount,
    };
}
export function updateAmountSuccess(id, amount) {
    return {
        type: 'UPDATE_AMOUNT_SUCCESS',
        id,
        amount,
    };
}

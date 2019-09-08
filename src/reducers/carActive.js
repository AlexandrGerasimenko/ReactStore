export default function (state = null, action) {
    switch (action.type) {
        case "CAR-SELECTED":
            return action.payload
            break;
    
        default:
            return state;
    }
}
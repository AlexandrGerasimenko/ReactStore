// export default function (state = [1,2], action) {
//     switch (action.type) {
//         case "ADD-BASKET":
//             return action.payload
//             break;
    
//         default:
//             return state;
//     }
// }

import {Provider, connect}   from 'react-redux';
import {createStore, combineReducers} from 'redux';

let store = createStore((state, action) => { //единственный редьюсер данного хранилища
    if (state === undefined){ //redux запускает редьюсер хотя бы раз, что бы инициализировать хранилище
        return {counter: 0};  //обязательно вернуть новый объект, а не изменить текущий state
    }
    if (action.type === 'COUNTER_INC'){ //в каждом action должен быть type
        return {counter: state.counter +1} //создаем новый объект базируясь на данных из предыдущего состояния
    }
    if (action.type === 'COUNTER_DEC'){
        return {counter: state.counter -1}
    }
    return state; //редьюсеров может быть несколько, в таком случае вызываются все редьюсеры, но далеко не всегда action.type будет относится к этому редьюсеру. Тогда редьюсер должен вернуть state как есть. 
})

// store.subscribe(()=> console.log(store.getState()))
 // подписка на обновления store

store.dispatch({
    type: 'COUNTER_INC'
})

store.dispatch({
    type: 'COUNTER_DEC'
})

export default store
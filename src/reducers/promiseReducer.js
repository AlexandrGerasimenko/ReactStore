import {GraphQLClient} from 'graphql-request'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '.';


 function PromiseReducer(state, action) {
    if (!state)
        return {}

    if (action.type === 'PROMISE') {
        // if (action.name === 'login' && action.status === 'RESOLVED') {
        //     localStorage.authToken = action.payload.login
        //     gql = new GraphQLClient("/graphql", { headers: { Authorization: 'Bearer' + localStorage.authToken } })
        //}
        return {
            ...state,
            [action.name]: {
                status: action.status,
                payload: action.payload,
                error: action.error
            }
        }
    }
    return state;
}







export default PromiseReducer
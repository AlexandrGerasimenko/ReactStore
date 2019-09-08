import React from 'react'
import part from '../part.jpg'
import Logo from '../logo.js';
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import store from '../reducers/index'
import { GraphQLClient } from 'graphql-request'
import { Provider, connect } from 'react-redux';
const gql = new GraphQLClient("/graphql", {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI1ZDM4OWEwN2FjZjA5ZjJkY2M2MzE3ZmIiLCJsb2dpbiI6IkFsZXgifSwiaWF0IjoxNTY0MDAyMjI2fQ.dIarWzVkpRod_z0QexRRHq8SaTGzOl_EIHWjW54ZD-M'
    }
})


function promiseActionsMaker(name, promise) {
    const actionPending = () => ({
        type: 'PROMISE',
        name,
        status: 'PENDING',
        payload: null,
        error: null
    })
    const actionResolved = payload => ({
        type: 'PROMISE',
        name,
        status: 'RESOLVED',
        payload,
        error: null
    })
    const actionRejected = error => ({
        type: 'PROMISE',
        name,
        status: 'REJECTED',
        payload: null,
        error
    })

    function actionPromiseThunk() {
        return async dispatch => {
            dispatch(actionPending())
            let data = await promise.catch(e => dispatch(actionRejected(e)))
            dispatch(actionResolved(data))
        }
    }
    return actionPromiseThunk;
}

let graphqlAllGoods =  (n,d,i,p) => promiseActionsMaker(
    'allGoods',
    gql.request(
        `query g{
            goods{
              
                _id, name, description,imgUrls,price
              
            }
          }`, {good :{
            "name": n,
            "description": d,
            "imgUrls" : i,
            "price": p
        }}))();

        store.dispatch(graphqlAllGoods())
class Search extends React.Component {
    // export default  Header = props => 

    constructor(props) {
        super(props)
        // this.state = {
        //     name: ''
        // }
        // this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        let p = this.props
        console.log(p && p.props);
    }

    handleChange(e) {
        this.setState({ name: e.target.value })    
      }


    render() {
        let p = this.props
        return (
            <div class = "add">
                <input></input>
                <button >search</button>
                {console.log(p.allGoods && p.allGoods.map(g => g.name))}
                <select name="city">
                                        <option value="Choose city">Выбирете товар</option>
                                        
                                        {p.allGoods && p.allGoods.map(g => <option value= {g.name}>{g.name}</option>)}
                                        
                                    </select>
            </div>
        )
    }
}

Search= connect(st => ({allGoods: st.promiseReducer.allGoods && st.promiseReducer.allGoods.payload && st.promiseReducer.allGoods.payload.goods }), {getGoods: graphqlAllGoods})(Search)
export default Search
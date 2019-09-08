import React, { useState } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers/index';
import {Link} from 'react-router-dom';
import store from '../reducers/index'
import { GraphQLClient } from 'graphql-request'

const gql = new GraphQLClient("/graphql", { headers: {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI1ZDM4OWEwN2FjZjA5ZjJkY2M2MzE3ZmIiLCJsb2dpbiI6IkFsZXgifSwiaWF0IjoxNTY0MDAyMjI2fQ.dIarWzVkpRod_z0QexRRHq8SaTGzOl_EIHWjW54ZD-M'
} })
function promiseActionsMaker(name, promise){
  const actionPending     = () => ({ type: 'PROMISE', 
                                      name, 
                                      status: 'PENDING', 
                                      payload: null, 
                                      error: null })
  const actionResolved    = payload => ({ type: 'PROMISE', 
                                          name, 
                                          status: 'RESOLVED', 
                                          payload, 
                                          error: null })
  const actionRejected    = error => ({ type: 'PROMISE', 
                                        name,  
                                        status: 'REJECTED', 
                                        payload: null, 
                                        error })

  function actionPromiseThunk(){
      return async dispatch => {
          dispatch(actionPending())
          let data = await promise.catch(e => dispatch(actionRejected(e)))
          dispatch(actionResolved(data))
      }
  } 
  return actionPromiseThunk;
}
let graphqlCategoryThunk = _id =>  promiseActionsMaker(
  'category',
  gql.request(
      `query oneCat($_id: ID!){
          category(_id: $_id){
            name,
            _id,
                goods{
              _id, name, description, price, imgUrls
            }
          }
        }`,{_id}))();

// let total = this.calculateTotal(this.state)
// console.log(this.state);
let CategoryPost = ({post:{_id,name}}) => 

<div className = 'good-cart'>
  
<div>
  {console.log(99)}
    {/* <h1 ><a style = {{color: "red"}}>{name}</a></h1> */}
    <h1  ><Link
    onClick = {() =>{
      store.dispatch(graphqlCategoryThunk(_id)
      );
      console.log(_id)
      
    
    }}
    to={`/category/${_id}`} style = {{color: "red" 
  }}
  
  >{name}</Link></h1>
 
</div>
<div>

</div>

</div>

let CategoryPostFeed = (p) => 
 
  <div className = 'category-2'>
      {console.log("30 " + p)}
    {p.cats && p.cats.map (post => <CategoryPost post = {post}/>)}
    {console.log("32 " + p.promiseReducer)}
  </div>

let mapStateToProps = st => ({cats: 
    st.promiseReducer.categories &&
    st.promiseReducer.categories.payload &&
    st.promiseReducer.categories.payload.categories})

let Category = connect(mapStateToProps)(CategoryPostFeed)

export default Category
import React, { useState } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers/index';
import { Link } from 'react-router-dom'
import { GraphQLClient } from 'graphql-request'

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

let graphqlAddRemoveFromBasket = (i) => promiseActionsMaker(
  'setOrderGood',
  gql.request(
    `mutation sOG($orderGood:OrderGoodInput!){
          setOrderGood(orderGood:$orderGood){
                _id,
                good{
              _id, name, price
            },
                price,
                order{
              _id
            }
            }
        }`, {
      orderGood: {
        "good": i,
        "order": "5d3f1a069926370948553df9",
        "count": 0
      }
    }))();


let graphqlAddGoodToBasket = (i) => promiseActionsMaker(
  'setOrderGood',
  gql.request(
    `mutation sOG($orderGood:OrderGoodInput!){
          setOrderGood(orderGood:$orderGood){
                _id,
                good{
              _id, name, price
            },
                price,
                order{
              _id
            }
            }
        }`, {
      orderGood: {
        "good": i,
        "order": "5d3f1a069926370948553df9",
        "count": 1
      }
    }))();


let GoodPostFeed = (p) =>

  <div className='good-2'>
    {console.log("320 " + p)}
    <img src={p.good && p.good.imgUrls[0]} />

    <div style={{ color: "blue" }}>
      <h2>
        {p.good && p.good.name}
      </h2>
    </div>
    {/* <img src = { p.good.imgUrls}/> */}

    <div style={{ color: "blue" }}>{p.good && p.good.description}</div>
    <div style={{ color: "blue" }}>
      <h3>
        Цена: {p.good && p.good.price}
      </h3>
    </div>

    {console.log("321 " + p)}
    <button onClick={() => { graphqlAddGoodToBasket(p.good && p.good._id) }}>Добавить в корзину</button>
  </div>


let mapStateToProps = st => ({
  good:
    st.promiseReducer.good &&
    st.promiseReducer.good.payload &&
    st.promiseReducer.good.payload.good.name &&
    st.promiseReducer.good.payload.good
})

let Good = connect(mapStateToProps)(GoodPostFeed)

export default Good
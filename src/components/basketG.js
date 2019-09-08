import React, { useState } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers/index';
import { Link } from 'react-router-dom'
import basket from '../reducers/basket';
import { GraphQLClient } from 'graphql-request'
import store from '../reducers/index'

// let total = this.calculateTotal(this.state)
// console.log(this.state);

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

let graphqlChangeAmountBasket = (g, c) => promiseActionsMaker(
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
                "good": g,
                "order": "5d3f1a069926370948553df9",
                "count": c
            }
        }))();

        let graphqlOrdersThunk = _id => promiseActionsMaker(
            'myOrders',
            gql.request(
                `query mO{
                    myOrders{
                      _id,
                      orderGoods{
                        _id,
                              price,
                        count
                        good{
                          name, price,imgUrls,_id
                        }
                      }
                    }
                  }`,{_id}))();


                  let graphqlCategoriesThunk1 = promiseActionsMaker(
                    'categories',
                    gql.request(
                        `query cat{
                            categories{
                                _id, name
                            }
                        }`
                    )
                )


                  

let OrdersPost = ({ post: { _id, name, orderGoods, count } }) =>

    <div className='order-cart'>

        <div>

            {/* <h1 ><a style = {{color: "red"}}>{name}</a></h1> */}
            <h1>

                {orderGoods.map(order => {
                    {
                        if (order.count > 0) {
                            return (
                                <div className="basket-good" style={{}}>
                                    <button onClick={() => {store.dispatch(graphqlAddRemoveFromBasket(order.good._id));
                                    // store.dispatch(graphqlOrdersThunk())
                                    }
                                    } >Удалить</button>


<button onClick={() => {store.dispatch(graphqlAddRemoveFromBasket(order.good._id));
                                    // store.dispatch(graphqlOrdersThunk())
                                    }
                                    } >Удалить</button>
                                    {/* <Link to={`/good/${order.good._id}`} style={{ color: "red" }}> */}
                                        <img src={order.good.imgUrls} />
                                    {/* </Link> */}
                                    <div className="basket-good-name">{order.good.name}</div>
                                    <div className="basket-good-price">Цена : {order.good.price} $<div />
                                    </div>
                                    <div className="basket-good-count">Количество : {order.count} шт <input type='number' min='1' value={order.count} onChange={(e) => graphqlChangeAmountBasket(order.good._id, +e.target.value)} /></div>
                                    <div className="basket-good-su,m">Сумма :
                                    {order.count * order.good.price}
                                    </div>
                                </div>)
                        }
                        else {
                            return (null)
                        }
                    }
                }
                )
                }

            </h1>

        </div>
    </div>

let OrdersPostFeed = (p) =>

    <div className='orders'>
        {console.log("33 " + p.cats && p.cats)}
        {p.cats && p.cats.map(post => <OrdersPost post={post} />)}
        {console.log(p.cats && p.cats.map(post =>
            post.orderGoods
                .reduce(function (sum, current) {

                    // debugger;
                    return sum + current.count * current.price;
                }, 0)))}
        {/* {p.cats && p.cats.map(post => 
        post.orderGoods
            .reduce(function (sum, current) {
                // debugger;
                console.log(current);
                return sum + current.count * current.price;
            }, 0))} */}
        {/* // .map(good => good.price *good.count).reduce(function (sum, current) { */}



        <div className="total-price">Итого:  {p.cats && p.cats.map(post =>
            post.orderGoods
                .reduce(function (sum, current) {
                    // debugger;
                    return sum + current.count * current.price;
                }, 0))}$</div>
    </div>

let mapStateToProps = st => ({
    cats:
        st.promiseReducer.myOrders &&
        st.promiseReducer.myOrders.payload &&
        st.promiseReducer.myOrders.payload.myOrders
})

let Orders = connect(mapStateToProps)(OrdersPostFeed)

export default Orders
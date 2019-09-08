import React, { useState } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers/index';

// let total = this.calculateTotal(this.state)
// console.log(this.state);
let Post = ({post:{id,brand, car,img,speed}}) => 
<div className = 'good-cart'>
<div>
    <img src = {img}/>
  <a href = {`/post/${id}`}>{id}:{car} Speed : {speed}</a>
 
</div>
<div>

</div>

</div>

let PostFeed = (p) => 
 
  <div className = 'basket-2'>
    {p.basket.map (post => <Post post = {post}/>)}
    {console.log(p.basket)}
  </div>

let mapStateToProps = st => ({basket: st.basket})

let Basket2 = connect(mapStateToProps)(PostFeed)

export default Basket2
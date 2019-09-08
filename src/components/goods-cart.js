import React, { useState } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers/index';
import {selectGood} from '../actions/basket'


let Post = ({post:{id,brand, car,img,speed}}) => 
<div className = 'good-cart'>
<div>
    <img src = {img}/>
  <a href = {`/post/${id}`}>{id}:{car} Speed : {speed}</a>
  <button onClick = {() => {
    // console.log(store.getState())
    ;selectGood()}}  >Добавить в корзину</button>
</div>
<div>

</div>

</div>

let PostFeed = (p) => 
 
  <div className = 'good-carts'>
    {p.posts.map (post => <Post post = {post}/>)}
  </div>

let mapStateToProps = st => ({posts: st.cars})

let Result = connect(mapStateToProps)(PostFeed)

export default Result
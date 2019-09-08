import React, { useState } from 'react';
import { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers/index';
import { bindActionCreators } from 'redux';
import { select } from '../actions/index'

// let total = this.calculateTotal(this.state)
// console.log(this.state);
let Post = ({ post: { id, brand, car, img, speed } }) =>
    <div className='good-cart'>
        <div>
            <img src={img} />
            <a href={`/post/${id}`}>{id}:{car} Speed : {speed}</a>

        </div>
        <div>

        </div>

    </div>

// let PostFeed = (p) => 

//   <div className = 'basket-2'>
//     {p.basket.map (post => <Post post = {post}/>)}
//     {console.log(p.basket)}
//   </div>

const Position = ({ position: { good, amount }, onChange, onDelete }) =>
    <div className='basket-good'>
        <img src={good.img} />
        <span><h2>{good.brand}</h2></span>
        <span>Price :{good.price}</span>
        <input type='number' min='1' value={amount} onChange={(e) => onChange(+e.target.value)} />
        <button onClick={onDelete}>X</button>

    </div>

// class Basket3 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             list: [
//                 { good: 'car()[0]', amount: 1 },
//                 { good: 'car()[1]', amount: 2 },
//             ],
//         }

//         this.state.total = this.calculateTotal(this.state)
//     }


//     deleteItem(index) {
//         return this.state.list.filter((item, i) => i !== index)
//     }
//     calculateTotal(st) {
//         var result = st.list.reduce(function (sum, current) {
//             // debugger;
//             return sum + current.amount * current.good.price;
//         }, 0);
//         console.log(this.state)
//         return result
//     }

//     changeAmount(index, amount) {
//         // debugger;
//         return this.state.list.map((item, i) => i == index ? { ...item, amount } : item)
//     }


//     render() {
//         console.log(this.state);
//         // this.calculateTotal()

//         return (
//             <>
//                 {this.state.list.map((position, i) => <Position position={position}

//                     onDelete={() => {
//                         this.setState({ list: this.deleteItem(i) })
//                         this.setState((st) => ({ total: this.calculateTotal(st) }))
//                     }
//                     }
//                     onChange={(amount) => {
//                         this.setState({ list: this.changeAmount(i, amount) })
//                         this.setState((st) => ({ total: this.calculateTotal(st) }))

//                     }}
//                 />)}
//                 <div> Total:{this.state.total} </div>

//             </>
//         )
//     }
// }

class Basket3 extends Component {
    deleteItem(index) {
        // return this.state.list.filter((item, i) => i !== index)
        // console.log(store.basket);
    }
    calculateTotal(st) {
        var result = st.list.reduce(function (sum, current) {
            // debugger;
            return sum + current.amount * current.good.price;
        }, 0);
        console.log(result);
        return result
    }

    changeAmount(index, amount) {
        // debugger;
        return this.props.basket.map((item, i) => i == index ? { ...item, amount } : item)
    }


    showList() {
        return this.props.basket.map(good =>
            <div className='basket-good'>
                <img src={good.img} />
                <span><h2>{good.brand}</h2></span>
                <span>Price :{good.price}</span>
                <input type='number' min='1' value={good.amount} onChange={(e) => this.changeAmount(+e.target.value)} />
                <button onClick={this.deleteItem}>X</button>

            </div>
        )
    }

    render() {
        return (
            <div>
                <ol>
                    {this.showList()}
                </ol>
                <div>
                    Total : {}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        basket: state.basket
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ select: select }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Basket3);
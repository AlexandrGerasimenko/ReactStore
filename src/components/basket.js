import React,{Component} from 'react';
import createHistory from "history/createBrowserHistory";
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import car from '../reducers/car'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {select} from '../actions/index'
import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from '../reducers/index';
import thunk from 'redux-thunk';
const history = createHistory()






//     let BasketGood = ({list:{id, car,img,speed}}) => 
//     <div className = 'good-cart'>
//     <div>
//         <img src = {img}/>
//       <a href = {`/post/${id}`}>{id}:{car} Speed : {speed}</a>
//     </div>
//     <div>

//     </div>

//     </div>

// let BasketGoods = (p) => 

// <div className = 'bascet-goods'>
//   {p.list.map (post => <BasketGood />)}
// </div>

const Position = ({ position: { good, amount }, onChange, onDelete }) =>
    <div className='basket-good'>
        <img src={good.img} />
        <span><h2>{good.brand}</h2></span>
        <span>Price :{good.price}</span>
        <input type='number' min='1' value={amount} onChange={(e) => onChange(+e.target.value)} />
        <button onClick={onDelete}>X</button>

    </div>


class Basket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { good: car()[0], amount: 1 },
                { good: car()[1], amount: 2 },
            ],
        }

        this.state.total = this.calculateTotal(this.state)
    }


    deleteItem(index) {
        return this.state.list.filter((item, i) => i !== index)
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
        return this.state.list.map((item, i) => i == index ? { ...item, amount } : item)
    }


    render() {
        console.log(this.state);
        // this.calculateTotal()

        return (
            <>
                {this.state.list.map((position, i) => <Position position={position}

                    onDelete={() => {
                        this.setState({ list: this.deleteItem(i) })
                        this.setState((st) => ({ total: this.calculateTotal(st) }))
                    }
                    }
                    onChange={(amount) => {
                        this.setState({ list: this.changeAmount(i, amount) })
                        this.setState((st) => ({ total: this.calculateTotal(st) }))
                   
                    }}
                />)}
                <div> Total:{this.state.total} </div>

            </>
        )
    }
}

function mapStateToProps (state){
    return{
        basket : state.basket
    }
}

function matchDispatchToProps (dispatch){
    return bindActionCreators({select: select}, dispatch)
}

export default connect (mapStateToProps, matchDispatchToProps)(Basket);

// export default Basket
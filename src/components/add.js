import React from 'react'
import part from '../part.jpg'
import Logo from '../logo.js';
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom';
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

let graphqlAddToBase =  (n,d,i,p) => promiseActionsMaker(
    'setGood',
    gql.request(
        `mutation cg($good:GoodInput!){
            setGood(good:$good){
              _id, name, description, price,imgUrls
            }
          }`, {good :{
            "name": n,
            "description": d,
            "imgUrls" : i,
            "price": p
        }}))();

class Add extends React.Component {
    // export default  Header = props => 

    constructor(props) {
        super(props)
        this.state = {
            name: '', price: '', image: '', description: ''
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
    }

    handleChangeName(e) {
        this.setState({ name: e.target.value })    
      }

      handleChangeImage(e) {
        this.setState({ image: e.target.value })
      }

      handleChangePrice(e) {
        this.setState({ price: e.target.value })
      }

      handleChangeDescription(e) {
        this.setState({ description: e.target.value })
      }
    render() {
        return (
            <div class = "add">
                <h1>Добавление товаров в базу GraphQL</h1>
               <div>
                   Название
               <input type = 'text' value = {this.state.name} onChange={this.handleChangeName}/>
               </div>

               <div>
                   Изображение
               <input type = 'text' value = {this.state.image} onChange={this.handleChangeImage}/>
               </div>

               <div>
                   Описание
               <input type = 'text' value = {this.state.description} onChange={this.handleChangeDescription}/>
               </div>
            

               <div>
                   цена
               <input type = 'number' value = {this.state.price} onChange={this.handleChangePrice}/>
               </div>
            <button onClick = {() =>graphqlAddToBase(this.state.name,this.state.description,this.state.image, +this.state.price)}>Add</button>
            </div>
        )
    }
}

export default Add
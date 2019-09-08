import React from 'react';
import Logo from './logo';
import part from './part.jpg'
import logoDark from './logo-dark.svg'
import delivery from './delivery.gif'
import about from './about.jpg'
import './App.css';
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import Header from './components/header'
import Main from './components/main'
import Footer from './components/footer'
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from './reducers/index';
import WebPage from './components/component';
import thunk from 'redux-thunk';
import Result from './components/goods-cart'
import Basket from './components/basket'
import BasketTest from './containers/basket-test'
import Basket2 from './components/basket2';
import Basket3 from './components/basket3';
import Category from './components/category'
import { GraphQLClient } from 'graphql-request'
import store from './reducers/index'
import Order from './components/basketG'
import Good from './components/good'
import Add from './components/add'

let login = `Alex`,
password = `123`;
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


let graphqlCategoriesThunk = promiseActionsMaker(
    'categories',
    gql.request(
        `query cat{
            categories{
                _id, name
            }
        }`
    )
)


function graphqlCategoriesThunk1() {
    return promiseActionsMaker(
        'categories',
        gql.request(
            `query cat{
                categories{
                    _id, name
                }
            }`
        )
    )
  }
// let graphqlCategoriesThunk1 = () => promiseActionsMaker(
//     'categories',
//     gql.request(
//         `query cat{
//             categories{
//                 _id, name
//             }
//         }`
//     )
// )

// let c = () =>console.log(1);
// async function add1() {
//     await graphqlCategoriesThunk1 await c
//   }

function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  async function add2(x) {
    const a = graphqlCategoriesThunk1();
    const b = resolveAfter2Seconds(30);
    return  await a + await b;
  }

  add2(10).then(v => {
    console.log(v);  // prints 60 after 2 seconds.
  });


//   function a() {
//     return async dispatch => {
//         await graphqlCategoriesThunk1()(dispatch)
//     //   dispatch(graphqlCategoriesThunk1());
//     //   let data = await promise.catch(e => dispatch(actionRejected(e)));
//     //   dispatch(actionResolved(data));
//     };
  
// let ac = () => {async dispatch => await graphqlCategoriesThunk1()(dispatch) await c()}


let graphqlOrdersThunk = ()=> promiseActionsMaker(
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
          }`,{}))();



          
 
    


let graphqlLoginThunkMaker = (login, password) => promiseActionsMaker('login',
gql.request(
    `query login($login:String!, $password:String!){
        login(login:$login, password:$password)
      }`
    , {login, password}
))

let graphqlGoodThunk = _id =>  promiseActionsMaker(
    'good',
    gql.request(
        `query good($_id:ID!){
            good(_id:$_id){
            _id, name, description,imgUrls,price
            }
        }
        `,
        {_id}
    ))


const history = createHistory()


store.dispatch(graphqlLoginThunkMaker(login, password)())
store.dispatch(graphqlCategoriesThunk())

// store.dispatch(graphqlLoginThunkMaker(login, password)())
store.dispatch(graphqlOrdersThunk())
// store.dispatch(graphqlGoodThunk("5d3ccd1166b658385852b1f5")())


store.subscribe(() => console.log(store.getState()))


let Delivery = p =>
    <div> <img src={delivery}  style ={{width: "1050px"}}/></div>


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

            let deleteThenRender = (i) => async dispatch => {await promiseActionsMaker(
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
                    }))()(dispatch)
            await  promiseActionsMaker(
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
                    }`,{}))()(dispatch)
          }


          let test3 = (i) => async dispatch => {await promiseActionsMaker(
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
                        "count": 5
                    }
                }))()(dispatch)
        await  promiseActionsMaker(
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
                }`,{}))()(dispatch)
      }

            
let graphqlChangeAmountBasket = (good, count) => promiseActionsMaker(
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
                good,
                "order": "5d3f1a069926370948553df9",
                count
            }
        }))();

        let ChangeAmountThenRender = (good, count) => async dispatch => {await  promiseActionsMaker(
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
                        good,
                        "order": "5d3f1a069926370948553df9",
                        count
                    }
                }))()(dispatch)
        await  promiseActionsMaker(
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
                }`,{}))()(dispatch)
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
        //   let i = "5d3dca699926370948553def"
          let graphqlAddGoodToBasket = (i) =>  promiseActionsMaker(
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
                  }`,{orderGood: {
                    "good": i,
                    "order": "5d3f1a069926370948553df9",
                  "count": 1
                  }}))();
        

       



let NotFound = p =>
    <h1>
        404
    </h1>

let About = props => <div>
    <img src={about} /></div>
let Beta = props =>
    <ul>
       
    </ul>


class GoodPage extends React.Component{

    componentDidMount(){
        let p = this.props
            p.getGood(p.match.params.id)
        
    }

    render(){
        let p = this.props;
        return(
            <div className = 'goods'>
            {/* {JSON.stringify(p.goods, 4, null)} */}
            {console.log(p.goods && p.goods.category.goods)}
            
            {p.goods && p.goods.category.goods.map(good =>
               <Link to={`/good/${good._id}`} >
                <div className = 'good-card'> 
                <Link to={`/good/${good._id}`} >
                <img onClick ={ console.log(123) }  src = {good.imgUrls}/></Link>
            <span> Модель: {good.name}</span>
            <span onClick ={ () => graphqlGoodThunk(good._id) } > Цена: {good.price}$$</span>
            {console.log(good._id)}
            <span>{good._id}</span>
            <button onClick = {() => {graphqlAddGoodToBasket(good._id);console.log(good._id)}}>Купить</button>
           
            </div>
            </Link>
            )}</div>
            
        )
    }
}


class CategoryPage extends React.Component{

    componentDidMount(){
        // store.dispatch(graphqlCategoriesThunk())
        console.log(123);
        let p = this.props
            p.getCategoryGoods(p.match.params.id)
        
    }

    render(){
        let p = this.props;
        // store.dispatch( graphqlCategoryThunk(p.goods && p.goods.category._id && p.goods.category._id))
        return(
            <div className = 'goods'>
            {/* {JSON.stringify(p.goods, 4, null)} */}
            {console.log(p.goods && p.goods.category)}
            
            {p.goods && p.goods.category.goods.map(good =>
                <div>
                 <Link onClick = {() =>{
                  store.dispatch(graphqlGoodThunk(good._id)()
                  );
                  console.log(123)
                  
                
                }}
                   to={`/good/${good._id}`} >
                <div className = 'good-card'>
                <img 
                // onClick ={ console.log(123) }
                  src = {good.imgUrls}/>
            <span> Моделkь: {good.name}</span>
            <span 
            // onClick ={ () => graphqlGoodThunk(good._id) }
             > Цена: {good.price}$$</span>
            {/* {console.log(good._id)} */}
            {/* <span>{good._id}</span> */}
         
            </div>
            </Link>
            <button onClick = {() => {
                store.dispatch(graphqlAddGoodToBasket(good._id));
                store.dispatch(graphqlOrdersThunk())
                console.log(good._id)
                }}>Добавить в корзину</button>
            </div>
            )}</div>
        )
    }
}
class OrdersPage extends React.Component{

    constructor(props){
        super(props)
        
        this.setState({
           
        })
        console.log(22222);
    }

    componentWillMount(){
        let p = this.props
            // p.getCategoryGoods(p.match.params.id)
            store.dispatch(graphqlOrdersThunk());
            console.log(111111111111);

    }

    render(){
        let p = this.props
        return(
            <div className = 'orders'>
            {/* {JSON.stringify(p.goods, 4, null)} */}
            {console.log(p.orders && p.orders.myOrders[0].orderGoods)}


            {p.orders&& p.orders.myOrders[0] && p.orders.myOrders[0].orderGoods.map(order => {
                    {
                        if (order.count > 0) {
                            return (
                                <div className="basket-good" style={{}}>
                                    <button onClick={() => {store.dispatch(deleteThenRender(order.good._id))
                                    }
                                    } >Удалить</button>


    


                                    {/* <Link to={`/good/${order.good._id}`} style={{ color: "red" }}> */}
                                        <img src={order.good.imgUrls} />
                                    {/* </Link> */}
                                    <div className="basket-good-name">{order.good.name}</div>
                                    <div className="basket-good-price">Цена : {order.good.price} $<div />
                                    </div>
                                    <div className="basket-good-count">Количество : {order.count} шт <input type='number' min='1' value={order.count} onChange={(e) => {test3(order.good._id);
                                     store.dispatch(graphqlOrdersThunk());
                                     console.log(this.value);
                                    }} />
                                    <button onClick = {() => {store.dispatch(ChangeAmountThenRender(order.good._id, order.count+1));console.log(654);}}>+1</button>
                                    </div>
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
            
            {/* {p.orders && p.orders.category.orders.map(orders => <div className = 'good-card'>
                <img src = {orders.imgUrls}/>
            <span> Модель: {orders.name}</span>
            <span> Цена: {orders.price}$</span>
            <button onClick = {(p) => {console.log(orders.price)}}>Купить</button>
            </div>)} */}
          <div className='orders'>
        {console.log("33 " + p.cats && p.cats)}
        {/* {p.cats && p.cats.map(post => <OrdersPost post={post} />)} */}
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



        <div className="total-price">Итого:  {p.orders  && p.orders.myOrders[0].orderGoods
                .reduce(function (sum, current) {
                    // debugger;
                    return sum + current.count * current.price;
                }, 0)
                }$</div>
    </div>
            </div>
            
        )
    }
}

// let CategoryPage = (p) => {
//     if (!p.goods || p.goods.category._id !== p.match.params.id){
//         p.getCategoryGoods(p.match.params.id)
//         return "loading";
//     }
    
//     return (
//         <div>
//         data here
//         </div>
//     )
// }

GoodPage= connect(st => ({good: st.promiseReducer.category && st.promiseReducer.category.payload }), {getGood: graphqlGoodThunk})(GoodPage)

CategoryPage = connect(st => ({goods: st.promiseReducer.category && st.promiseReducer.category.payload }), {getCategoryGoods: graphqlCategoryThunk})(CategoryPage)

OrdersPage = connect(st => ({orders: st && st.promiseReducer && st.promiseReducer.myOrders && st.promiseReducer.myOrders.payload && st.promiseReducer.myOrders.payload }), {getOrderGoods: graphqlOrdersThunk})(OrdersPage)

function App() {

    return (
        <div className='mainWrapper'>
            


            <Provider store={store}>
                <Router history={history}>
                <Header />
                {/* <OrdersPage/> */}
                <section className="super-wrapper">
                <aside>
                        <div className = 'list'>Каталог Товаров</div>
                        
                <Category/>

                        </aside>
                    <div className = 'main-wrapper'>
                    {/* <Good/> */}
                        {/* <Main/> */}
                            
                        
                        <Switch>
                            
                            <Route path="/basket" component={OrdersPage} />
                            <Route path="/about" component={About} />
                            <Route path="/beta" component={Beta} />
                            <Route path="/delivery" component={Delivery} />
                            <Route path="/" component={Main} exact />
                            <Route path="/category/:id" component = {CategoryPage} />
                            <Route path="/good/:id" component = {Good}  />
                            <Route path="/cart/" Cart />
                            <Route path="/add/" component = {Add} />

                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    </section>


                    
                    <Footer /> </Router>
            </Provider>
        </div>
    );
}

export default App;

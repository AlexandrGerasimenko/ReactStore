import React from 'react'
import createHistory from "history/createBrowserHistory";
import WebPage from './component'
import delivery from '../delivery.jpg'
import about from '../about.jpg'
import {Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import Result from '../components/goods-cart'
import Basket3 from './basket3';
import { GraphQLClient } from 'graphql-request'
import Category from './category'
import AwesomeSlider from 'react-awesome-slider';
import SwiftSlider from 'react-swift-slider'
import 'react-awesome-slider/dist/styles.css';

const history = createHistory()
const MyLink = ({to, children}) =>
<button onClick={() => history.push(to)}>{children}</button>

const gql = new GraphQLClient("/graphql", { headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI1ZDM4OWEwN2FjZjA5ZjJkY2M2MzE3ZmIiLCJsb2dpbiI6IkFsZXgifSwiaWF0IjoxNTY0MDAyMjI2fQ.dIarWzVkpRod_z0QexRRHq8SaTGzOl_EIHWjW54ZD-M'
} })

// gql.request(`query cat{
//     categories{
//       _id, name, goods{
//         _id, name, description
//       }
//     }
//   }`) 
// .then(data => console.log(data.categories.map( cat => cat.name)))
const data =  [
    {'id':'1','src':'https://i2.rozetka.ua/promotions/182/182272.png'},
    {'id':'2','src':'https://www.eflexsystems.com/hs-fs/hubfs/mobileviews3.png?width=896&name=mobileviews3.png'},
    {'id':'3','src':'https://bphsvanguard.com/wp-content/uploads/2018/01/watch-900x450.png'},
    {'id':'4','src':'https://телефон-в-рассрочку.рф/megafon-vybor-telefona.png'},
    {'id':'5','src':'https://im.apple-iphone.ru/2015/12/2015-12-15_165930.png'}
  ];
  
  class App extends React.Component {
    render() {
      return (
        <SwiftSlider data={data}/>
      );
    }
  }

class Main extends React.Component {
    render() {
        return (
            // let Main = props => 
            <main>
                {/* <h1>Main page</h1> */}
                <article>
                
                    
                    {/* <div><a href="#"><img src="./images/nokia.jpg" alt="nokia"></a></div> */}
                </article>
               
                <nav>
                
                    {/*
                    
                    <div><ol>
                        <li><Link to='/beta'>Аква</Link></li>
                        
                    </ol></div> */}
                </nav>

                <SwiftSlider data={data}/>

                {/* <aside> */}
                {/* <div><a href="#"><img src="./images/Ariel.jpg" alt="Ariel"></a></div>
    <div><a href="#"><img src="./images/WarmFloor.jpg" alt="WarmFloor"></a></div>
</aside> */}
{/* <Result/> */}
{/* <WebPage/> */}
{/* <Basket3 /> */}
            </main>
        )
    }
}

let Delivery = p => 
  <div> <img src = {delivery}/> </div>





let NotFound = p =>
    <h1>
        404
    </h1>

let About = props => 
  <img src = {about} />

export default Main
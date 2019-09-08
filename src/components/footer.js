import React from 'react'
import createHistory from "history/createBrowserHistory";
import {Router, Route, Link, Switch, Redirect} from 'react-router-dom';
const history = createHistory()

const MyLink = ({to, children}) =>
<button onClick={() => history.push(to)}>{children}</button>

class Footer extends React.Component {
    render() {
        return (
            // let Footer = props =>
                <footer>
                    {/* //  <div>
// <a href="#"><img src="./images/visa.gif" alt="visa"></a>
// <a href="#"><img src="./images/Master.gif" alt="Master"></a>
// </div>  */}
                    {/* <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </div> */}
                    <div>
                        <Link to='/'>Main</Link>
                        <Link to='/about'>about</Link>
                        <Link to='/delivery'>Delivery</Link>
                        <Link to='/basket'>Basket</Link>
                    </div>
                </footer> 
            )
    }
}

export default Footer
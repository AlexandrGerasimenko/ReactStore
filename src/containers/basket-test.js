import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {select} from '../actions/index'


class BasketTest extends Component {
    showList (){
        return this.props.basket.map(good => 
            <li 
            onClick = {() => {this.props.select(good);console.log(this.props)}}
            
             key = {good.id}>{good.brand}</li>
        )
    }
    
    render(){
        return(
            <ol>
               {this.showList()}
            </ol>
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

export default connect (mapStateToProps, matchDispatchToProps)(BasketTest);
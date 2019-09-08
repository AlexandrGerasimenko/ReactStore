import React from 'react'
import part from '../part.jpg'
import Logo from '../logo.js';
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Search from './search'
class Header extends React.Component {
    // export default  Header = props => 
    render() {
        return (
            <header>
                <div className="pay">
                    <a href="#"><img src={part} />alt="Oplata"></a>
                </div>
                <div className="headerWrapper">
                    <div class="logo">
                        <div>
                            <i class="fa fa-phone" aria-hidden="true"></i>    0-800-12345678
                </div>
                        <div>
                        <Link to='/'><Logo/></Link>
                        </div>
                    </div>
                    <div>
                        <div>
                            <ul>
                                <li><a href="#">RU|UA</a> </li>
                                <li><a href="#">Вопроы и отеты</a></li>
                                <li><a href="#">Доставка</a></li>
                                <li><a href="#">Гарантия</a></li>
                                <li><a href="#">Доставка и оплата</a></li>
                                <li><a href="#">Кредит</a></li>
                            </ul>
                        </div>
                        <div class="search">
                            <div>
                                <div>Город</div>
                                <div>
                                    <select name="city">
                                        <option value="Choose city">Выбирете город</option>
                                        <option value="Kuiv">Киев</option>
                                        <option value="Kharkov">Харьков</option>
                                        <option value="Lviv">Львов</option>
                                    </select>
                                </div>
                            </div>
                            <div class="goodSearch">
                                <i class="fa fa-search" aria-hidden="true"></i>
                                <input type="text" size="40" placeholder="Найти" />
                                <button>Найти</button>
                                <Search/>
                            </div>
                        </div>
                    </div>
                    <div class="hello">
                        <div>Приветствуем,
                  {/* <a><i class="fa fa-user" aria-hidden="true"></i><a href="#">  войдите  в свой кабинет</a>  */}
                        </div>
                        <div class="iconsWrapper">
                            <a href=""><div class="icons"><span><i class="fa fa-heart-o" aria-hidden="true"></i></span><span>Мои желания</span></div></a>
                            <a href=""><div class="icons"><span><i class="fa fa-truck" aria-hidden="true"></i></span><span>Доставка</span></div></a>
                            <a href=""><div class="icons"><span><i class="fa fa-shopping-basket" aria-hidden="true"></i></span>
                                <span>
                                    <Link to='/basket'>Корина</Link>
                                </span>
                                <span>
                                    <Link to='/add'><img
                                    src = "https://icon-library.net/images/admin-icon/admin-icon-28.jpg" style ={{width: 40}} /></Link>
                                </span>
                            </div>
                            </a>
                        </div>
                    </div>
                </div>

            </header>
        )
    }
}

export default Header
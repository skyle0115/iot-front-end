import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import Report from './Report';
import Overview from './Overview';
import Settings from './Settings';

import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.navbarToggle = this.navbarToggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    navbarToggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <LoadingBar style={{display: 'absolute', position: 'fixed', zIndex: 100}}/>
                    <Navbar color="faded" light toggleable>
                        <div className="container">
                            <NavbarToggler right onClick={this.navbarToggle}/>
                            <NavbarBrand tag={Link} to='/'>
                                <i className="fa fa-lg fa-lightbulb-o" aria-hidden="true">
                                    {` 智慧電表`}
                                </i>
                            </NavbarBrand>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to='/'>總覽</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/report'>報表</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/settings'>設定</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                    <div className="container">
                        <Route exact path="/" component={Overview}/>
                        <Route exact path="/report" component={Report}/>
                        <Route exact path="/settings" component={Settings}/>
                        <div>
                            <hr className="mb-2"/>
                            <p className="text-center">
                                {`© 10520 物聯網概論第 13 組 | `}
                                <Link target="_blank" to="https://github.com/skyle0115/iot-front-end">
                                    <i className="fa fa-github" aria-hidden="true">
                                        {` Github`}
                                    </i>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

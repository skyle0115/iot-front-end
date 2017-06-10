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
                    <Navbar color="faded" light toggleable>
                        <div className="container">
                            <NavbarToggler right onClick={this.navbarToggle}/>
                            <NavbarBrand tag={Link} to='/'><i className="fa fa-lg fa-lightbulb-o" aria-hidden="true"></i> 智慧電表</NavbarBrand>
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
                    <Route exact path="/" component={Overview}/>
                    <Route path="/report" component={Report}/>
                    <Route path="/settings" component={Settings}/>
                </div>
            </Router>
        );
    }
}

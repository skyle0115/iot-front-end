import React, {Component} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

export default class ComboBox extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            dropdownOpen: false,
            selected: this.props.default || this.props.items[0],
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    onClick(item) {
        this.setState({
            selected: item
        });
        this.props.onChange(item);
    }

    render() {
        return (
            <Dropdown style={{display: 'inline'}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    {this.state.selected}
                </DropdownToggle>
                <DropdownMenu>
                    {this.props.items.map(item => <DropdownItem key={item} onClick={() => this.onClick(item)}>{item}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import classes from './Person.css';
import AuthContext from '../../Context/contextAPI';

class Person extends Component {

  constructor(props){
    super(props);
    this.inputElementReference=React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount(){
    //document.querySelector('input').focus();
    //this.inputElement.focus();
    this.inputElementReference.current.focus();
    console.log("heyyyyyy",this.context.authentication);
  }

  render() {
    console.log('[Person.js] rendering...');
    return (
      <Aux>
        {this.context.authentication ? <p>User Authenticated</p>: <p>please login</p>}
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key="i2">{this.props.children}</p>
        <input
          key="i3"
          //ref={(inpElem)=>{inpElem.focus();}}
          //ref={(inpElem)=>{this.inputElement=inpElem;}}
          ref={this.inputElementReference}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

export default Person;

import React, { Component } from 'react';
import Menu from 'components/Global/Menu';

export default class Header extends Component {

  render() {
    return (
      <div className='Header'>
        <h1>Boulevard Caymmi</h1>
        <Menu />
      </div>
    );
  }
}

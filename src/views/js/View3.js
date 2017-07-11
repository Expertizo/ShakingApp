// @flow
import React, { Component } from 'react';
import Button from '../../components/Button';
import '../css/View.css';
import '../css/View3.css';
import gift from '../../assets/gift-box.png';

export default class View3 extends Component {
  render() {
    return (
      <div className="viewContainer justifySpaceAround">
          <text className="won">You did it!!!</text>
          <img src={gift} alt="" width="250px" height="250px"/>
        <Button title="Done" onClick={this.props.onClick} />
      </div>
    );
  }
}

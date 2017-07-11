// @flow
import React, { Component } from 'react';
import Button from '../../components/Button';
import '../css/View.css';
import '../css/View2.css';

const garble = ['r', 'g', 'w', 'g', 'e', 'f', 'g', 'p', 'a', 'l'];

export default class View1 extends Component {
  render() {
    return (
      <div className="viewContainer justifySpaceAround">
        <div className="item-wrap">
            <div className="watch">
                {garble.map((l)=>{
                    return <ol>
                        <li>{l}</li>
                    </ol>
                })}
            </div>
        </div>
        <Button title="Play" onClick={this.props.onClick} />
      </div>
    );
  }
}

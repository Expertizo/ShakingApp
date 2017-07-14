// @flow
import React, { Component } from 'react';
import Button from '../../components/Button';
import '../css/View.css';
import '../css/View2.css';

import Letter1 from '../../assets/scrambled/Letter1.jpg';
import Letter2 from '../../assets/scrambled/Letter2.jpg';
import Letter3 from '../../assets/scrambled/Letter3.jpg';
import Letter4 from '../../assets/scrambled/Letter4.jpg';
import Letter5 from '../../assets/scrambled/Letter5.jpg';
import Letter6 from '../../assets/scrambled/Letter6.jpg';
import Letter7 from '../../assets/scrambled/Letter7.jpg';
import Letter8 from '../../assets/scrambled/Letter8.jpg';
import Letter9 from '../../assets/scrambled/Letter9.jpg';

const garble = [Letter1, Letter2, Letter3, Letter4, Letter5, Letter6, Letter7, Letter8, Letter9];

export default class View1 extends Component {
  render() {
    return (
      <div className="viewContainer justifySpaceAround">
        <div className="item-wrap">
            <div className="watch">
                {garble.map((l, index)=>{
                    return <ol key={index.toString()}>
                        <li style ={ {backgroundImage: `url(${l})`}  }>
                        </li>
                    </ol>
                })}
            </div>
        </div>
        <Button title="Play" onClick={this.props.onClick} />
      </div>
    );
  }
}
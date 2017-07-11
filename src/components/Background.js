// @flow
import React, { Component } from 'react';
import './Background.css';

export default class Background extends Component {
    render() {
        return (
            <img className='aqBackground' src={this.props.image} alt='background'/>
        )
    }
}

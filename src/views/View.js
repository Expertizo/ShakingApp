// @flow
import React, { Component } from 'react';
import Background from '../components/Background';
import View1 from './js/View1';
import View2 from './js/View2';
import View3 from './js/View3';
import bg from '../assets/background.jpg';
//
//import type Score from './js/View2';

export default class View extends Component {
    state:{
        currentPage: number,
        score: Score
        };

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            score: {
                high: 0,
                low: 0
            }
        };
    }

    _onView1Click() {
        this.setState({currentPage: 2});
    }

    _onView2Click(score) {
        this.setState({currentPage: 3, score});
    }

    _onView3Click() {
        this.setState({currentPage: 1});
    }

    render() {
        let render = null;

        switch (this.state.currentPage) {
            case 1:
                render = <View1 onClick={this._onView1Click.bind(this)}/>;
                break;
            case 2:
                render = (
                    <View2
                        onDone={this._onView2Click.bind(this)}
                        onBack={this._onView3Click.bind(this)}
                    />
                );
                break;
            case 3:
                render = (
                    <View3
                        score={this.state.score}
                        onClick={this._onView3Click.bind(this)}
                    />
                );
                break;
            default:
                break;
        }

        return (
            <div className="container">
                <Background image={bg}/>
                {render}
            </div>
        );
    }
}

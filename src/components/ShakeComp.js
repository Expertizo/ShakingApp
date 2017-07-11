// @flow
import React, { Component } from 'react';
import './ShakeComp.css';

export
type
Props = {
    scoreDidOcccur: (boolean) => void,
    resetScore: () => void
};

export default class ShakeComp extends Component {

    Shake:Object;

    constructor(props:Props) {
        super(props);

        // Instantiate new ShakeJs instance. Parameters passed might be different
        // as you customize the shake.js code. For now, instantiate as described in
        // example in https://github.com/alexgibson/shake.js/
        this.Shake = new window.Shake({
            threshold: this.props.options.thresholdBottomFrom,
            timeout: this.props.options.timeout
        });
    }

    componentDidMount() {
        this.Shake.start();

        this.startShakeListener();
    }

    componentWillUnmount() {
        this.removeShakeListener();
    }

    shakeEventDidOccur = () => {
        this.props.shakeDidOccur();

        const dX = this.Shake.dX;
        const dY = this.Shake.dY;
        const dZ = this.Shake.dZ;

        const isDXInBoundsOfThreshold = dX > this.props.options.thresholdBottomFrom && dX < this.props.options.thresholdBottomTo;
        const isDYInBoundsOfThreshold = dY > this.props.options.thresholdBottomFrom && dY < this.props.options.thresholdBottomTo;
        const isDZInBoundsOfThreshold = dZ > this.props.options.thresholdBottomFrom && dZ < this.props.options.thresholdBottomTo;

        if ((isDXInBoundsOfThreshold && isDYInBoundsOfThreshold)
            || (isDXInBoundsOfThreshold && isDZInBoundsOfThreshold)
            || (isDYInBoundsOfThreshold && isDZInBoundsOfThreshold)) {

            this.props.scoreDidOccur(false);

        } else if (dX > this.props.options.thresholdTop || dY > this.props.options.thresholdTop || dZ > this.props.options.thresholdTop) {
            this.props.scoreDidOccur(true);
        }
    };

    removeShakeListener() {
        window.removeEventListener('shake', this.shakeEventDidOccur, false);
    }

    startShakeListener() {
        window.addEventListener('shake', this.shakeEventDidOccur, false);
    }

    render() {
        return null;
    }
}

// @flow
import React, { Component } from 'react';
import Button from '../../components/Button';
import backBtn from '../../assets/arrow-icon.png';
import ShakeComp from '../../components/ShakeComp';

import vibrate from '../../assets/vibrate-d.png';


//epicparty
import E from '../../assets/set_of_words/Set1/Letter1.jpg';
import P1 from '../../assets/set_of_words/Set1/Letter2.jpg';
import I from '../../assets/set_of_words/Set1/Letter3.jpg';
import C from '../../assets/set_of_words/Set1/Letter4.jpg';
import P2 from '../../assets/set_of_words/Set1/Letter5.jpg';
import A from '../../assets/set_of_words/Set1/Letter6.jpg';
import R from '../../assets/set_of_words/Set1/Letter7.jpg';
import T from '../../assets/set_of_words/Set1/Letter8.jpg';
import Y from '../../assets/set_of_words/Set1/Letter9.jpg';

//Squadgoals
import S from '../../assets/set_of_words/Set2/Letter1.jpg';
import Q_U from '../../assets/set_of_words/Set2/Letter2.jpg';
import A1 from '../../assets/set_of_words/Set2/Letter3.jpg';
import D from '../../assets/set_of_words/Set2/Letter4.jpg';
import G from '../../assets/set_of_words/Set2/Letter5.jpg';
import O from '../../assets/set_of_words/Set2/Letter6.jpg';
import A2 from '../../assets/set_of_words/Set2/Letter7.jpg';
import L from '../../assets/set_of_words/Set2/Letter8.jpg';


import soundWin from '../../assets/sound_win.mp3';
import soundShake from '../../assets/sound_shake.mp3';
import soundLose from '../../assets/sound_lose.mp3';

import '../../components/csshake-slow.min.css';
import '../../components/csshake-hard.min.css';

import '../css/View.css';
import '../css/View2.css';

const BOTTOM_THRESHOLD_FROM = 5;
const BOTTOM_THRESHOLD_TO = 10;
const TOP_THRESHOLD = 10;
const SHAKE_TIMEOUT = 750;
const RESET_TIMEOUT = 5000;
const MAX_SHAKES_FROM = 5;
const MAX_SHAKES_TO = 10;
const SHAKES_TIMER_FROM = 10;
const SHAKES_TIMER_TO = 30;
const SHAKES_TIMER_STEP = 5;
const GARMENTS_NUMBER = 4;

//Squadgoals
const epicparty = [E, P1, I, C, P2, A, R, T, Y],
      squadgoals = [S,Q_U ,A1,D,G,O, A2,L,S];
    //awesome = ['a', 'w', 'e', 's', 'o', 'm', 'e'],
    //boozedup = ['b', 'o', 'o', 'z', 'e', 'd', 'u', 'p'];
const words = [
  epicparty,
  squadgoals
];

export type Score = {
  high: number,
  low: number
};

export type Props = {
  onClick: (Score) => void,
  onBack: () => void
};

type GarmentsSettings = {
  steps: Array<{
    stepNumber: number,
    maxShakes: number,
    shakesTimer: number
  }>,
  totalShakes: number
};

const randomMaxShakes = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

const randomShakeTimer = (min, max, step) =>
  min + step * Math.floor(Math.random() * (max - min) / step);

const randomGarmentsSettings = (number: number): GarmentsSettings => {
  const steps = [];
  let totalShakes = 0;
  for (let index = 0; index < number; index++) {
    const shakes = randomMaxShakes(MAX_SHAKES_FROM, MAX_SHAKES_TO);
    steps.push({
      stepNumber: index,
      maxShakes: shakes,
      shakesTimer: randomShakeTimer(
        SHAKES_TIMER_FROM,
        SHAKES_TIMER_TO,
        SHAKES_TIMER_STEP
      )
    });
    totalShakes += shakes;
  }
  return { steps, totalShakes };
};

const garmentsSettings = randomGarmentsSettings(GARMENTS_NUMBER);
let result;
let customArr;
export default class View2 extends Component {
  item: any;

  state: {
    score: Score,
    isDoneBtnVisible: boolean,
    animateMag: object,
    image: string,
    shakesTimer: number,
    soundToPlay: string,
    actualStep: number,
    dropGermentAnimation: boolean
  };

  shakeComp: ShakeComp;
  maxShakes: number;
  audioPlayer: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      score: {
        high: 0,
        low: 0
      },
      showWord: false,
      vibratePhone: false,
      isDoneBtnVisible: false,
      animateMag: {
        isAnimate: false,
        animHigh: false
      },
      image: 'light',
      shakesTimer: garmentsSettings.steps[0].shakesTimer,
      closeBtnClass: 'hidden',
      actualStep: 0,
      dropGermentAnimation: false
    };
    this.clearCountTimer = null;
    this.shakesTimerId = null;
    customArr = [];
    result = Math.floor(Math.random() * words.length);
    props.grable.map((x, index)=>{
      let z = props.grable[Math.floor(Math.random() * props.grable.length)];
      words[result].map((y, index2)=>{
        if(index === index2){
          if((index % 2) === 0) {
            customArr.push([y, z, x]);
          } else {
            customArr.push([x, z, y]);
          }
        }
        return 0
      });
      if (index > words[result].length - 1) {
        if((index % 2) === 0) {
          customArr.push(['-', z, x]);
        } else {
          customArr.push([x, z, '-']);
        }
      }
      return 0
    });
  }

  componentDidMount() {
    this.audioPlayer = document.getElementById('audio');
    this.shakesTimerId = setInterval(() => {
      this.setState((prevState, props) => ({
        shakesTimer: prevState.shakesTimer - 1
      }));

      if (this.state.shakesTimer === 0) {
        clearInterval(this.shakesTimerId);
        clearTimeout(this.clearCountTimer);
        this.shakeComp.removeShakeListener();
        this.audioPlayer.src = soundLose;
        this.audioPlayer.play();

        setTimeout(() => {
          this.setState({ closeBtnClass: 'visible' });
        }, 2000);
      }
    }, 1000);
  }

  scoreDidOccur(isHigh: boolean) {
    if (isHigh) {
      let score = this.state.score.high + 1;
      const maxShakes = garmentsSettings.steps[this.state.actualStep].maxShakes;

      this.setState({
        score: {
          high: score,
          low: this.state.score.low
        },
        animateMag: {
          isAnimate: true,
          animHigh: true
        }
      });

      // check if user has max count
      if (
        score === maxShakes && this.state.actualStep + 1 === GARMENTS_NUMBER
      ) {
        this.shakeComp.removeShakeListener();
        clearInterval(this.shakesTimerId); // clear shakes timer
        clearTimeout(this.clearCountTimer); // clear timeout when user wins

        this.audioPlayer.src = soundWin;
        this.audioPlayer.play();

        setTimeout(() => {
          this.props.onDone(this.state.score);
        }, 3500);
      } else if (
        score === maxShakes && this.state.actualStep < GARMENTS_NUMBER
      ) {
        clearInterval(this.shakesTimerId);
        this.resetScore();
        this.setState(prevState => ({
          actualStep: prevState.actualStep + 1,
          shakesTimer: garmentsSettings.steps[this.state.actualStep].shakesTimer
        }));
        setTimeout(() => {
          this.setState({
            animateMag: {
              isAnimate: false
            }
          });
        }, SHAKE_TIMEOUT);
        this.shakesTimerId = setInterval(() => {
          this.setState((prevState, props) => ({
            shakesTimer: prevState.shakesTimer - 1
          }));
        }, 1000);
      } else {
        // shake high
        this.audioPlayer.src = soundShake;
        this.audioPlayer.play();

        setTimeout(() => {
          this.setState({
            animateMag: {
              isAnimate: false
            }
          });
        }, SHAKE_TIMEOUT);
      }
    } else {
      // if shake was low
      this.setState({
        score: {
          high: this.state.score.high,
          low: this.state.score.low + 1
        },
        animateMag: {
          isAnimate: true,
          animHigh: false
        }
      });

      setTimeout(() => {
        this.setState({
          animateMag: {
            isAnimate: false
          }
        });
      }, SHAKE_TIMEOUT);
    }
  }

  resetScore() {
    this.setState({
      isAnimate: false
    });
  }

  clearTimer() {
    clearTimeout(this.clearCountTimer); // cancel the previous timer.
    this.clearCountTimer = null;
  }

  shakeDidOccur() {

    this.setState({isAnimate: true, vibratePhone: true});

    // reset previous timeout
    if (this.clearCountTimer) {
      this.clearTimer();
    }
    this.setState({showWord: true, vibratePhone: false});

    this.clearCountTimer = setTimeout(() => {
      this.resetScore();
    }, RESET_TIMEOUT);
  }

  onBackBtn() {
    this.audioPlayer = null; // reset player
    this.props.onBack();
  }

  render() {
    const shakesTimer = this.state.shakesTimer;
    let renderTimer = (
      <p className={'time-left'}>
        Time left: <span className="time-count"> {shakesTimer} </span> sec
      </p>
    );

    if (shakesTimer === 0) {
      clearInterval(this.shakesTimerId);
      renderTimer = <p className={'time-is-up'}>Time's up</p>;
    }
    //const animateMag = this.state.animateMag;
    //const itemAnimClass = animateMag.isAnimate
    //  ? this.state.animateMag.animHigh
    //      ? ' shake-constant shake-hard'
    //      : ' shake-constant shake-slow'
    //  : '';
    return (
      <div className="viewContainer justifySpaceAround">
        <button className="back-btn" onClick={() => this.onBackBtn()}>
          <img src={backBtn} alt="back button" />
        </button>

        {renderTimer}

        <audio id="audio">
          Ваш браузер не поддерживает <code>audio</code> элемент.
        </audio>

        <ShakeComp
          options={{
            thresholdBottomFrom: BOTTOM_THRESHOLD_FROM,
            thresholdBottomTo: BOTTOM_THRESHOLD_TO,
            thresholdTop: TOP_THRESHOLD,
            maxCount: garmentsSettings.totalShakes,
            timeout: SHAKE_TIMEOUT
          }}
          scoreDidOccur={type => this.scoreDidOccur(type)}
          resetScore={this.resetScore}
          shakeDidOccur={this.shakeDidOccur.bind(this)}
          ref={item => {
            this.shakeComp = item;
          }}
        />

        <div className="item-wrap">
          <div className="watch">
            {
             !this.state.showWord ? this.props.grable.map((l)=>{
               return <ol key={l.toString()}>
                 <li style ={ {backgroundImage: `url(${l})`}  }>
                 </li>
               </ol>
             }) : customArr.map((l, i)=>{
               if((i % 2) === 0) {
                 return <ol className= "dial1" key={l.toString()}>
                   { l.map((child, index) => {
                     return <li
                         key={index}
                         style ={ {backgroundImage: `url(${child})`}  }
                         className={(child && child.indexOf('-') > -1) && 'space'}
                     ></li>
                   })
                   }
                 </ol>
               } else {
                 return <ol className= "dial2" key={l.toString()}>
                   { l.map((child, index) => {
                     return <li
                         key={index}
                         style ={ {backgroundImage: `url(${child})`}  }
                         className={(child && child.indexOf('-') > -1) && 'space'}></li>
                   })
                   }
                 </ol>
               }
             })
            }
          </div>

        </div>
        { !this.state.vibratePhone && !this.state.showWord ? <img src={vibrate} alt="" className="vibrate vib-img"/> : ''}

        {this.state.showWord && <Button
            title="Next"
            onClick={() => this.props.onDone()}
        />}
        <div className="caption">
          <text>Shake your phone</text>
        </div>

        <Button
          className={this.state.closeBtnClass}
          title="Close"
          onClick={() => this.props.onBack()}
        />
      </div>
    );
  }
}

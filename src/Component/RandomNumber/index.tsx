import React from 'react';
import { Row, Col, List } from 'antd';

declare global {
  interface Window {
    responsiveVoice: any;
  }
}


export interface gameProps {
  isStart: boolean,
  onReset: boolean,
  resetFinish: () => void,
  speed: number
}

export interface gameState {
  startting: boolean,
  randNumber: number;
}

class RandomNumber extends React.Component<gameProps, gameState> {
  state = {
    startting: false,
    randNumber: 0,
  };

  public numbers: number[] = [];
  public oldNumbers: Array<any> = [[], [], [], [], [], [], [], [], []];
  public listNumber: number[] = [];
  public breakButton: boolean = false;
  public voice: any;

  componentDidMount() {
    this.createNumbers();
    const script = document.createElement("script");

    script.src = "https://code.responsivevoice.org/responsivevoice.js?key=e9a32weJ";
    script.async = true;
    script.onload = () => this.scriptLoaded();

    document.body.appendChild(script);
  }

  componentDidUpdate(prevProps: gameProps) {
    if (prevProps.isStart !== this.props.isStart && this.props.isStart) {
      this.randomNumber();
    }
    if (this.props.onReset) {
      this.onResetGame();
    }
  }

  scriptLoaded() {
    this.voice = window.responsiveVoice;
  }

  createNumbers() {
    for (let i = 1; i <= 90; i++) {
      this.numbers[i - 1] = i;
    }
  }

  randomNumber() {
    if (this.breakButton || !this.props.isStart || this.numbers.length === 0) {
      return;
    }
    let number = this.numbers[Math.floor(Math.random() * this.numbers.length)]
    this.numbers.splice(this.numbers.indexOf(number), 1);
    this.listNumber.push(number);
    if (number === 90) {
      this.oldNumbers[8].push(number);
      this.oldNumbers[8].sort();
    } else {
      let quotient = Math.floor(number/10);
      this.oldNumbers[quotient].push(number);
      this.oldNumbers[quotient].sort();
    }

    this.breakButton = true;
    window.setTimeout(() => {
      this.breakButton = false;
      this.randomNumber();
    }, this.props.speed);
    this.voiceGG(number);
    this.setState({
      randNumber: number
    });
  }

  onResetGame() {
    this.breakButton = false;
    this.createNumbers();

    this.setState({
      randNumber: 0
    });
    this.listNumber = [];
    this.oldNumbers = [[], [], [], [], [], [], [], [], []];
    this.props.resetFinish();
  }

  voiceGG(num: number) { //"Vietnamese Male"
    this.voice.speak(num.toString(), "Vietnamese Male", {volume: 1, rate: 1});
  }

  render() {
    return (
      <React.Fragment>
        <Row className="main-game">
          <Col span={9} className="b-random-number">
            { this.state.randNumber > 0 &&
              <Row className="b-number" justify="center" align="middle">
                <span className="ran-number"
                  style={{ borderColor: this.state.randNumber > 45 ? "#005800" : "#e03e00" }}>
                  {this.state.randNumber}
                </span>
              </Row>
            }
          </Col>
          <List className="l-lv-number" dataSource={this.oldNumbers} renderItem={items => (
            <List.Item>
              <Row className="b-lv-number">
                { items.map((num: any, index: number) => {
                  return (
                  <Col className="r-number" key={index}
                  style={{ borderColor: num > 45 ? "#005800" : "#e03e00" }}>
                    {num}
                  </Col>) 
                })}
              </Row>
            </List.Item>
            )}
          />
        </Row>
        <Row className="b-history">
          { this.listNumber.map((num, index) => {
            return (
            <Col className="r-number" key={index}
            style={{ margin: "5px", borderColor: num > 45 ? "#005800" : "#e03e00" }}>
              {num}
            </Col>) 
          })}
        </Row>
      </React.Fragment>
    );
  }
}

export default RandomNumber;

import React from 'react';
import { Button, Slider } from 'antd';
import {
  SendOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import RandomNumber from '../RandomNumber';
import { SliderValue } from 'antd/lib/slider';
import Tickets from '../Tickets';
import Ticket from '../Ticket';
import SelectType from '../SelectType';

class Main extends React.Component {
  state = {
    collapsed: false,
    starting: false,
    isReset: false,
    speed: 3000,
    tab: 0,
    isSelectedTicket: false,
    ticketsSelected: [],
    resetTicket: false
  };

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://code.responsivevoice.org/responsivevoice.js?key=e9a32weJ";
    script.async = true;

    document.body.appendChild(script);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  resetGame = () => {
    this.setState({
      starting: false,
      isReset: true
    });
  }

  selectSpeed = (value: SliderValue) => {
    this.setState({
      speed: (6 - Number(value)) * 1000
    });
  }

  setTabChange(tab: number) {
    if (tab === 2) {
      this.resetGame();
    }
    setTimeout(() => {
      this.setState({
        tab: tab
      });
    }, 0);
  }

  buildTickets() {
    if (this.state.isSelectedTicket) {
      return <React.Fragment>
        { !this.state.resetTicket &&
          this.state.ticketsSelected.map((ticket, i) => {
            return (
              <div key={i} className={this.state.ticketsSelected.length > 1 ? "ticketSelected-50" : "ticketSelected"}>
                <Ticket key={"tick-" + i} ticket={ticket} />
              </div>
            )
          })
        }
      </React.Fragment>
    } else {
      return <Tickets onSelect={(tickets) => {this.setState({ticketsSelected: tickets})}} />
    }
  }

  re_selectTicket() {
    if (this.state.isSelectedTicket) {
      this.setState({
        ticketsSelected: []
      });
    }
    this.setState({
      isSelectedTicket: !this.state.isSelectedTicket
    });
  }

  resetTicket() {
    this.setState({
      resetTicket: true
    });
    setTimeout(() => {
      this.setState({
        resetTicket: false
      });
    }, 0);
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-loto">
        { this.state.tab === 0 &&
          <SelectType setTabChange={(tab) => this.setTabChange(tab)} />
        }
        { this.state.tab === 1 &&
          <React.Fragment>
            <div className="header-read">
              <Button className="btn-header" type="primary" shape="round" icon={<SendOutlined />}
                onClick={() => this.setState({ starting: !this.state.starting })}>
                { this.state.starting ? "Dừng" : "Bắt Đầu" }
              </Button>
              <Button className="btn-header" type="primary" shape="round" icon={<RedoOutlined />}
                onClick={this.resetGame}>
                Ván Mới
              </Button>
              <div className="speed">
                <span>Tốc Độ:</span>
                <Slider defaultValue={3} min={1} max={5} onChange={(value) => this.selectSpeed(value)} style={{width: "78%"}} />
              </div>
              <RandomNumber isStart={this.state.starting} onReset={this.state.isReset}
                speed={this.state.speed} resetFinish={() => {this.setState({isReset: false})}} />
            </div>
          </React.Fragment>
        }
        { this.state.tab === 2 &&
          <React.Fragment>
            <div className="header-read">
              <Button disabled={this.state.ticketsSelected.length === 0} className="btn-header"
                type="primary" shape="round" icon={<SendOutlined />}
                onClick={() => this.re_selectTicket()}>
                { this.state.isSelectedTicket ? "Chọn Lại" : "Chọn Vé" }
              </Button>
              { this.state.isSelectedTicket &&
              <Button className="btn-header" type="primary" shape="round" icon={<RedoOutlined />}
                onClick={() => this.resetTicket()}>
                Chơi Lại
              </Button> }
            </div>
            { this.buildTickets() }
          </React.Fragment>
        }
      </div>
      </React.Fragment>
    );
  }
}

export default Main;

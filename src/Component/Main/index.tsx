import React from 'react';
import { Layout, Menu, Button, Space, Slider } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SendOutlined,
  RedoOutlined,
  SolutionOutlined,
  DollarCircleOutlined,
  SoundOutlined
} from '@ant-design/icons';
import RandomNumber from '../RandomNumber';
import { SliderValue } from 'antd/lib/slider';
import Tickets from '../Tickets';
import Ticket from '../Ticket';

const { Header, Sider, Content } = Layout;

class Main extends React.Component {
  state = {
    collapsed: false,
    starting: false,
    isReset: false,
    speed: 3000,
    tab: 1,
    isSelectedTicket: false,
    ticketsSelected: []
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
      speed: Number(value) * 1000
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
        {
          this.state.ticketsSelected.map((ticket, i) => {
            return (
              <div key={i} className="ticketSelected">
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


  resetTicket = () => {

  }

  render() {
    return (
      <React.Fragment>
        <Layout className="main-loto">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo"><DollarCircleOutlined style={{marginRight: 24}} />Lô Tô</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={() => this.setTabChange(1)}>
              <SoundOutlined />
              <span>Đọc Số</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => this.setTabChange(2)}>
              <SolutionOutlined />
              <span>Dò Số</span>
            </Menu.Item>
          </Menu>
        </Sider>
        { this.state.tab === 1 &&
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
              <Space size={40}>
                <Space size={40}>
                  <Button className="btn-header" type="primary" shape="round" icon={<SendOutlined />} size={"large"}
                    onClick={() => this.setState({ starting: !this.state.starting })}>
                    { this.state.starting ? "Dừng" : "Bắt Đầu" }
                  </Button>
                  <Button className="btn-header" type="primary" shape="round" icon={<RedoOutlined />} size={"large"}
                    onClick={this.resetGame}>
                    Ván Mới
                  </Button>
                </Space>
                <Space size={10}>
                  Tốc Độ:
                  <Slider defaultValue={3} min={1} max={10} onChange={(value) => this.selectSpeed(value)} style={{width: 300}} />
                </Space>
              </Space>
            </Header>
            <Content className="site-layout-background" style={{ margin: '24px 16px', minHeight: 580 }}>
              <RandomNumber isStart={this.state.starting} onReset={this.state.isReset}
                speed={this.state.speed} resetFinish={() => {this.setState({isReset: false})}} />
            </Content>
          </Layout>
        }
        { this.state.tab === 2 &&
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
              <Space size={40}>
                <Button disabled={this.state.ticketsSelected.length === 0} className="btn-header"
                  type="primary" shape="round" icon={<SendOutlined />} size={"large"}
                  onClick={() => this.setState({ isSelectedTicket: !this.state.isSelectedTicket })}>
                  { this.state.isSelectedTicket ? "Chọn Lại" : "Chọn Vé" }
                </Button>
                  { this.state.isSelectedTicket &&
                  <Button className="btn-header" type="primary" shape="round" icon={<RedoOutlined />} size={"large"}
                    onClick={this.resetTicket}>
                    Chơi Lại
                  </Button> }
              </Space>
            </Header>
            <Content className="site-layout-background" style={{ margin: '24px 16px', minHeight: 580 }}>
              { this.buildTickets() }
            </Content>
          </Layout>
        }
      </Layout>
      </React.Fragment>
    );
  }
}

export default Main;

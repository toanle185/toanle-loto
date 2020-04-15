import React from 'react';
import { Layout, Menu, Button, Space, Select, Slider } from 'antd';
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

const { Header, Sider, Content } = Layout;
const { Option } = Select;

class Main extends React.Component {
  state = {
    collapsed: false,
    starting: false,
    isReset: false,
    speed: 3000
  };

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

  render() {
    return (
      <React.Fragment>
        <Layout className="main-loto">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo"><DollarCircleOutlined style={{marginRight: 24}} />Lô Tô</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <SoundOutlined />
              <span>Đọc Số</span>
            </Menu.Item>
            <Menu.Item key="2">
              <SolutionOutlined />
              <span>Dò Số</span>
            </Menu.Item>
          </Menu>
        </Sider>
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
                  { this.state.starting ? "Stop" : "Start" }
                </Button>
                <Button className="btn-header" type="primary" shape="round" icon={<RedoOutlined />} size={"large"}
                  onClick={this.resetGame}>
                  Reset
                </Button>
              </Space>
              <Space size={10}>
                Tốc Độ:
                <Slider defaultValue={3} min={1} max={10} onChange={(value) => this.selectSpeed(value)} style={{width: 300}} />
              </Space>
            </Space>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              minHeight: 580,
            }}
          >
            <RandomNumber isStart={this.state.starting} onReset={this.state.isReset}
              speed={this.state.speed} resetFinish={() => {this.setState({isReset: false})}} />
          </Content>
        </Layout>
      </Layout>
      </React.Fragment>
    );
  }
}

export default Main;

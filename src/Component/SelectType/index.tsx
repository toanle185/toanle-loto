import React from 'react';
import { DollarCircleOutlined, SoundOutlined, SolutionOutlined } from '@ant-design/icons';
import logo from "../../logo.jpg";
import { Button } from 'antd';

export interface SelectTypeProps {
  setTabChange: (tab: number) => void
}

class SelectType extends React.Component<SelectTypeProps> {

  render() {
    return (
      <div className="first-block">
        <div className="logo"><DollarCircleOutlined style={{marginRight: 20}} />Lô Tô<DollarCircleOutlined style={{marginLeft: 20}} /></div>
        <div className="logo-image">
          <img src={logo} alt=""/>
        </div>
        <div className="btn-first-block">
          <Button type="primary" shape="round" icon={<SoundOutlined />}
            onClick={() => this.props.setTabChange(1)}>
            Chế Độ Đọc Số
          </Button>
          <br />
          <Button type="primary" shape="round" icon={<SolutionOutlined />}
            onClick={() => this.props.setTabChange(2)}>
            Chế Độ Dò
          </Button>
        </div>
      </div>
    );
  }
}

export default SelectType;

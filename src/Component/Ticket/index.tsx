import React from 'react';
import { Row, Col } from 'antd';

export interface TicketProps {
  ticket: { data: number[][], color: string }
}

class Ticket extends React.Component<TicketProps> {

  componentDidMount() {

  }

  onSelectNumber(event: React.MouseEvent<HTMLDivElement, MouseEvent>, num: number) {
    if (num === 0) {
      return;
    }
    let ele = event.currentTarget.classList;
    if (ele.contains("activeNumber")) {
      ele.remove("activeNumber");
    } else {
      ele.add("activeNumber");
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="ticket">
          { this.props.ticket.data.map((row, i) => {
            return (<Row className="ticket-row" key={i}>
              {
                row.map((item, iCol) => {
                  return (
                    <Col key={iCol} className="ticket-col" style={{backgroundColor: item === 0 ? this.props.ticket.color : "#fff"}}
                      onClick={(event) => this.onSelectNumber(event, item)}>
                      {item > 0 && <span className="scale-number"
                        style={{transform: item < 10 ? "scale(.4, 1) translate(-24%, -52%)" : "scale(.4, 1) translate(-73%, -52%)"}}>{item}</span>}
                    </Col>
                  )
                })
              }
            </Row>)
          }) }
        </div>
      </React.Fragment>
    );
  }
}

export default Ticket;

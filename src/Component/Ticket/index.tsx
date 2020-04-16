import React from 'react';
import { Row, Col } from 'antd';

export interface TicketProps {
  ticket: { data: number[][], color: string }
}

class Ticket extends React.Component<TicketProps> {

  componentDidMount() {

  }

  render() {
    return (
      <React.Fragment>
        <div className="ticket">
          { this.props.ticket.data.map(row => {
            return (<Row className="ticket-row">
              {
                row.map((item) => {
                  return (<Col className="ticket-col" style={{backgroundColor: item === 0 ? this.props.ticket.color : "#fff"}}>
                    {item > 0 && <span className="scale-number"
                      style={{transform: item < 10 ? "scale(.4, 1) translate(-24%, -51%)" : "scale(.4, 1) translate(-73%, -51%)"}}>{item}</span>}
                  </Col>)
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

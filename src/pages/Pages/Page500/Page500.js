import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Page500 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <span className="clearfix">
                <h1 className="float-left display-3 mr-4">500</h1>
                <h4 className="pt-3">服务端出问题了!</h4>
                <p className="text-muted float-left">您请求的页面暂时不可达</p>
              </span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page500;

import React, { Component, Fragment } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Input } from '@icedesign/base';
import {
  FormBinderWrapper,
  FormBinder,
} from '@icedesign/form-binder';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { userLogin, passwordForgetTip } from './actions';
import reducer from './reducer';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        username: '',
        password: '',
      }
    }
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      this.props.userLogin(values);
    });
  };

  render() {
    const { passwordForgetTip } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <FormBinderWrapper
                      value={this.state.value}
                      onChange={this.formChange}
                      ref="form"
                    >
                      <Fragment>
                        <h1>登录</h1>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormBinder name="username" required message="必填">
                            <Input htmlType="text" placeholder="用户名" />
                          </FormBinder>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormBinder name="password" required message="必填">
                            <Input htmlType="password" placeholder="密码" />
                          </FormBinder>
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button color="primary" onClick={this.handleSubmit} className="px-4">确认</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0" onClick={passwordForgetTip}>忘记密码?</Button>
                          </Col>
                        </Row>
                      </Fragment>
                    </FormBinderWrapper>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: `${44}%` }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>OS开源-控制台</h2>
                      <p>Powered by Video++
                      </p>
                      <Button color="primary" className="mt-3" active>联系我们</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogin,
  passwordForgetTip
};

const mapStateToProps = (state) => {
  return { loginResult: state.login };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withReducer,
  withConnect
)(Login);

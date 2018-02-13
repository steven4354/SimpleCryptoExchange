import React, {Component} from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card
} from "reactstrap";
import {Link} from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs="3" />
          <Col>
            <Card body style={{marginTop: "100px"}}>
              <Form>
                <FormGroup>
                  {" "}
                  <Label for="username">Login with your username</Label>
                  <Input type="text" name="username" id="username" />
                </FormGroup>
              </Form>
              <Link to="/register">First time? Create an account here</Link>
            </Card>
          </Col>
          <Col xs="3" />
        </Row>
      </Container>
    );
  }
}

export default Login;

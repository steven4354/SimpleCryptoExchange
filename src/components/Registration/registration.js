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

class Registration extends Component {
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
                  <Label for="username">Create a username</Label>
                  <Input type="text" name="username" id="username" />
                </FormGroup>
              </Form>
            </Card>
          </Col>
          <Col xs="3" />
        </Row>
      </Container>
    );
  }
}

export default Registration;

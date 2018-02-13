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
import serialize from "form-serialize";

class Login extends Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();

    var form = document.querySelector("#login");
    var obj = serialize(form, {hash: true});

    fetch(`http://localhost:3000/api/login/${obj.username}`)
      .then(response => {
        return response.json();
      })
      .then(readable => {
        console.log("readable response =>", readable);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="3" />
          <Col>
            <Card body style={{marginTop: "100px"}}>
              <Form id="login" onSubmit={this.submitForm}>
                <FormGroup>
                  {" "}
                  <Label for="username">Login with your username</Label>
                  <Input type="text" name="username" id="username" />
                </FormGroup>
                <Button outline type="submit">
                  Submit
                </Button>
              </Form>
            </Card>
            <Link
              style={{marginLeft: "5px", paddingTop: "30px"}}
              to="/register"
            >
              First time? Create an account here
            </Link>
          </Col>
          <Col xs="3" />
        </Row>
      </Container>
    );
  }
}

export default Login;

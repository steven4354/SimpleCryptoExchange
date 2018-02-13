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
import Loader from "react-loader";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      fetched: false,
      data: null
    };
  }

  componentDidMount() {
    fetch("https://api.coinmarketcap.com/v1/ticker/")
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {
        return json.filter(obj => {
          return (
            obj.id == "bitcoin" ||
            obj.id == "litecoin" ||
            obj.id == "litecoin" ||
            obj.id == "dogecoin" ||
            obj.id == "monero"
          );
        });
      })
      .then(filtered => {
        console.log("coins data => ", filtered);
        this.setState({
          fetched: true,
          data: filtered
        });
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="3" />
          <Col>
            <Card body style={{marginTop: "100px", padding: "40px"}}>
              <Loader loaded={this.state.fetched}>
                <div> data </div>
              </Loader>
            </Card>
          </Col>
          <Col xs="3" />
        </Row>
      </Container>
    );
  }
}

export default Login;

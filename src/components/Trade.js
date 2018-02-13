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
  Table,
  Card
} from "reactstrap";
import {Link} from "react-router-dom";
import serialize from "form-serialize";
import Loader from "react-loader";

class Trade extends Component {
  constructor(props) {
    super();
  }

  render() {
    console.log("trade props =>", this.props);
    console.log("previous link state =>", this.props.location.state);

    return (
      <Container>
        <Row>
          <Col xs="3" />
          <Col>
            <Card body style={{marginTop: "100px", padding: "40px"}}>
              Trade
            </Card>
          </Col>
          <Col xs="3" />
        </Row>
      </Container>
    );
  }
}

export default Trade;

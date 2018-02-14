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
  Card,
  CardTitle
} from "reactstrap";
import {Link} from "react-router-dom";
import serialize from "form-serialize";
import Loader from "react-loader";

class Trade extends Component {
  constructor(props) {
    super();
    this.state = {
      fetched: false,
      userinfo: null
    };
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    let username = this.props.location.state.username;
    fetch(`http://localhost:3000/api/userinfo/${username}`)
      .then(response => {
        return response.json();
      })
      .then(readable => {
        console.log("readable from trade fetch =>", readable);
        this.setState({
          fetched: true,
          userinfo: readable
        });
        console.log("trade state =>", this.state);
      });
  }

  submitForm(e) {
    e.preventDefault();

    var form = document.querySelector("#trade");
    var obj = serialize(form, {hash: true});
    console.log("form obj => ", obj);

    var body = {
      ...obj,
      username: this.state.userinfo.username
    };

    console.log("request body to be sent => ", body);
    fetch(`http://localhost:3000/api/trade`, {
      method: "post",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        return response.json();
      })
      .then(readable => {
        console.log("readable response =>", readable);
        let username = readable.username || body.username;
        this.props.history.push(`/ticker/${username}`);
      });
  }

  render() {
    console.log("trade props =>", this.props);
    console.log("previous link state =>", this.props.location.state);
    let tradeCoin = this.props.location.state.coin;
    let username = this.props.location.state.username;

    return (
      <Container>
        <Row>
          <Col xs="3" />
          <Col>
            <Card body style={{marginTop: "100px", padding: "40px"}}>
              <Loader loaded={this.state.fetched}>
                {/*displays current balance*/}

                {this.state.fetched ? (
                  <div>
                    <CardTitle>
                      {this.state.userinfo.username}'s current balance
                    </CardTitle>
                    <div>
                      <strong>USD</strong>: {this.state.userinfo.usd}
                    </div>
                    <div>
                      <strong>Bitcoin</strong>: {this.state.userinfo.bitcoinNum}
                    </div>
                    <div>
                      <strong>Dogecoin</strong>:{" "}
                      {this.state.userinfo.dogecoinNum}
                    </div>
                    <div>
                      <strong>Monero</strong>: {this.state.userinfo.moneroNum}
                    </div>
                    <div>
                      <strong>Litecoin</strong>:{" "}
                      {this.state.userinfo.litecoinNum}
                    </div>
                  </div>
                ) : null}
              </Loader>
            </Card>
          </Col>
          <Col xs="3" />
        </Row>
        <Row>
          <Col xs="3" />
          <Col>
            <Card body style={{marginTop: "100px", padding: "40px"}}>
              <Loader loaded={this.state.fetched}>
                {/*checks if bitcoin # is nonexistant, if yes, tell user to convert usd to bitcoin first*/}
                {this.state.fetched &&
                tradeCoin !== "bitcoin" &&
                this.state.userinfo.bitcoinNum == 0 ? (
                  <div>
                    <CardTitle>
                      You are currently out of Bitcoin. To trade for{" "}
                      {tradeCoin[0].toUpperCase() + tradeCoin.slice(1)},
                      purchase some Bitcoins first.
                    </CardTitle>
                    <Form id="trade" onSubmit={this.submitForm}>
                      <FormGroup>
                        {" "}
                        <Label for="amountToConvertFrom">
                          How much of your USD balance would you like to convert
                          to Bitcoin?
                        </Label>
                        <Input
                          type="text"
                          name="amountToConvertFrom"
                          id="amountToConvertFrom"
                        />
                        <Input type="hidden" name="convertFrom" value="usd" />
                        <Input type="hidden" name="convertTo" value="bitcoin" />
                      </FormGroup>
                      <Button outline type="submit">
                        Submit
                      </Button>
                    </Form>
                  </div>
                ) : null}
                {this.state.fetched && tradeCoin == "bitcoin" ? (
                  <div>
                    <CardTitle>
                      Trade for{" "}
                      {tradeCoin[0].toUpperCase() + tradeCoin.slice(1)}.
                    </CardTitle>
                    <Form id="trade" onSubmit={this.submitForm}>
                      <FormGroup>
                        {" "}
                        <Label for="dollarsToBitcoin">
                          Dollar Amount You Want to Spend for Bitcoins
                        </Label>
                        <Input
                          type="text"
                          name="amountToConvertFrom"
                          id="amountToConvertFrom"
                        />
                        <Input type="hidden" name="convertFrom" value="usd" />
                        <Input type="hidden" name="convertTo" value="bitcoin" />
                      </FormGroup>
                      <Button outline type="submit">
                        Submit
                      </Button>
                    </Form>
                  </div>
                ) : null}
                {this.state.fetched &&
                this.state.userinfo.bitcoinNum > 0 &&
                tradeCoin !== "bitcoin" ? (
                  <div>
                    <CardTitle>
                      Trade for{" "}
                      {tradeCoin[0].toUpperCase() + tradeCoin.slice(1)}.
                    </CardTitle>
                    <Form id="trade" onSubmit={this.submitForm}>
                      <FormGroup>
                        {" "}
                        <Label
                          for={tradeCoin[0].toUpperCase() + tradeCoin.slice(1)}
                        >
                          Amount of Bitcoins to trade for{" "}
                          {tradeCoin[0].toUpperCase() + tradeCoin.slice(1)}{" "}
                          (Decimal Values Accepted)
                        </Label>
                        <Input
                          type="text"
                          name="amountToConvertFrom"
                          id="amountToConvertFrom"
                        />
                        <Input
                          type="hidden"
                          name="convertFrom"
                          value="bitcoin"
                        />
                        <Input
                          type="hidden"
                          name="convertTo"
                          value={tradeCoin}
                        />
                      </FormGroup>
                      <Button outline type="submit">
                        Submit
                      </Button>
                    </Form>
                  </div>
                ) : null}
              </Loader>
            </Card>
          </Col>
          <Col xs="3" />
        </Row>
      </Container>
    );
  }
}

export default Trade;

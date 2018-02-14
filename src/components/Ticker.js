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

class Ticker extends Component {
  constructor() {
    super();
    this.state = {
      fetched: false,
      data: null,
      userinfo: null
    };
  }

  //grabbing coins prices data
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
        this.setState({
          data: filtered
        });

        //second fetch to grab userinfo
        let username = this.props.match.params.username;
        fetch(`http://localhost:3000/api/userinfo/${username}`)
          .then(response => {
            return response.json();
          })
          .then(readable => {
            this.setState({
              fetched: true,
              userinfo: readable
            });
          });
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Card body style={{marginTop: "100px", padding: "40px"}}>
              <Loader loaded={this.state.fetched}>
                <Table>
                  <thead>
                    <tr>
                      <th>Coin</th>
                      <th>Price in USD</th>
                      <th>Price in BTC</th>
                      <th>Trade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.fetched ? (
                      this.state.data.map(obj => {
                        return (
                          <tr key={obj.id}>
                            <th scope="row">{obj.id}</th>
                            <td>{obj.price_usd}</td>
                            <td>{obj.price_btc}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: "/trade",
                                  state: {
                                    coin: obj.id,
                                    usd_price: obj.price_usd,
                                    btc_price: obj.price_btc,
                                    username: this.props.match.params.username
                                  }
                                }}
                              >
                                Trade
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div> Loading </div>
                    )}
                  </tbody>
                </Table>
              </Loader>
            </Card>
          </Col>
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
        </Row>
      </Container>
    );
  }
}

export default Ticker;

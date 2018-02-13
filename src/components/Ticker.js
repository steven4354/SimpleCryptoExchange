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

class Ticker extends Component {
  constructor() {
    super();
    this.state = {
      fetched: false,
      data: null
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
                                    btc_price: obj.price_btc
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
          <Col xs="3" />
        </Row>
      </Container>
    );
  }
}

export default Ticker;

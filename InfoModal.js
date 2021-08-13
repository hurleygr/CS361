import React, { Component } from "react";
import {
  Button,
  Modal,
} from "react-bootstrap";

export default class InfoModal extends Component {
    constructor(props) {

        super(props);
        
        this.state = {
          showModal: false,
          smShow: false
        }

}
render() {
    return (
        <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.onClose}
          onSubmit={this.onSubmit}
          bsSize="large"
        >
          <Modal.Header >
            <h2> App Introduction </h2>
          </Modal.Header>
          <Modal.Body>
              <ol>
              <li>
                Type a company name or stock into the search bar
            </li>
            <li>
                Click add stock and the stock will appear in your dashboard
            </li>
            <li>
                Each stock card shows stock ticker, company name, and price in that order
            </li>
            <li>
                The last button will provide more info on each stock. Click it!
            </li>
            <li>
                Create an account with the Register button in the upper left.
            </li>
            <li>
                Click close if you're ready to begin.
            </li>
              </ol>
              
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
    )}
}
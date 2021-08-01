import React, { Component } from "react";
import {
  Button,
  Modal,
} from "react-bootstrap";

class SignOut extends Component {
    constructor(props) {
        super(props);
    }

render() {
    return (
    <form>
        <div className="form-action" style={{paddingTop:10}}>
            <button
                type="button"
                onClick={() => this.props.fun(null)}
                className="btn btn-primary btn-left">Sign Out <span className="icon-arrow-right2 outlined"></span>
            </button>
        </div>
    </form>
    )}
    }
export default SignOut;
import React from "react";

const Register = () => {
return (

      <form>
        <p className="h4 text-center mb-4">Sign up</p>
        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
          Your name
        </label>
        <br/>
        <input type="text" id="defaultFormRegisterNameEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          Your email
        </label>
        <br/>
        <input type="email" id="defaultFormRegisterEmailEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          Confirm your email
        </label>
        <br/>
        <input type="email" id="defaultFormRegisterConfirmEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          Your password
        </label>
        <input type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
        <br/>
        <button type="submit">Register</button>
      </form>
    
);
};

export default Register;
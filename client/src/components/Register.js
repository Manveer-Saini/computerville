import React, { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Register = props => {
  const [confirmReg, setConfirmReg] = useState("");
  const [errs, setErrs] = useState({});

  // CHECK THIS OUT!!!!
  //    using a single state object to hold all data!
  const [ user, setUser ] = useState({
    firstName: "",
    lastName: "",
    email: "", 
    address: "",
    city: "",
    state: "",
    password: "", 
    confirmPassword: "",
  })

  // using a single function to update the state object
  //    we can use the input's name attribute as the key in to the object
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const register = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/users/register", 
      user,  // the user state is already an object with the correct keys and values!
      {
        // this will force the sending of the credentials / cookies so they can be updated
        //    XMLHttpRequest from a different domain cannot set cookie values for their own domain 
        //    unless withCredentials is set to true before making the request
        withCredentials: true,
      }
      
      )
      .then(res => {
        console.log(res.data);
        // when we successfully created the account, reset state for registration form
        //    We do this if we are NOT navigating automatically away from the page
        setUser({
          firstName: "",
          lastName: "",
          email: "", 
          address: "",
          city: "",
          state: "",
          password: "", 
          confirmPassword: "",
        })
        setConfirmReg("Thank you for Registering, you can now log in!");
        setErrs({});  // remember to reset errors state if it was successful
      })
      .catch((err) => {
        console.log(err);
        setErrs(err.response.data.errors);
      });
  };

  return (
    <div className="page">

      <div className="form">
        <h2>Register</h2>
        {
          confirmReg ? 
            <h4 style={{color: "green"}}>{confirmReg}</h4>
            : null
        }
        <Form onSubmit={register}>
        <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={(e) => handleChange(e)}
                />
                <br/>
                {
                  errs.firstName ? 
                    <span className="error-text" style={{color:"red"}}>{ errs.firstName.message }</span>
                    : null
                }
            </Form.Group>

          <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={(e) => handleChange(e)}
                />
                <br/>
                {
                  errs.lastName ? 
                    <span className="error-text" style={{color:"red"}}>{ errs.lastName.message }</span>
                    : null
                }
            </Form.Group>
          </Row>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            {
              errs.email? 
                <span className="error-text" style={{color:"red"}}>{ errs.email.message }</span>
                : null
            }
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={user.address}
                onChange={(e) => handleChange(e)}
                />
                <br/>
                {
                  errs.address ? 
                    <span className="error-text" style={{color:"red"}}>{ errs.address.message }</span>
                    : null
                }
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={user.city}
                  onChange={(e) => handleChange(e)}
                  />
                  <br/>
                  {
                    errs.city ? 
                      <span className="error-text" style={{color:"red"}}>{ errs.city.message }</span>
                      : null
                  }
              </Form.Group>

              <Form.Group as={Col}>
                    <Form.Label htmlFor="state">State</Form.Label>
                        <Form.Select onChange={(e) => handleChange(e)} name="state" value={user.state}>
                            <option value="AL" defaultValue hidden>
                            AL
                            </option>
                            <option value="AL">AL</option>
                            <option value="AK">AK</option>
                            <option value="AR">AR</option>	
                            <option value="AZ">AZ</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DC">DC</option>
                            <option value="DE">DE</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="IA">IA</option>	
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="MA">MA</option>
                            <option value="MD">MD</option>
                            <option value="ME">ME</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MO">MO</option>	
                            <option value="MS">MS</option>
                            <option value="MT">MT</option>
                            <option value="NC">NC</option>	
                            <option value="NE">NE</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>			
                            <option value="NV">NV</option>
                            <option value="NY">NY</option>
                            <option value="ND">ND</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VT">VT</option>
                            <option value="VA">VA</option>
                            <option value="WA">WA</option>
                            <option value="WI">WI</option>	
                            <option value="WV">WV</option>
                            <option value="WY">WY</option>
                        </Form.Select>
                        {
                            errs.state ?
                            //change to className error-text
                            <span>{errs.state.message}</span>
                            : null
                        }   
                    </Form.Group>
            </Row>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            {
              errs.password ? 
                <span className="error-text" style={{color:"red"}}>{ errs.password.message }</span>
                : null
            }
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            {
              errs.confirmPassword? 
                <span className="error-text" style={{color:"red"}}>{ errs.confirmPassword.message }</span>
                : null
            }
            <Form.Control
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={ handleChange }
            />
          </Form.Group>
          <div className="center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
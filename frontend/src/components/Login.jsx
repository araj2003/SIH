
import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalContext } from '../context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const {submitRegistration,email,setEmail,username,setUsername,password,setPassword,submitLogin,registrationToggle,age,setAge,sex,setSex,medicalhistory,setMedicalHistory} = useGlobalContext();
    return (
        <div>
        {
          registrationToggle ? (
            <div className="center">
              <Form onSubmit={e => submitRegistration(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" placeholder="Enter your age" value={age} onChange={e => setAge(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Sex</Form.Label>
              <Form.Control type="text" placeholder="Enter your sex" value={sex} onChange={e => setSex(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formMedicalHistory">
              <Form.Label>Medical History</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter medical history, separated by commas"
                value={medicalhistory.join(",")}
                onChange={(e) => setMedicalHistory(e.target.value.split(","))}
              />
            </Form.Group>
            
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>        
          ) : (
            <div className="center">
              <Form onSubmit={e => submitLogin(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          )
        }
        </div>
      );
}

export default Login

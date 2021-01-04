import React, { useState} from 'react'
import {Button, Col, Container, Form, FormControl, FormGroup, Row} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import Swal from 'sweetalert2';
import { getLogin } from '../actions/loginActions';
import '../styles/login.scss';
// import { useAlert } from 'react-alert'
const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    // const alert=useAlert()
    const history=useHistory()
    const dispatch = useDispatch()
    // let data=localStorage.getItem("myData")
    // JSON.parse(JSON.stringify(data))
    // let obj=JSON.parse(data)
    let obj
    const submitLogin=(e)=>{
        e.preventDefault()
        obj={'email':email,'password':password}
        dispatch(getLogin(obj))
        // alert.error("Invalid credentials")
        // console.log(login)        
    }
    const checkLogin=()=>{
        let check=localStorage.getItem("token")
        if(check){
            history.push('/tournaments')
        }
    }
    const handleGuest=()=>{
        localStorage.clear()
        localStorage.setItem("guest","guest")
        history.push('/guesttournaments')
    }
    return (
        <div className="screenwidth login" onLoad={checkLogin()}>
            <div className="formdiv">
                <div className="text-center">
                    <h1 className="text-white">Login</h1>
                </div>
            <Form onSubmit={submitLogin}>
                <FormGroup controlId="email">
                    <FormControl type="email" placeholder="email address"  pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required autoFocus value={email} onChange={e=>setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <FormControl type="password" placeholder="password" required value={password} onChange={e=>setPassword(e.target.value)} />
                </FormGroup>
                <Row>
                    <Col xs={3}></Col>
                    <Col xs={6}>
                <Button type="submit" size="lg" className="btn-block bg-white text-primary" >Continue</Button>
                </Col>
                <Col className="text-center"><Button variant="link" onClick={()=>history.push('/')}></Button></Col>
                <Col className="text-center"><Button variant="link" onClick={()=>history.push('/mail')}>Forgot password</Button></Col>
                </Row>
            </Form>
            </div>
            {/* </Col>
            </Row> */}
            <div className="footer text-center">
            <Container>
                <Row >
                    <Col lg={4} ></Col>
                <Col lg={4} className="text-center">
                New here?
                <Button variant="link" onClick={()=>history.push('/Signup')}>Sign up</Button>
                </Col>
                </Row>
                <Row >
                    <Col lg={4} ></Col>
                <Col lg={4} className="text-center">
                Continue as a
                <Button variant="link" onClick={handleGuest}>guest</Button>
                </Col>
                </Row>
            </Container>
            </div>
        </div>
    )
}

export default Login

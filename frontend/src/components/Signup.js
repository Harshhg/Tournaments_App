import React, {  useState } from 'react'
import { Button, Container, Form, Row ,Col, InputGroup } from 'react-bootstrap'
import { EyeFill, EyeSlash } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getsignup } from '../actions/signupAction'
import { useAlert } from 'react-alert'
import '../styles/signup.scss'
const Signup=()=>{
    const [fname,setFirstName]=useState("")
    const [lname,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmPassword]=useState("")
    const [hideconfirm,setHideConfirm]=useState(true)
    const [hidepassword,setHidePassword]=useState(true)
    const history=useHistory()
    const dispatch = useDispatch()
    const alert=useAlert()
    const validation=()=>{
        if(fname===" "){
            alert.show("First name cannot be empty")
            return false;
        }else if(lname===" "){
            alert.error("last name cannot be empty !")
            return false;
        }else if(password!==confirmpassword){
            alert.error("Password doesnot match !")
            return false;
        }
        return true;

    }
    const submitSignup=(e)=>{
        e.preventDefault()
        const isvalid=validation()
        if(isvalid){
            let obj={'first_name':fname,'last_name':lname,'email':email,'password':password}
            dispatch(getsignup(obj))
        }
        // console.log("is valid ",isvalid)
        
    }
    const handleconfirm=(props)=>{
        hideconfirm?setHideConfirm(false):setHideConfirm(true)
    }
    const handlePassword=(props)=>{
        hidepassword?setHidePassword(false):setHidePassword(true)
    }
    const checkLogin=()=>{
        let check=localStorage.getItem("token")
        if(check){
            history.push('/tournaments')
        }
    }
    return (
        <div className="screenwidth login" onLoad={checkLogin()}>
            <div className="formdiv">
            <div className="text-center">
                        <h1 className="text-white">Sign up</h1>
                    </div>
                <Form onSubmit={submitSignup}>
                    <Form.Group controlId="fname">
                       <Form.Control lg={6} type="text" placeholder="First name" required autoFocus value={fname} onChange={e=>setFirstName(e.target.value)} />
                        </Form.Group>
                    <Form.Group controlId="lname">
                    <Form.Control type="text" placeholder="Last name" required value={lname} onChange={e=>setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control type="email" placeholder="Email address" required value={email} onChange={e=>setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="password">
                    <InputGroup className="mb-2">
                        <Form.Control type={hidepassword?"password":"text"} placeholder="Password" required value={password} data-toggle="password" onChange={e=>setPassword(e.target.value)} />
                        <InputGroup.Append>
                        <InputGroup.Text>{hidepassword?<EyeFill onClick={handlePassword} />:<EyeSlash onClick={handlePassword} />}</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="confirmpassword">
                        <InputGroup className="mb-2">
                        <Form.Control type={hideconfirm?"password":"text"} placeholder="Confirm password" required value={confirmpassword} onChange={e=>setConfirmPassword(e.target.value)} />
                        <InputGroup.Append>
                        <InputGroup.Text>{hideconfirm?<EyeFill onClick={handleconfirm} />:<EyeSlash onClick={handleconfirm} />}</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    </Form.Group>
                    <p id="confirm" className="alert-danger"></p>
                    <Row>
                        <Col xs={4} sm={4} />
                        <Col xs={4} sx={4}>
                    <Button  type="submit" className="btn-block bg-white text-primary" >Sign in</Button>
                    </Col>
                    </Row>
                </Form>
            </div>
            <div className="footer">
            <Container>
                <Row >
                    <Col xs={4} />
                    <Col xs={4} className="text-center">
                        Already have an account ? 
                        <Button variant="link" onClick={()=>history.push('/Login')}>Login</Button> 
                    </Col>
                </Row> 
            </Container>
            </div>
        </div>
    )
}

export default Signup

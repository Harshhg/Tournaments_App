import React, {  useState } from 'react'
import { Button, Container, Form, Row ,Col, InputGroup } from 'react-bootstrap'
import { EyeFill, EyeSlash } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getsignup } from '../actions/signupAction'
import '../styles/signup.scss'
import { useAlert } from 'react-alert'
function Signup() {
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
            // document.getElementById("fname").setCustomValidity("Name cannot be null or left blank");
            alert.show("First name cannot be empty")
            return false;
        }else if(lname===" "){
            // document.getElementById('lname').setCustomValidity("Last name cannot be left blank.");
            alert.error("last name cannot be empty !")
            return false;
        }else if(password!==confirmpassword){
            // document.getElementById("confirmpassword").setCustomValidity("Passwords Don't Match");
            // document.getElementById("confirm").innerHTML="Password mismatch";
            alert.error("Password cannot match with confirm password !")
            return false;
        }
        return true;

    }
    function submitSignup(e){
        e.preventDefault()
        // if(password===confirmpassword){
        // let obj={'first_name':fname,'last_name':lname,'email':email,'password':password}
        // dispatch(getsignup(obj))
        // }else 
        // if(fname===" "){
        //     e.preventDefault()
        //     document.getElementById("fname").setCustomValidity("Name cannot be null or left blank")
        // }else if(lname===" "){
        //     e.preventDefault()
        //     document.getElementById('lname').setCustomValidity("Last name cannot be left blank.")
        // }else if(password!==confirmpassword){
        //     document.getElementById("confirmpassword").setCustomValidity("Passwords Don't Match");
        //     // document.getElementById("confirm").innerHTML="Password mismatch";
        // }else{
        //     e.preventDefault()
        //     let obj={'first_name':fname,'last_name':lname,'email':email,'password':password}
        //     dispatch(getsignup(obj))
        // }
        const isvalid=validation()
        if(isvalid){
            let obj={'first_name':fname,'last_name':lname,'email':email,'password':password}
            dispatch(getsignup(obj))
        }
        console.log("is valid ",isvalid)
        
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

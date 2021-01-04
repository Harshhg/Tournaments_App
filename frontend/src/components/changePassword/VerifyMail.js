import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const VerifyMail = (data) => {
    // console.log(data.location.state.mail)
    const [otp,setOtp]=useState("")
    // const [email,setEmail]=useState("")
    const email=data.location.state.mail
    const history=useHistory()
    let obj={'email':email,'otp':otp}
    const handleVerify=(e)=>{
        e.preventDefault()
        
        axios.post('http://139.59.16.180:8001/verifyOTP/',obj)
        .then(response=>{
            if(response.data.error_status===0){
                Swal.fire({
                    title:response.data.message,
                    icon:'success',

                })
                history.push({
                    pathname:'/changepassword',
                    state:{token:response.data.data.token}
                })
            }
        })
        .catch(error=>{
            Swal.fire({
                title:error.message,
                icon:'error'
            })
            history.push('/changepassword')
        })
    }
    const handleOtp=()=>{
        let obj={'email':data.location.state.mail}
        axios.post('http://139.59.16.180:8001/sendOTP/',obj)
        .then(response=>{
            console.log("Resend otp",response)
            if(response.data.error_status===0 && response.data.exception_status===0){
                Swal.fire({
                    title:response.data.message,
                    icon:'success'
                })
            }
        })
        .catch(error=>{
            Swal.fire({
                title:error.message,
                icon:'error'
            })
        })
    }
    return (
        <div className="screenwidth login">
            <div className="formdiv">
            <div className="text-center">
               <h1 className="text-white">Verify OTP</h1>
            </div>
                <Form onSubmit={handleVerify}>
                    <FormGroup controlId="otp">
                        <FormLabel className="text-white">Enter OTP : </FormLabel>
                        <FormControl type="text" value={otp}  required onChange={e=>setOtp(e.target.value)}></FormControl>
                    </FormGroup>
                    <Col className="text-center" ><Button type="submit">Submit</Button></Col>
                    <Col className="text-center"><Button variant="link" onClick={handleOtp}>Resend OTP</Button></Col>
                </Form>
            </div> 
            
        </div>
    )
}

export default VerifyMail

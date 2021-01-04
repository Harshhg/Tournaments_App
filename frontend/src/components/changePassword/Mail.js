import axios from 'axios'
import React, { useState } from 'react'
import { Form, FormControl, FormGroup, FormLabel, Button, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const Mail = () => {
    const [email,setEmail]=useState("")
    const history=useHistory()
    let obj={'email':email}
    const handleOtp=(e)=>{
        e.preventDefault()
        axios.post('http://139.59.16.180:8001/sendOTP/',obj)
        .then(response=>{
            console.log(response)
            if(response.data.error_status===0 && response.data.exception_status===0){
                Swal.fire({
                    title:response.data.message,
                    icon:'success'
                })
                history.push({
                    pathname:'/otp',
                    state:{mail:email}
                })
            }else if(response.data.error_status===1){
                Swal.fire({
                    title:response.data.message,
                    icon:'error'
                })
            }
        })
        .catch(error=>{
            console.log("error",error)
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
               <h1 className="text-white">Email</h1>
            </div>
                <Form onSubmit={handleOtp}>
                    <FormGroup controlId="email">
                        <FormLabel className="text-white">Enter email address : </FormLabel>
                        <FormControl type="email" placeholder="email" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required value={email} onChange={e=>setEmail(e.target.value)} />
                    </FormGroup>
                    <Col className="text-center"><Button type="submit" >Send OTP</Button></Col>
                </Form>

            </div>
        </div>
    )
}

export default Mail

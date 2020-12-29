import axios from 'axios'
import React, { useState } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const ChangePassword = (data) => {
    const [password,setPassword]=useState("")
    const [confirm,setConfirm]=useState("")
    const history=useHistory()
    const handleChangePassword=(e)=>{
        e.preventDefault()
        // let x=localStorage.getItem('token')
       
        let t=data.location.state.token
        let y='Token '+t
        let obj={'password':password}
        axios.post('http://139.59.16.180:8001/changePassword/',obj,{headers:{'Authorization':y}})
        .then(response=>{
            console.log(response)
            if(response.data.error_status===0 && response.data.exception_status===0){
                Swal.fire({
                    title:response.data.message,
                    icon:'success'
                })
                history.push('/login')
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
               <h1 className="text-white">Change password</h1>
            </div>
                <Form>
                    <FormGroup controlId="password">
                        <FormLabel className="text-white">Password : </FormLabel>
                        <FormControl type="password" value={password} onChange={e=>setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup controlId="confirm">
                        <FormLabel className="text-white">Confirm Password : </FormLabel>
                        <FormControl type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} />
                    </FormGroup>
                    <Col className="text-center">
                    <Button type="submit" onClick={handleChangePassword}>Submit</Button>
                    </Col>
                </Form>
            </div>
            
        </div>
    )
}

export default ChangePassword

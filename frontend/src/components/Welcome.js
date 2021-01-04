import React from 'react'
import { Button, Container, Jumbotron ,Row,Col} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import '../styles/welcome.scss';
const Welcome=()=>{
    const history=useHistory()
    const checkLogin=()=>{
        let check=localStorage.getItem("token")
        if(check){
            history.push('/tournaments')
        }
    }
    return (
        <div className="" onLoad={checkLogin()}>
            <Row>
                <Col lg={6}>
        <div className="imgtag">
            <img src="..\Images\table-tennis.jpg" alt="Table Tennis " height="200%" />
            </div>
            </Col>
            <Col>
        <Container>            
        <div className="p-5">
            <Jumbotron className="text-center heading">
                <h1>Tournament app</h1>
            </Jumbotron>
            <Row>
            <Col xs={3} />
            <Col xs={6} className="text-center">
            <Col />
            <Button className="btn-block" onClick={()=>history.push('/login')}>Login</Button>
            </Col>
            </Row>
            <Row>
            <Col xs={3}></Col>
            <Col xs={6} className="text-center">
            <Button variant="link" onClick={()=>history.push('/Signup')}>Sign up</Button>
            </Col>
            </Row>
        </div>
        </Container>
        </Col>
        </Row>
        </div>
    )
}

export default Welcome

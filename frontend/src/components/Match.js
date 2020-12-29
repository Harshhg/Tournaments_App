import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Row,Col} from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../styles/match.scss'
function Match(props) {
    console.log(props)
    const history=useHistory()
    let x=localStorage.getItem('token')
    let y='Token '+x
    let api='http://139.59.16.180:8001/match/score?match_id='+props.location.state.id;
    console.log(api)
    const [scores,setScores]=useState([])
    useEffect(()=>{
        axios.get(api)
        .then(response=>{
            console.log(response)
            setScores(response.data.data)   
            // console.log(scores)
        })
        .catch(error=>{
            Swal.fire({
                title:error.message,
                icon:'error'
            })
        })
    },[api,scores,y])
    return (
        <div class="screenwidth">
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2} className="icons" ><ArrowLeft size="lg" height="30" width="30" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={9}>
                    {/* <h3 className="text-center tournamentspageheading">Tournaments</h3> */}
                    <h3 >Match</h3>
                </Col>
                <Col lg={1} xs={1}>
                </Col>
            </Row>
            <div className="rect">
                
            </div>
            <div className="versus">
                
            </div>
            <div>
                <Row>
                    <Col lg={6} className="text-center p-3">
                        <div>
                        <p>John Cena</p>
                        <div className="firstplayerphoto">
                            <img src="../Images/table-tennis.jpg" alt="first player pic" className="playersphoto" />
                        </div>
                        <div>
                            <h1>12</h1>
                        </div>
                        </div>
                    </Col>
                    <Col lg={6} className="text-center p-3">
                        <p>Brock Lesnar</p>
                        <div className="secondplayerphoto">
                            <img src="../Images/table-tennis.jpg" alt="second player pic" className="playersphoto" />
                        </div>
                        <div>
                            <h1>5</h1>
                        </div>
                    </Col>
                </Row>
            </div>
                {
                    scores.map(item=>
                <div>
                    {item.set_no===1?
                <div className="scores1">
                    <Row>
                    <Col lg={4}>{item.player1_score}</Col>
                    <Col lg={4}>Set 1</Col>
                    <Col lg={4}>{item.player2_score}</Col>
                    </Row>
                </div>:""}
                {item.set_no===2?
                <div className="scores2">
                    <Row>
                    <Col lg={4}>{item.player1_score}</Col>
                    <Col lg={4}>Set 2</Col>
                    <Col lg={4}>{item.player2_score}</Col>
                    </Row>
                </div>:""}
                {item.set_no===3?
                <div className="scores3">
                    <Row>
                    <Col lg={4}>{item.player1_score}</Col>
                    <Col lg={4}>Set 3</Col>
                    <Col lg={4}>{item.player2_score }</Col>
                    </Row>
                </div>:""}
                </div>
                    )} 
                    
        </div>
    )
}

export default Match

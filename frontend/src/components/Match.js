import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Row,Col} from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import blankimage from '../assets/blankimage.jpg'
import medal from '../assets/medal.png'
import '../styles/match.scss'
const Match=(props)=>{
    console.log(props)
    const history=useHistory()
    const player1_name=props.location.state.player1name
    const player2_name=props.location.state.player2name
    const player1_image=props.location.state.player1image
    const player2_image=props.location.state.player2image
    const winner=props.location.state.winner_name
    let x=localStorage.getItem('token')
    let y='Token '+x
    let api='http://139.59.16.180:8001/match/score?match_id='+props.location.state.id;
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
    },[api,setScores,y])
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
                        <p>{player1_name}</p>
                        <div className="firstplayerphoto">
                            <img src={player1_image || blankimage} alt="first player pic" className="playersphoto" />
                        </div>
                        <div>
                            {/* <h1>12</h1> */}
                        </div>
                        </div>
                    </Col>
                    <Col lg={6} className="text-center p-3">
                        <p>{player2_name}</p>
                        <div className="secondplayerphoto">
                            <img src={player2_image || blankimage} alt="second player pic" className="playersphoto" />
                        </div>
                        <div>
                            {/* <h1>5</h1> */}
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
                <div className="winner">
                    <img src={medal} alt="medal" className="winner-medal" />
                    <h4>{winner} won the match</h4>
                </div>
        </div>
    )
}

export default Match

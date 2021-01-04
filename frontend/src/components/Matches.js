import React, { useEffect, useState } from 'react'
import {Row,Col, Dropdown, DropdownButton} from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getFixtures } from '../actions/fixturesAction'
import '../styles/matches.scss'
import blankimage from '../assets/blankimage.jpg'
import medal from '../assets/medal.png'
import { getTournamentDetail } from '../actions/tournamentDetailAction'
const Matches=(key)=>{
    const history=useHistory()
    const dispatch = useDispatch()
    const id=key.location.state.detail
    const maxscore=key.location.state.max_score
    const fixture = useSelector(state => state.fixture)
    // console.log(fixture.fixturedata.rounds?.rounds_data[0].round_name)
    const tournamentdetail = useSelector(state => state.tournamentdetail)
    useEffect(()=>{
        dispatch(getFixtures(id))
        dispatch(getTournamentDetail(id))
    },[dispatch,id])
    // let roundname=fixture.fixturedata.rounds?.rounds_data[0].round_name
    const [title,setTitle]=useState("Round")
    let start=tournamentdetail?.tdetail[0]?.is_started
    const handleRound=(id)=>{
        let i
        for(i=1; i<=fixture.fixturedata.total_rounds; i++){
            document.getElementById(i).style.display="none"
        }
        document.getElementById(id).style.display="block"
    }
    const handleMatches=(match_id,player1,player2,player1name,player2name,iscomplete,image1,image2,winner)=>{
        if(player2name==="null"){

        }else if(iscomplete===true){
            history.push({
                pathname:'/match',
                state:{id:match_id,player1name:player1name,player2name:player2name,player1image:image1,player2image:image2,winner_name:winner}
            })
        }else if(start===false){
            alert("Tournament has not yet started")
        }else{
        history.push({
            pathname:'/scorer',
            state:{id:match_id,player_1_id:player1,player_2_id:player2,player_1_name:player1name,player_2_name:player2name,player_1image:image1,player_2image:image2,score:maxscore}
        })
        }
    }
    // console.log(fixture)
    return (
        <div className="screenwidth" onLoad={()=>handleRound(1)}>
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2} className="icons" ><ArrowLeft size="lg" height="30" width="30" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={9}>
                    <h3 >Matches</h3>
                </Col>
                <Col lg={1} xs={1}>
                </Col>
            </Row>
            <Row className="p-4 text-center">
                <Col xs={5} sm={3}>View Matches for Round : </Col>
                <Col xs={3} sm={1}>
                <DropdownButton id="dropdown-basic-button" title={title}>
                {
                fixture &&
                fixture.fixturedata.rounds &&
                fixture.fixturedata.rounds.rounds_data.map(item=>
                    <div key={item.round_no}>
                        {/* {item.is_started==="false"?"Round not created":""} */}
                    <Dropdown.Item onClick={()=>{handleRound(item.round_no);setTitle(item.round_name)}}>{item.round_name}</Dropdown.Item>
                    </div>
                    )
            }
                </DropdownButton>
                </Col>
            </Row>
            {
                fixture &&
                fixture.fixturedata.rounds &&
                fixture.fixturedata.rounds.rounds_data.map(item=>
            <div  id={item.round_no} key={item.round_no}>
                {
                    item.match_data.map(matchitem=>
                        <div className="roundtab" key={matchitem.match_id} onClick={()=>handleMatches(matchitem.match_id,matchitem.player1.id,matchitem?.player2?.id,matchitem.player1.name,matchitem?.player2?.name || "null",matchitem.is_completed,matchitem?.player1?.profile_image || blankimage,matchitem?.player2?.profile_image || blankimage,matchitem?.winner?.name)}>
                
                <Row>
                    <Col xs={5} sm={5} md={5} className="text-center">
                        <div>
                        {(matchitem?.winner?.id===matchitem?.player1?.id && matchitem?.winner?.id!=="")?
                            <img src={medal} className="trophy-left" alt="trophy" />:
                            ""}
                    <img src={matchitem?.player1?.profile_image || blankimage} alt="Pic" className="player-pic" />
                        </div>
                        <div id="firstname" >
                            {/* {(matchitem?.winner?.id===matchitem?.player1?.id)?
                            <TrophyFill color="#fcd01e" height="25" width="25" />:
                            ""} */}
                            {"  "+matchitem.player1.name}
                        </div>
                    </Col>
                    <Col xs={1}  sm={2} md={2} className="text-center pt-5">
                        V/S
                    </Col>
                    <Col xs={5} sm={5} md={5} className="text-center">
                        <div>
                    <img src={matchitem?.player2?.profile_image || blankimage}  alt="Pic" className="player-pic" />
                    {(matchitem?.winner?.id===matchitem?.player2?.id && matchitem?.winner?.id!=null && matchitem?.winner?.id!=="")?
                            <img src={medal} className="trophy-right" alt="trophy" />:
                            ""}
                        </div>
                        <div id="secondname" >
                          {matchitem?.player2?.name|| "  -   "}
                            {/* {(matchitem?.winner?.id===matchitem?.player2?.id && matchitem?.winner?.id!=null)?
                            <TrophyFill color="#fcd01e" height="25" width="25" />:
                        ""} */}
                            
                            <p id="sec"></p>
                        </div>
                    </Col>
                </Row>
                </div>)
                }
            </div>)
            }
        </div>
    )
}

export default Matches

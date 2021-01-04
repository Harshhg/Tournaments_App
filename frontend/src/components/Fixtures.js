import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFixtures } from '../actions/fixturesAction'
import blankimage from '../assets/blankimage.jpg'
import trophy from '../assets/trophy.png'
import '../styles/fixtures.scss'
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import Swal from 'sweetalert2'
const Fixtures=(key)=>{
    const id=key.location.state.detail
    const fixture = useSelector(state => state.fixture)
    const history=useHistory()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getFixtures(id))
    },[dispatch,id])
    // console.log(fixture)
      const showScore=(match_id,player1_name,player2_name,player1_image,player2_image,winner,iscomplete)=>{
        if(player2_name==="null"){

        }else if(iscomplete===false){
            Swal.fire({
                title:'Oops',
                text:"Match isn't completed yet !"
            })
        }else{
          history.push({
              pathname:'/match',
              state:{id:match_id,player1name:player1_name,player2name:player2_name,player1image:player1_image,player2image:player2_image,winner_name:winner}
          })
        }
      }

    return (
        <div>
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2} className="icons" ><ArrowLeft size="lg" height="30" width="30" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={9}>
                    <h3 >Fixtures</h3>
                </Col>
                <Col lg={1} xs={1}>
                </Col>
            </Row>
            <div className="bracket">
            {
                fixture &&
                fixture.fixturedata.rounds &&
                fixture.fixturedata.rounds.rounds_data.map(item=>
                    
            // <div className="fixbox" key={item.round_no}>
                <div className="bracket" style={{ padding:"0px", margin:"0px"}} >
                    {fixture.fixturedata.is_match_created?"":"Tournament has not been created yet"}
                <div className="column">
                {item.round_no===1?
                <>
                {
                    item.match_data.map(matchitem=>
                    <div className="playerbo match winner-top" key={matchitem.match_id} onClick={()=>showScore(matchitem.match_id,matchitem?.player1?.name || "null",matchitem?.player2?.name || "null",matchitem?.player1?.profile_image || blankimage,matchitem?.player2?.profile_image || blankimage,matchitem?.winner?.name,matchitem.is_completed)}>
                <div className="playe1 tet-center match-top team">
                <span class="seed"><img src={matchitem?.player1?.profile_image || blankimage} alt="" className='fimg'/></span>
                            {matchitem?.player1?.name || "-"}
                <span className="score">{(matchitem?.winner?.id===matchitem?.player1?.id)?
                            <img src={trophy} className="t" height="30" width="30" alt="trophy" />:
                            ""}
                </span>            
                </div>
                <div className="playe2 tet-center match-bottom team">
                <span class="seed"><img src={matchitem?.player2?.profile_image || blankimage} alt="" className='fimg'/></span>
                            {matchitem?.player2?.name || "-"}
                <span className="score">{(matchitem?.winner?.id===matchitem?.player2?.id)?
                            <img src={trophy} className="t" height="30" width="30" alt="trophy" />:
                            ""}
                </span>
                </div>
                
                <div class="match-lines">
                                <div class="line one"></div>
                                <div class="line two"></div>
                            </div>
                            <div class="match-lines alt">
                                <div class="line one"></div>
                            </div>


                   </div>) }               
                </>
                :(<div></div>)}
                </div>
                {/* For round 2 */}
                <div className="roun2 column">
                {item.round_no===2?
                <>
                {
                    item.match_data.map(matchitem=>
                    <div className="playerbx match winner-top" key={matchitem.match_id} onClick={()=>showScore(matchitem.match_id,matchitem?.player1?.name || "null",matchitem?.player2?.name || "null",matchitem?.player1?.profile_image || blankimage,matchitem?.player2?.profile_image || blankimage,matchitem?.winner?.name,matchitem.is_completed)}>
                <div className="playe1 tet-center match-top team">
                <span class="seed"><img src={matchitem?.player1?.profile_image || blankimage} alt="" className='fimg'/></span>
                            {matchitem?.player1?.name || "player not decided yet"}
                <span className="score">{(matchitem?.winner?.id===matchitem?.player1?.id  && matchitem?.winner?.id!=="")?
                            <img src={trophy} className="t" height="30" width="30" alt="trophy" />:
                            ""}
                </span>
                </div>
                <div className="playr2 tet-center match-bottom team">
                <span class="seed"><img src={matchitem?.player2?.profile_image || blankimage} alt="" className='fimg'/></span>
                            {matchitem?.player2?.name || "player not decided yet"}
                <span className="score">{(matchitem?.winner?.id===matchitem?.player2?.id  && matchitem?.winner?.id!=="")?
                            <img src={trophy} className="t" height="30" width="30" alt="trophy" />:
                            ""}
                </span>
                </div>

                <div class="match-lines">
                        {item.total_players===2?"":<div class="line one"></div>}
                        {item.total_players===2?"":<div class="line two"></div>}
                            </div>
                            <div class="match-lines alt">
                                <div class="line one"></div>
                            </div>
                   </div>) }               
                </>
                :<div></div>}
                </div>
                {/* Round 3 */}
                <div className="roun column">
                {item.round_no===3?
                <>
                {
                    item.match_data.map(matchitem=>
                    <div className="playerbx match winner-top" key={matchitem.match_id} onClick={()=>showScore(matchitem.match_id,matchitem?.player1?.name || "null",matchitem?.player2?.name || "null",matchitem?.player1?.profile_image || blankimage,matchitem?.player2?.profile_image || blankimage,matchitem?.winner?.name,matchitem.is_completed)}>
                <div className="playr1 tet-center match-top team">
                <span class="seed"><img src={matchitem?.player1?.profile_image || blankimage} alt="" className='fimg'/></span>
                            {matchitem?.player1?.name || "player not decided yet"}
                <span className="score">{(matchitem?.winner?.id===matchitem?.player1?.id  && matchitem?.winner?.id!=="")?
                            <img src={trophy} className="t" height="30" width="30" alt="trophy" />:
                            ""}
                </span>
                </div>
                <div className="playe2 tet-center match-bottom team">
                <span class="seed"><img src={matchitem?.player2?.profile_image || blankimage} alt="" className='fimg'/></span> 
                            {matchitem?.player2?.name || "player not decided yet"}
                <span className="score">{(matchitem?.winner?.id===matchitem?.player2?.id  && matchitem?.winner?.id!=="")?
                            <img src={trophy} className="t" height="30" width="30" alt="trophy" />:
                            ""}
                </span>
                </div>

                <div class="match-lines">
                    {/* {item.total_players} */}
                    {item.total_players===4?<div class="line one"></div>:""}
                    {item.total_players===4?<div class="line two"></div>:""} {/*for 4 round */}
                </div>
                <div class="match-lines alt">
                    <div class="line one"></div>
                </div>

                   </div>) }               
                </>
                :<div></div>}
                </div>
                {/* Round 4 */}
                <div className="roun column">
                {item.round_no===4?
                <>
                {
                    item.match_data.map(matchitem=>
                    <div className="playerbx match winner-top" key={matchitem.match_id} onClick={()=>showScore(matchitem.match_id,matchitem?.player1?.name || "null",matchitem?.player2?.name || "null",matchitem?.player1?.profile_image || blankimage,matchitem?.player2?.profile_image || blankimage,matchitem?.winner?.name,matchitem.is_completed)}>
                <div className="playr1 tet-center match-top team">
                <span class="seed"><img src={matchitem?.player1?.profile_image || blankimage} alt="" className='fimg'/></span>
                        {matchitem?.player1?.name || "player not decided yet"}
                <span className="score">{(matchitem?.winner?.id===matchitem?.player1?.id  && matchitem?.winner?.id!=="")?
                            <img src={trophy} className="t" height="30" width="30" alt="trophy" />:
                            ""}  
                </span>    
                </div>
                <div className="playe2 tet-center match-bottom team">
                <span class="seed"><img src={matchitem?.player2?.profile_image || blankimage} alt="" className='fimg'/></span>
                        {matchitem?.player2?.name || "player not decided yet"}
                <span className="score">{(matchitem?.winner?.id===matchitem?.player2?.id  && matchitem?.winner?.id!=="")?
                            <img src={trophy} className="t" height="30" width="30" alt="trophy" />:
                            ""}
                </span>
                </div>

                <div class="match-lines">
                    <div class="line one"></div>
                    {/* {item.total_players===16?<div class="line one"></div>:""}
                    {item.total_players===16?<div class="line two"></div>:""} */}
                </div>
                <div class="match-lines alt">
                    <div class="line one"></div>
                </div>

                   </div>) }               
                </>
                :<div></div>}
                </div>


                </div>

            // </div>
                )} 
                </div>  

{/* ///////////////////////////////////////////////////////////// */}
                {/* New Experiment */}
                {/* <Component /> */}
                
                   

        </div>
    )
}

export default Fixtures

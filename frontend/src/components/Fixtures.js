import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFixtures } from '../actions/fixturesAction'
import blankimage from '../picture/blankimage.jpg'
import '../styles/fixtures.scss'
import { useHistory } from 'react-router-dom';
function Fixtures(key) {
    const id=key.location.state.detail
    const fixture = useSelector(state => state.fixture)
    const history=useHistory()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getFixtures(id))
    },[dispatch,id])
    console.log(fixture)
      const showScore=(match_id)=>{
          history.push({
              pathname:'/match',
              state:{id:match_id}
          })
      }

    return (
        <div>
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
                    <div className="playerbo match winner-top" key={matchitem.match_id} onClick={()=>showScore(matchitem.match_id)}>
                <div className="playe1 tet-center match-top team">
                <span class="seed"><img src={matchitem?.player1?.profile_image || blankimage} alt="" className='fimg'/></span>
                    {matchitem?.player1?.name || "-"}
                </div>
                <div className="playe2 tet-center match-bottom team">
                <span class="seed"><img src={matchitem?.player2?.profile_image || blankimage} alt="" className='fimg'/></span>
                    {matchitem?.player2?.name || "-"}
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
                    <div className="playerbx match winner-top" key={matchitem.match_id} onClick={()=>showScore(matchitem.match_id)}>
                <div className="playe1 tet-center match-top team">
                <span class="seed"><img src={matchitem?.player1?.profile_image || blankimage} alt="" className='fimg'/></span>
                        {matchitem?.player1?.name || "player not decided yet"}
                </div>
                <div className="playr2 tet-center match-bottom team">
                <span class="seed"><img src={matchitem?.player2?.profile_image || blankimage} alt="" className='fimg'/></span>
                        {matchitem?.player2?.name || "player not decided yet"}
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
                    <div className="playerbx match winner-top" key={matchitem.match_id} onClick={()=>showScore(matchitem.match_id)}>
                <div className="playr1 tet-center match-top team">
                <span class="seed"><img src={matchitem?.player1?.profile_image || blankimage} alt="" className='fimg'/></span>
                        {matchitem?.player1?.name}
                </div>
                <div className="playe2 tet-center match-bottom team">
                <span class="seed"><img src={matchitem?.player2?.profile_image || blankimage} alt="" className='fimg'/></span> 
                        {matchitem?.player2?.name}
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
                    <div className="playerbx match winner-top" key={matchitem.match_id}>
                <div className="playr1 tet-center match-top team">
                <span class="seed"><img src={matchitem?.player1?.profile_image || blankimage} alt="" className='fimg'/></span>
                        {matchitem?.player1?.name}
                </div>
                <div className="playe2 tet-center match-bottom team">
                <span class="seed"><img src={matchitem?.player2?.profile_image || blankimage} alt="" className='fimg'/></span>
                        {matchitem?.player2?.name}
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

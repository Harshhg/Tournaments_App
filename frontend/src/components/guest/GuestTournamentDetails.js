import React, { useEffect } from 'react'
import {ArrowLeft } from 'react-bootstrap-icons'
import {Row,Col, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { guestTournamentDetail } from './guestTournamentDetailAction'
import photo from '../../assets/tennis.jpg'
const GuestTournamentDetails = (id) => {
    const history=useHistory()
    const dispatch =useDispatch()
    const tournamentdetail=useSelector(state=>state.tournamentdetail)
    const key=id.location.state.detail
    useEffect(()=>{
        dispatch(guestTournamentDetail(key))
    },[dispatch,key])
    return (
        <div className="screenwidth">
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2} className="icons" ><ArrowLeft height="30" width="30" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={8}>
                    <h3>Tournament details</h3>
                </Col>
                <Col lg={1} xs={1}>
                </Col>
            </Row>
            <Row>
            <Col sm={6}>
            {
                tournamentdetail &&
                tournamentdetail.tdetail &&
                tournamentdetail.tdetail.map(item=>
            <Container key={item.id}>
                <div>
                    <img src={item?.tournament_image || photo} width="154" height="154" alt="tournament pic" className="shadow-lg m-3 rounded-circle" />
                </div>
                <div>
                    <h3>
                        {item.name}
                    </h3>
                </div>
                <div className="p-1">
                    Started on : <b>{item.start_date}</b>
                </div>
                <div className="p-1">
                    Status : <b>{item.status}</b>
                </div>
                <div className="p-1">
                    Max score per set : <b>{item.max_score}</b>
                </div>
                <div className="p-1">
                   Total player : <b>{item.total_players}</b>
                </div>
                <div className="pb-2 p-1">
                Winner :  <b>
                    {item?.winner_details?.name || "    --"}</b>
                </div>
            </Container>)
            }  
            </Col>
            <Col sm={6}>
                {
                    tournamentdetail.tdetail &&
                    tournamentdetail.tdetail.map(item=>
                        <Container key={item.id} className="p-2">
                            <b>Players in the Tournament</b>
                            {
                            item.players.map(itemlist=>
                        <div className="p-1">
                            <li>{itemlist.name}</li>
                            </div>
                            )
                        }
                            </Container>
                        )
                }
            </Col> 
            </Row>
            {
                tournamentdetail.tdetail &&
                tournamentdetail.tdetail.map(item=>
                    <div key={item.id} >
                        <div className="bottomtab text-center p-2 bg-primary text-white icons" id="dr">
                           <Row> 
                            <Col>
                                <h4 onClick={()=>history.push({
                                    pathname:"/fixtures",
                                    state:{detail:key}
                                })
                            }>Fixtures</h4>
                            </Col>
                            </Row>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default GuestTournamentDetails

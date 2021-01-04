import React, { useEffect } from 'react'
import {ArrowLeft } from 'react-bootstrap-icons'
import {Row,Col, Container, NavDropdown} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTournamentDetail } from '../actions/tournamentDetailAction'
import { deleteTournament } from '../actions/deleteTournamentAction'
import photo from '../assets/tennis.jpg'
import { confirmAlert } from 'react-confirm-alert';
const TournamentDetails=(id)=>{
    const history=useHistory()
    const dispatch =useDispatch()
    const tournamentdetail=useSelector(state=>state.tournamentdetail)
    const key=id.location.state.detail
    useEffect(()=>{
        dispatch(getTournamentDetail(key))
    },[dispatch,key])
    const handleDelete=()=>{
        confirmAlert({
            title: 'Delete Tournament',
            message: 'Are you sure to do this.',
            icon: 'warning',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {let t_id={'tournament_id':key}
                dispatch(deleteTournament(t_id))}
              },
              {
                label: 'No',
                
              }
            ]
          });
        // let t_id={'tournament_id':key}
        // dispatch(deleteTournament(t_id))
    }
    const handleDraw=(score)=>{
        history.push({
            pathname:"/createdraw",
            state:{detail:key,maxscore:score}
        })
    }
    const handleClone=()=>{
        history.push({
            pathname:"clonetournament",
            state:{detail:key}
        })
    }
    // console.log(tournamentdetail)
    return (
        <div className="screenwidth">
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2} className="icons" ><ArrowLeft height="30" width="30" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={8}>
                    <h3>Tournament details</h3>
                </Col>
                <Col lg={1} xs={1}>
                    <NavDropdown title="" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleClone} >Clone Tournament</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleDelete}>Delete Tournament</NavDropdown.Item>
                    </NavDropdown>
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
                        { item.is_match_created ?
                        <>
                        {/* <div className="bottomtab text-center p-2 bg-primary text-white icons" id="dr">
                           <Row> 
                            <Col xs={6} lg={6}>
                            <h4 onClick={()=>history.push({
                            pathname:"/matches",
                                    state:{detail:key,max_score:item.max_score}
                                })
                            }>View Matches</h4>
                            </Col>
                            <Col xs={6} lg={6}>
                                <h4 onClick={()=>history.push({
                                    pathname:"/fixtures",
                                    state:{detail:key}
                                })
                            }>Fixtures</h4>
                            </Col>
                            </Row>
                    </div> */}
                    <div className="bottomtab">
                    <Row>
                        <Col className="text-center mr-1 p-2 ml-3 bg-primary text-white icons" id="dd">
                        <h4 onClick={()=>history.push({
                            pathname:"/matches",
                                    state:{detail:key,max_score:item.max_score}
                                })
                            }>View Matches</h4>
                        </Col>
                        <Col className="ml-1 text-center mr-3 p-2 bg-primary text-white icons" id="dr">
                        <h4 onClick={()=>history.push({
                                    pathname:"/fixtures",
                                    state:{detail:key}
                                })
                            }>Fixtures</h4>
                        </Col>
                    </Row>
                    </div>
                    </>
                        :
            <div className="bottomtab text-center p-2 bg-primary text-white"><h4 onClick={()=>handleDraw(item.max_score)}>Create Draws</h4></div>
                 } </div>
                )}
        </div>
    )
}

export default TournamentDetails

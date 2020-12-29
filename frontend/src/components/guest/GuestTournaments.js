import React, { useEffect } from 'react'
import Tournamentsheading from '../../containers/Tournamentsheading'
import { Col, Nav, Row, Tab} from 'react-bootstrap'
// import image from '../../picture/tennis.jpg'
import image from '../../picture/tennis.jpg'
import '../../styles/navigationtabs.scss'
import { useHistory } from 'react-router-dom'
import { guestOngoingTournament, guestUpcomingTournament, guestPreviousTournament} from './guestTournamentAction'
import { useDispatch, useSelector } from 'react-redux'
const GuestTournaments = () => {
    // const handleGuest=()=>{
        // localStorage.clear()
        // localStorage.setItem("guesttoken","guest");
    // }
    const tournament = useSelector(state => state.tournament)
    const dispatch = useDispatch()
    const history=useHistory()
    useEffect(()=>{
        dispatch(guestOngoingTournament())
        dispatch(guestUpcomingTournament())
        dispatch(guestPreviousTournament())
    },[dispatch])
    function handleTournament(id){
        // alert(id)
        history.push({
            pathname:"/guesttournamentdetails",
            state:{detail:id}
        })
        // TournamentDetails(t)
    }
    return (
        <div className="screenwidth" >
            <Tournamentsheading />
            <Tab.Container id="example" defaultActiveKey="Ongoing">
            <Row>
            <Col sm={12} xs={12} className="text-center">
            <Nav justify fill variant="pills" className="tab rounded-circle">
                <Col sm={4} xs={4}>
                <Nav.Item>
                <Nav.Link eventKey="Ongoing" className="main-nav">Ongoing</Nav.Link>
                </Nav.Item>
                </Col>
                <Col sm={4} xs={4}>
                <Nav.Item>
                <Nav.Link eventKey="Upcoming" className="main-nav" >Upcoming</Nav.Link>
                </Nav.Item>
                </Col>
                <Col sm={4} xs={4}>
                    <Nav.Item>
                    <Nav.Link eventKey="Previous" className="main-nav" >Previous</Nav.Link>
                    </Nav.Item>
                </Col>
            </Nav>
            </Col>
            </Row>
            <Row>
            <Col sm={12} xs={12}>
            <Tab.Content className="pb-4">
                <Tab.Pane eventKey="Ongoing">
                    {
                        tournament &&
                        tournament.otournamentdata &&
                        tournament.otournamentdata.map(item=>
                    <div key={item.id} className="ongoingtournamenttab"  onClick={()=>handleTournament(item.id)} >
                        <Row>
                            <Col xs={3} sm={1}>
                                <img src={item?.tournament_image || image} height="80" width="80" alt="Pic" className="tournamentpic" />
                            </Col>
                            <Col xs={8} sm={10} className="p-4"> 
                                <h6>{item.name}</h6>
                                <p>Starts on : {item.start_date}</p>
                                {/* <p>Last date of registration :{item.end_date}</p> */}
                            </Col>
                        </Row>
                    </div>)
                    }
                </Tab.Pane>
                <Tab.Pane eventKey="Upcoming">
                {
                    tournament &&
                    tournament.utournamentdata &&
                    tournament.utournamentdata.map(item=>
                    <div key={item.id} className="ongoingtournamenttab" onClick={()=>handleTournament(item.id)}>
                        <Row>
                            <Col xs={3} sm={1}>
                                <img src={item?.tournament_image || image} height="80" width="80" alt="Pic"className="tournamentpic" />
                            </Col>
                            <Col xs={8} sm={10} className="p-4">
                                <h6>{item.name}</h6>
                                <p>Starts on : {item.start_date}</p>
                                {/* <p>Last date of registration :{item.end_date}</p> */}
                            </Col>
                        </Row>
                    </div>)
                }
                </Tab.Pane>
                <Tab.Pane eventKey="Previous">
                {
                    tournament &&
                    tournament.ptournamentdata &&
                    tournament.ptournamentdata.map(item=>
                <div key={item.id} className="ongoingtournamenttab" onClick={()=>handleTournament(item.id)}>
                        <Row>
                            <Col xs={3} sm={1}>
                                <img src={item?.tournament_image || image} height="80" width="80" alt="Pic" className="tournamentpic" />
                            </Col>
                            <Col xs={8} sm={10} className="p-4">
                                <h6>{item.name}</h6>
                                <p>Starts on : {item.start_date}</p>
                                {/* <p>Last date of registration :{item.end_date}</p> */}
                            </Col>
                        </Row>
                    </div>)
                }  
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Row>
        </Tab.Container>
        </div>
    )
}

export default GuestTournaments

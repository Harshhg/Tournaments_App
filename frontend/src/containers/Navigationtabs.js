import React, { useEffect } from 'react'
import { Col, Nav, Row, Tab} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getOngoingTournament, getPreviousTournament, getUpcomingTournament } from '../actions/tournamentActions'
// import TournamentDetails from '../components/TournamentDetails'
import '../styles/navigationtabs.scss'
import image from '../picture/tennis.jpg'
function Navigationtabs() {
    const tournament = useSelector(state => state.tournament)
    const dispatch=useDispatch()
    const history=useHistory()
    useEffect(()=>{
        dispatch(getOngoingTournament())
        dispatch(getUpcomingTournament())
        dispatch(getPreviousTournament())
    },[dispatch])
    function handleTournament(id){
        // alert(id)
        history.push({
            pathname:"/tournamentdetails",
            state:{detail:id}
        })
        // TournamentDetails(t)
    }
    function handleauth(){
        let log=localStorage.getItem("token")
        let guest=localStorage.getItem("guest")
        if(log){
        }else if(guest){
        }else{
            history.push('/')
        }
    }
    return (
        <div onLoad={handleauth()}>
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

export default Navigationtabs

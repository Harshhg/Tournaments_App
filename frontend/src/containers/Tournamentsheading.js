import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
// import { ArrowRight } from 'react-bootstrap-icons';
import '../styles/tournamentsheading.scss';
const Tournamentsheading=()=>{
    const history=useHistory()
    return (
        <div>
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={11} xs={11}>
                    {/* <h3 className="text-center tournamentspageheading">Tournaments</h3> */}
                    <h3>Tournaments</h3>
                </Col>
                <Col lg={1} xs={1} className="icons" ><Plus width="30" height="30" onClick={()=>history.push('/createtournament')} /></Col>
            </Row>
            
        </div>
    )
}

export default Tournamentsheading

import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons'
import { useHistory } from 'react-router-dom'
const CreateDrawHeading=()=>{
    const history=useHistory()
    return (
        <div>
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2} className="icons" ><ArrowLeft width="30" height="30" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={9}>
                    {/* <h3 className="text-center tournamentspageheading">Tournaments</h3> */}
                    <h3 >Create Draws</h3>
                </Col>
            </Row>
        </div>
    )
}

export default CreateDrawHeading

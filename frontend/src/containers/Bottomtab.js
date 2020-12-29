import React from 'react'
import { Col, Row } from 'react-bootstrap'
import '../styles/bottomtab.scss'
import { PersonFill, PersonPlusFill, TrophyFill} from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
function Bottomtab() {
    const history=useHistory()
    return (
        <div className="bottomtab">
            <Row>
                <Col xs={4} className="text-center btab btabactive">
                    <div onClick={()=>history.push('/Tournaments')}>
                    <p className="m-0"><TrophyFill  height="30" /></p>
                    Tournaments
                    </div>
                    </Col>
                <Col xs={4} className="text-center btab">
                    <div onClick={()=>history.push('/playerlist')} >
                    <p className="m-0"><PersonPlusFill height="30" /></p>Players
                    </div>
                </Col>
                <Col xs={4} className="text-center btab" >
                    <div onClick={()=>history.push('/Profile')} >
                    <p className="m-0"><PersonFill height="30" /></p>My Profile</div></Col>
                    
            </Row>
        </div>
    )
}

export default Bottomtab

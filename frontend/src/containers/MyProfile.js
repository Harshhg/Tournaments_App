import React from 'react'
import {Row,Col} from 'react-bootstrap'

const MyProfile=()=>{
    return (
        <div>
            <Row>
                <Col>
                    {/* <h3 className="text-center p-3 tournamentspageheading bg-white">My profile</h3> */}
                    <h3 className="shadow-sm p-3 mb-2 bg-white rounded text-center">My profile</h3>
                    {/* <h3 className="text-center bg-white">My profile</h3> */}
                </Col>
            </Row>
        </div>
    )
}

export default MyProfile

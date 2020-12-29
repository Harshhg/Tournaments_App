import React, { useEffect } from 'react'
import {Row, Col } from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getPlayerDetail } from '../actions/playerDetailAction'
import '../styles/playerdetail.scss'
import blankimage from '../picture/blankimage.jpg'
function PlayerDetail(id) {
    const history=useHistory()
    const dispatch = useDispatch()
    const playerdetail = useSelector(state => state.playerdetail)
    // console.log(id)
    const key=id.location.state.detail
    // console.log(key)
    useEffect(()=>{
        dispatch(getPlayerDetail(key))
    },[dispatch,key])
    return (
        <div className="screenwidth">
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2}><ArrowLeft width="30" height="40" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={9}>
                    <h3 >Player Details</h3>
                </Col>
                <Col lg={1} xs={1}>
                </Col>
            </Row>
            {
                playerdetail &&
                playerdetail.pdetail &&
                playerdetail.pdetail.map(item=>
            <div key={item.id} className="details">
            <div className="new shadow-lg">
                <h1>{item.name}</h1>
                <hr />
                <Row>
                    <Col xs={4} lg={4} className="pt-5 mt-5">
                    <img src={item?.profile_image || blankimage} className="shadow-lg m-3 " id="playerphotos" height="154" width="154" alt="player pic" />
                    </Col>
                    <Col xs={6}>
                        <h3 className="newhead">
                            Name : {item.name}
                        </h3>
                        <h3 className="newhead">
                            Age : {item.age}
                        </h3>
                        <h3 className="newhead">
                            Gender : {item.gender}
                        </h3>
                        <h3 className="newhead">
                            Email : {item.email}
                        </h3>
                        <h3 className="newhead">
                            Matches played : {item.matches_played}
                        </h3>
                        <h3 className="newhead">
                            Matches won : {item.matches_won}
                        </h3>
                    </Col>
                </Row>
            </div>

            </div>)
            }


        </div>
    )
}

export default PlayerDetail

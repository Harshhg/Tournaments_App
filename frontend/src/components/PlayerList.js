import React, { useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import {TrophyFill,PersonFill, PlusCircleFill, Dot, PersonPlusFill} from 'react-bootstrap-icons'
import '../styles/playerlist.scss'
import {useSelector,useDispatch} from 'react-redux'
import { getPlayerList } from '../actions/playerListActions'
import blankimage from '../picture/blankimage.jpg'
function PlayerList() {
    const personlist = useSelector(state => state.personlist)
    // console.log(personlist)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getPlayerList())
    },[dispatch])
    const history=useHistory()
    function handlePlayer(id){
        // alert(id)
        history.push({
            pathname:'/playerdetail',
            state:{detail:id}
        })
    }
    function handleauth(){
        let log=localStorage.getItem("token")
        if(log){
        }else{
            history.push('/')
        }
    }
    return (
        <div className="screenwidth"  onLoad={handleauth()}>
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={12} xs={12}>
                    <h3 >Players</h3>
                </Col>
            </Row>
            <div className="addplayericon">
                <PlusCircleFill size={70} className="addplayerbutton" color="#5983E3" onClick={()=>history.push('/addplayer')} />
            </div>
            <div className="plist">
            {
                personlist &&
                personlist.person &&
                personlist.person.map(item=><div key={item.id} className="playerlisttab" onClick={()=>handlePlayer(item.id)}>
                    <Row className="p-3">
                    <Col xs={3} sm={1}>
                        <div className="playerpic">
                            <img src={item?.profile_image || blankimage} alt="player pic" width="70" height="70" className="playerpics" />
                        </div>
                    </Col>
                    <Col xs={8} sm={10}>
                        <p><b>{item.name}</b></p>
                        <p>{item.age} Years <Dot /> {item.gender} </p>
                    </Col>
                </Row>
                </div>/*<p key={item.id}>{item.id}{item.title}</p>*/)
            }
            </div>
            <div className="bottomtab">
            <Row>
                <Col xs={4} className="text-center btab">
                    <div onClick={()=>history.push('/Tournaments')}>
                    <p className="m-0"><TrophyFill height="30" /></p>
                    Tournaments
                    </div>
                    </Col>
                <Col xs={4} className="text-center btab btabactive">
                    <p className="m-0"><PersonPlusFill height="30" /></p>Players</Col>
                <Col xs={4} className="text-center btab" >
                    <div onClick={()=>history.push('/Profile')} >
                    <p className="m-0"><PersonFill height="30" /></p>My Profile</div></Col>
                    
            </Row>
            
        </div>
        </div>
    )
}

export default PlayerList

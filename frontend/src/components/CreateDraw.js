import React, { useEffect, useState } from 'react'
import { FormControl, FormGroup ,Col,Row, InputGroup} from 'react-bootstrap'
import { DashCircleFill, PlusCircleFill, Search } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getGenerateDraw } from '../actions/generateDrawAction'
import { getAllSearchPlayer, getSearchPlayer } from '../actions/searchPlayerAction'
// import { getTournamentDetail } from '../actions/tournamentDetailAction'
import { AddTournamentPlayer, DeleteTournamentPlayer } from '../actions/tournamentPlayerAction'
import CreateDrawHeading from '../containers/CreateDrawHeading'
import blankimage from '../assets/blankimage.jpg'
const CreateDraw=(id)=>{
    const [search,setSearch]=useState("")
    const history=useHistory()
    const dispatch = useDispatch()
    const key=id.location.state.detail
    const score=id.location.state.maxscore
    const searchplayer = useSelector(state => state.searchplayer)
    useEffect(()=>{
        dispatch(getAllSearchPlayer(key))
    },[dispatch,key])
    const handleChange=(name)=>{
        dispatch(getSearchPlayer(name,key))
    }
    const handleDraw=()=>{
        dispatch(getGenerateDraw(key))
        history.push({
            pathname:'/matches',
            state:{detail:key,max_score:score}
        })
    }
    const handleAdd=(playerid)=>{
        let obj={'tournament_id':key,'player_id':playerid}
        dispatch(AddTournamentPlayer(obj))
        document.getElementById("plusbutton"+playerid).style.display="none"
        document.getElementById("minusbutton"+playerid).style.display="block"
    }
    const handleDelete=(playerid)=>{
        let obj={'tournament_id':key,'player_id':playerid}
        dispatch(DeleteTournamentPlayer(obj))
        document.getElementById("plusbutton"+playerid).style.display="block"
        document.getElementById("minusbutton"+playerid).style.display="none"
    }
    // const playercount=()=>{

    // }
    // console.log(searchplayer)
    return (
        <div className="screenwidth">
            <CreateDrawHeading />
            <FormGroup controlId="searchbar" className="p-2 m-5">
                <InputGroup className="mb-2">
                <InputGroup.Prepend>
                <InputGroup.Text><Search /></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type="search" placeholder="Search players to add"  value={search} onInput={(e)=>handleChange(e.target.value)} onChange={e=>setSearch(e.target.value)}  />
                </InputGroup>            
            </FormGroup>
            {
                searchplayer &&
                searchplayer.sdata &&
                searchplayer.sdata.map(item=>
                    <div key={item.id} style={{ width:"88%", margin:"10px auto" }}>
                       <Row className="p-3">
                    <Col xs={3} lg={1}>
                        <div className="playerpic">
                            <img src={item?.profile_image || blankimage} alt="player pic" width="70" height="70" className="playerpic" />
                        </div>
                    </Col>
                    <Col xs={7} lg={9}>
                        <p>{item.name}</p>
                        <p>{item.age} Years {item.gender} </p>
                    </Col>
                    <Col xs={2} sm={2}>
                        <div>
                        {
                         item.is_added?
                        <><DashCircleFill className="b" id={"minusbutton"+item.id}  color="#DC6562" height="40" width="40" onClick={()=>handleDelete(item.id)} />
                        <PlusCircleFill id={"plusbutton"+item.id}  color="#54D17B" style={{display:"none"}} height="40" width="40" onClick={()=>handleAdd(item.id)} /></>:
                        <><DashCircleFill className="b" id={"minusbutton"+item.id} style={{display:"none"}} color="#DC6562" height="40" width="40" onClick={()=>handleDelete(item.id)} />
                        <PlusCircleFill id={"plusbutton"+item.id}  color="#54D17B" height="40" width="40" onClick={()=>handleAdd(item.id)} /></>
                         } 
                        </div>
                        {/* <div onLoad={handleSign(item.id,item.is_added)}></div> */}
                    </Col>
                </Row>
                    </div>
                    )
            }
            <div>
                {
                    searchplayer &&
                    searchplayer.playerdata &&
                    searchplayer.playerdata.map(item=>
                <div key={item.id} style={{ width:"88%", margin:"10px auto"}}>
                       <Row className="p-3">
                    <Col xs={3} lg={1}>
                        <div className="playerpic">
                            <img src={item?.profile_image || blankimage} alt="player pic" width="70" height="70" className="playerpic" />
                        </div>
                    </Col>
                    <Col xs={7} lg={9}>
                        <p>{item.name}</p>
                        <p>{item.age} Years {item.gender} </p>
                    </Col>
                    <Col xs={2} sm={2}>
                        <div>
                         {/* <DashCircleFill className="b" id={"minusbutton"+item.id} style={{display:"none"}} color="#DC6562" height="40" width="40" onClick={()=>handleDelete(item.id)} />
                        <PlusCircleFill id={"plusbutton"+item.id}  color="#54D17B" height="40" width="40" onClick={()=>handleAdd(item.id)} /> */}
                        {
                         item.is_added?
                        <><DashCircleFill className="b" id={"minusbutton"+item.id}  color="#DC6562" height="40" width="40" onClick={()=>handleDelete(item.id)} />
                        <PlusCircleFill id={"plusbutton"+item.id}  color="#54D17B" style={{display:"none"}} height="40" width="40" onClick={()=>handleAdd(item.id)} /></>:
                        <><DashCircleFill className="b" id={"minusbutton"+item.id} style={{display:"none"}} color="#DC6562" height="40" width="40" onClick={()=>handleDelete(item.id)} />
                        <PlusCircleFill id={"plusbutton"+item.id}  color="#54D17B" height="40" width="40" onClick={()=>handleAdd(item.id)} /></>
                         } 
                        </div>
                        {/* <div onLoad={handleSign(item.id,item.is_added)}></div> */}
                    </Col>
                </Row>
                    </div>)}

                    {

                    }
            

            </div>
            <div className="bottomtab text-center p-2 bg-primary text-white"><h4 onClick={handleDraw}>Generate Draws</h4></div>
        </div>
        
    )
}

export default CreateDraw

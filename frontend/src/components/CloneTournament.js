import React, { useEffect, useState } from 'react'
import {Row,Col,Button,Form, FormGroup, FormControl} from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { cloneTournament, updateTournament } from '../actions/cloneTournamentAction'
import '../styles/createtournament.scss'
import image from '../picture/tennis.jpg'
function CloneTournament(key) {
    const id=key.location.state.detail
    const dispatch = useDispatch()
    useEffect(()=>{
        let tournament_id={'tournament_id':id}
        dispatch(cloneTournament(tournament_id))
    },[dispatch,id])
    const clonedata = useSelector(state => state.clonedata)
    const history=useHistory()
    var [tname,setTName]=useState("");
    const [sdate,setSDate]=useState("");
    const [player,setPlayer]=useState("8")
    const [score,setScore]=useState("21");
    const [picture, setPicture] = useState(clonedata?.cdata?.tournament_image ||image);
    const [imgData, setImgData] = useState(picture);
    let data=new FormData()
    data.append('name',tname)
    data.append('start_date',sdate)
    data.append('max_score',score)
    data.append('total_players',player)
    const handleImage = e => {
        if (e.target.files[0]) {
          setPicture(e.target.files[0]);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setImgData(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
      };
    data.append('tournament_image',picture)
    function handleUpdate(e){
        // alert("handle Update")
        e.preventDefault()
        // let obj={'name':tname,'id':clonedata.cdata.id}
        dispatch(updateTournament(data,clonedata.cdata.id))
    }
    console.log("clone data",clonedata)
    return (
        <div className="screenwidth">
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2}><ArrowLeft width="30" height="30" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={9}>
                    <h3>Clone Tournament</h3>
                </Col>
                <Col lg={1} xs={1}>
                </Col>
            </Row>
            <div className="tournamentimage">
            <img src={imgData} id="playerimg" height="134" width="134" alt="Tournament img" />
            </div>
            <div className="text-center addtournamentphoto">
                {/* <Button variant="link">Change photo</Button> */}
            </div>
            {
                clonedata &&
                clonedata.cdata &&
                
            <Form onSubmit={handleUpdate} className="createtournamentform">
                <FormGroup controlId="tournamentname">
                    <FormControl type="text" placeholder={clonedata.cdata.name} value={tname} onChange={e=>setTName(e.target.value)} />
                </FormGroup>
                <FormGroup controlId="startingdate">
                    <FormControl type="date" placeholder="mm/dd/yyyy" value={sdate} onChange={e=>setSDate(e.target.value)} />
                </FormGroup>
                <FormGroup controlId="player">
                    <FormControl type="Integer" placeholder={clonedata.cdata.total_players} value={player} onChange={e=>setPlayer(e.target.value)} />
                </FormGroup>
                <Row>
                    <Col lg={2} xs={6}>
                        Max score per set
                    </Col>
                    <Col>
                    <FormGroup controlId="score">
                        <FormControl type="Integer" placeholder={clonedata.cdata.max_score} value={score} onChange={e=>setScore(e.target.value)} />
                    </FormGroup>
                    </Col>
                </Row>
                <FormGroup controlId="image">
                    <FormControl type="file" accept="image/*" onChange={handleImage} />
                </FormGroup>
                <div className="text-center">
                <Row>
                <Col lg={3} xs={1} />
                <Col lg={6} xs={10}>
                <Button variant="link" type="submit" className="bg-dark btn-block" size="lg">Save</Button>
                </Col>
                </Row>
                </div>
            </Form>
            }
            
        </div>
    )
}
export default CloneTournament

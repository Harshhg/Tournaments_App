import React, { useState } from 'react'
import {Row,Col,Button,Form, FormGroup, FormControl} from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getTournament } from '../actions/createTournamentAction'
import '../styles/createtournament.scss'
import image from '../assets/tennis.jpg'
function CreateTournament() {
    const history=useHistory()
    const [tname,setTName]=useState("");
    const [sdate,setSDate]=useState("");
    // const [edate,setEDate]=useState("");
    const [player,setPlayer]=useState("8")
    const [score,setScore]=useState("21");
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(image);
    let date=new Date()
    let mindate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    // console.log("mindate",mindate)
    let data=new FormData()
    data.append('name',tname)
    data.append('start_date',sdate)
    data.append('total_players',player)
    data.append('max_score',score)
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
    const dispatch = useDispatch()
    function submitTournament(e){
        e.preventDefault()
        // let obj={'name':tname,'start_date':sdate,'total_players':player,'max_score':score}
        dispatch(getTournament(data))
        history.push('/tournaments')
    }
    return (
        <div className="screenwidth">
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2}><ArrowLeft width="30" height="30" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={9}>
                    <h3 >Create Tournament</h3>
                </Col>
                <Col lg={1} xs={1}>
                </Col>
            </Row>
            <div className="tournamentimage">
            <img src={imgData} id="playerimg" height="134" width="134" alt="Tournament img" />
            </div>
            <div className="text-center addtournamentphoto">
                {/* <Button variant="link" Add photo</Button> */}
            </div>
            <Form onSubmit={submitTournament} className="createtournamentform">
                <FormGroup controlId="tournamentname">
                    <FormControl type="text" placeholder="Auriga TT Championship" value={tname} onChange={e=>setTName(e.target.value)} />
                </FormGroup>
                <FormGroup controlId="startingdate">
                    <FormControl type="date" placeholder="starting date" value={sdate} min={mindate} onChange={e=>setSDate(e.target.value)} />
                </FormGroup>
                {/* <FormGroup controlId="enddate">
                    <FormControl type="date" placeholder="End date" value={edate} onChange={e=>setEDate(e.target.value)} />
                </FormGroup> */}
                <FormGroup controlId="player">
                    <FormControl type="Integer" placeholder="total player" value={player} onChange={e=>setPlayer(e.target.value)} />
                </FormGroup>
                <Row>
                    <Col lg={2} xs={6}>
                        Max score per set
                    </Col>
                    <Col>
                        <FormGroup>
                        <FormControl type="Integer" placeholder="21" value={score} onChange={e=>setScore(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup controlId="image">
                    <FormControl type="file" accept="image/*" required onChange={handleImage} />
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
            
        </div>
    )
}

export default CreateTournament

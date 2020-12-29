import React, { useEffect, useState } from 'react'
import {Row,Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getEditPlayer } from '../actions/editPlayerAction'
import { getProfile } from '../actions/profileAction'
import '../styles/addplayer.scss'
import blankimage from '../picture/blankimage.jpg'
function EditPlayer() {
    const history=useHistory()
    const profiledata = useSelector(state => state.profiledata)
    const [name,setName]=useState("");
    const [gender,setGender]=useState("");
    const [age,setAge]=useState("");
    const [picture, setPicture] = useState("");
    const [imgData, setImgData] = useState(profiledata?.pdata?.profile_imageurl || blankimage);
    var data=new FormData()
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getProfile())
    },[dispatch])
    data.append('first_name',name)
    let gendr=gender.toLowerCase()
    data.append('gender',gendr==="male"?0:1)
    data.append('age',age)
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
      data.append('profile_image',picture)

    function updatePlayer(e){
        e.preventDefault()
        // let data={'name':name,'gender':gender,'age':age}
        dispatch(getEditPlayer(data))
    }
    console.log(profiledata)
    return (
        <div className="screenwidth">
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2} className="icons" ><ArrowLeft width="40" height="30" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={9}>
                    {/* <h3 className="text-center tournamentspageheading">Tournaments</h3> */}
                    <h3 >Edit profile</h3>
                </Col>
                <Col lg={1} xs={1}>
                </Col>
            </Row>
            <div className="playerimage">
            <img src={imgData} id="playerimg" height="134" width="134" alt="player img" />
            </div>
            <div className="text-center addplayerphoto">
                {/* <Button variant="link">Add photo</Button> */}
            </div>
            {
                profiledata.pdata &&
            <Form className="addplayerform" onSubmit={updatePlayer}>
                <FormGroup controlId="name">
                    <FormControl type="text" placeholder={profiledata.pdata.first_name} required value={name} onChange={e=>setName(e.target.value)} />
                </FormGroup>
                <FormGroup controlId="gender">
                    <Row>
                        <Col>
                        <FormControl type="select" placeholder={profiledata.pdata.gender===0?"Male":"Female"} value={gender} required onChange={e=>setGender(e.target.value)} />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup controlId="age">
                    <Row>
                        <Col xs={9} lg={10}>
                            <FormControl type="Integer" placeholder={profiledata.pdata.age} value={age} required onChange={e=>setAge(e.target.value)} />
                        </Col>
                        <Col>
                            years
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup controlId="image">
                    <FormControl type="file" id="myimage" accept="image/*" onChange={handleImage} />
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

export default EditPlayer

import React, { useState } from 'react'
import {Row,Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAddPlayer } from '../actions/addPlayerAction'
import '../styles/addplayer.scss'
import image from '../picture/tennis.jpg'
// import ReactCrop from 'react-image-crop'
// import 'react-image-crop/lib/ReactCrop.scss';
function AddPlayer() {
    const history=useHistory()
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [gender,setGender]=useState("");
    // const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [age,setAge]=useState("");
    // const [image,setImage]=useState("");
    // let [f]=useState("");
    const dispatch=useDispatch()
    // let reader=new FileReader()
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(image);
    var data=new FormData()
    data.append('name',name)
    data.append('email',email)
    data.append('gender',gender)
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
    // function CropDemo({ src }) {
    //     const [crop, setCrop] = useState({ aspect: 16 / 9 });
    //     return <ReactCrop src={src} crop={crop} onChange={newCrop => setCrop(newCrop)} />;
    // }
    
    // function handleImage(e){
    //     let files=e.target.files

    //     console.log(files)
    //     reader.readAsDataURL(files[0])
    //     reader.onload=(e)=>{
    //         // console.log("result",e.target.result)
    //         picture=e.target.result
    //         // console.log("fffffff",f)
    //     }
    //     // console.log(reader)
    //     // f=e.target.result
    //     // console.log("f",f)

    // }
    data.append('profile_image',picture)
    function addPlayer(e){
        e.preventDefault()
        // console.log("ddddddddddd",f)
        // let data={'name':name,'email':email,'gender':gender,'age':age,'profile_image':picture}
        dispatch(getAddPlayer(data))
    }
    const imageCalled= (e =>{
        document.getElementById('myimage').click();
      })
    return (
        <div className="screenwidth">
            <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2}><ArrowLeft width="30" height="30" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={9}>
                    <h3>Add player</h3>
                </Col>
                <Col lg={1} xs={1}>
                </Col>
            </Row>
            <div className="playerimage">
                <img src={imgData} id="playerimg" height="134" width="134" alt="player img" />
            </div>
            <div className="text-center addplayerphoto">
                <Button variant="link" onClick={imageCalled}>Add photo</Button>
            </div>
            <Form className="addplayerform" onSubmit={addPlayer}>
                <FormGroup controlId="name">
                    <FormControl type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
                </FormGroup>
                <FormGroup controlId="email">
                    <FormControl type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup controlId="gender">
                    <Row>
                        <Col>
                        <FormControl type="select"  value={gender} onChange={e=>setGender(e.target.value)} />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup controlId="age">
                    <Row>
                        <Col xs={9} lg={10}>
                            <FormControl type="number" placeholder="Age" value={age} min="1" max="99" onChange={e=>setAge(e.target.value)} />
                        </Col>
                        <Col>
                            years
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup controlId="image">
                    <FormControl type="file" id="myimage" required accept="image/*" onChange={handleImage} />
                </FormGroup>
                {/* {
                    picture && (
                        <ReactCrop src={imgData} onImageLoaded={setImgData} crop={crop} onChange={setCrop} />
                    )
                } */}
            
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

export default AddPlayer

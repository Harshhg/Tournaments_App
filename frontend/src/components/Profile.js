import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { PencilFill, TrophyFill, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProfile } from '../actions/profileAction';
import MyProfile from '../containers/MyProfile'
import '../styles/profile.scss';
import blankimage from '../picture/blankimage.jpg'
function Profile() {
    const history=useHistory()
    const profiledata=useSelector(state=>state.profiledata)
    const dispatch = useDispatch()
    // setImgData(profiledata.pdata.profile_imageurl)
    useEffect(()=>{
        dispatch(getProfile())
    },[dispatch])
    function handleLogout(){
        localStorage.clear()
    }
    function handleauth(){
        let log=localStorage.getItem("token")
        if(log){
        }else{
            history.push('/')
        }
    }
    // const [imgData, setImgData] = useState(profiledata?.pdata?.profile_imageurl || blankimage);
    console.log(profiledata)
    return (
        <div className="screenwidth" onLoad={handleauth()}>
            
            <div className="photobackground">
            <MyProfile />
                <div>
                
                </div>
            </div>
            {
                profiledata.pdata &&
            <div className="profileimage">   
            <img src={profiledata?.pdata?.profile_imageurl || blankimage} height="154" width="154" alt="Pic" className="profilepicture" />
            </div>
            }
                <div className="text-center addphoto">
                {/* <Button variant="link">Add photo</Button> */}
                </div>
                
                {
                    profiledata &&
                    profiledata.pdata &&
                    
                <div key={profiledata.pdata.id} className="newprofile">
                <Row className="text-center m-2 newprofilehead"><Col xs={6} lg={6} className="text-right"><b>Name of the player : </b></Col>{profiledata.pdata.first_name}</Row>
                <Row className="text-center"><Col xs={6} lg={6} className="text-right"><b>Email of the player : </b></Col>{profiledata.pdata.email}</Row>
                <Row className="text-center m-2">
                <Col xs={6} lg={6} className="text-right" ><b>Gender : </b></Col>{profiledata.pdata.gender===0?"Male":"Female"}
                </Row>
                <Row className="text-center m-2">
                <Col xs={6} lg={6} className="text-right"><b>Age : </b></Col>{profiledata.pdata.age}</Row>
                <p className="text-center" onClick={()=>history.push('/')}><Button onClick={(e)=>handleLogout(e)}>Logout</Button>
                </p>               
                 </div>
                }
                <div className="addplayericon">
                    <PencilFill color="blue" size="30" onClick={()=>history.push('/editplayer')} />
                </div>
            {/* <Bottomtab /> */}
            <div className="bottomtab">
            <Row>
                <Col xs={4} className="text-center btab">
                    <div onClick={()=>history.push('/Tournaments')}>
                    <p className="m-0"><TrophyFill height="30" /></p>
                    Tournaments
                    </div>
                    </Col>
                <Col xs={4} className="text-center btab">
                    <div onClick={()=>history.push('/playerlist')} >
                    <p className="m-0"><PersonPlusFill height="30" /></p>Players
                    </div>
                </Col>
                <Col xs={4} className="text-center btab btabactive" >
                    <div onClick={()=>history.push('/Profile')} >
                    <p className="m-0"><PersonFill  height="30" /></p>My Profile</div></Col>
                    
            </Row>
        </div>
        </div>
    )
}

export default Profile

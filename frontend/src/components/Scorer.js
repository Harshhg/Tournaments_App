import React, { useState } from 'react'
import {Row,Col} from 'react-bootstrap'
import {ArrowLeft, DashCircleFill, PlusCircleFill, TrophyFill} from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getScorer } from '../actions/scorerAction'
import '../styles/scorer.scss'
function Scorer(data) {
    // console.log("data from the matches",data)
    let id=data.location.state.id
    let player1id=data.location.state.player_1_id
    let player2id=data.location.state.player_2_id
    let player1name=data.location.state.player_1_name
    let player2name=data.location.state.player_2_name
    let player1image=data.location.state.player_1image
    let player2image=data.location.state.player_2image
    let maxscore=data.location.state.score
    const history=useHistory()
    let [onecount,setOneCount]=useState(0)
    let [twocount,setTwoCount]=useState(0)
    let [secondonecount,setSecondOneCount]=useState(0)
    let [secondtwocount,setSecondTwoCount]=useState(0)
    let [thirdonecount,setThirdOneCount]=useState(0)
    let [thirdtwocount,setThirdTwoCount]=useState(0)
    const dispatch = useDispatch()
    const handleOneMinus=()=>{
        if(onecount<=0){
            setOneCount(0);
        }
        else{
            setOneCount(--onecount);
        }
    }
    const handleOnePlus=()=>{
        if(onecount>=(maxscore-1)){
            setOneCount(maxscore)
            let obj={'match_id':id,'set_no':1,'player1_id':player1id,'player2_id':player2id,'player1_score':onecount,'player2_score':twocount}
            dispatch(getScorer(obj))
            coverover2()
        }
        else{
            setOneCount(++onecount)
        }
    }
    const handleTwoMinus=()=>{
        if(twocount<=0){
            setTwoCount(0);
        }
        else{
        setTwoCount(--twocount)
        }
    }
    const handleTwoPlus=()=>{
        if(twocount>=(maxscore-1)){
            setTwoCount(maxscore);
            let obj={'match_id':id,'set_no':1,'player1_id':player1id,'player2_id':player2id,'player1_score':onecount,'player2_score':twocount}
            dispatch(getScorer(obj))
            coverover2()
        }
        else{
            setTwoCount(++twocount)
        }
    }
    const handleSecondOneMinus=()=>{
        if(secondonecount<=0){
            setSecondOneCount(0);
        }
        else{
            setSecondOneCount(--secondonecount);
        }
    }
    const handleSecondOnePlus=()=>{
        if(secondonecount>=(maxscore-1)){
            setSecondOneCount(maxscore)
            let obj={'match_id':id,'set_no':2,'player1_id':player1id,'player2_id':player2id,'player1_score':secondonecount,'player2_score':secondtwocount}
            dispatch(getScorer(obj))
            coverover3()
        }
        else{
            setSecondOneCount(++secondonecount)
        }
    }
    const handleSecondTwoMinus=()=>{
        if(secondtwocount<=0){
            setSecondTwoCount(0);
        }
        else{
        setSecondTwoCount(--secondtwocount)
        }
    }
    const handleSecondTwoPlus=()=>{
        if(secondtwocount>=(maxscore-1)){
            setSecondTwoCount(maxscore);
            let obj={'match_id':id,'set_no':2,'player1_id':player1id,'player2_id':player2id,'player1_score':secondonecount,'player2_score':secondtwocount}
            dispatch(getScorer(obj))
            coverover3()
        }
        else{
            setSecondTwoCount(++secondtwocount)
        }
    }
    const handleThirdOneMinus=()=>{
        if(thirdonecount<=0){
            setThirdOneCount(0);
        }
        else{
            setThirdOneCount(--thirdonecount);
        }
    }
    const handleThirdOnePlus=()=>{
        if(thirdonecount>=(maxscore-1)){
            setThirdOneCount(maxscore)
            let obj={'match_id':id,'set_no':3,'player1_id':player1id,'player2_id':player2id,'player1_score':thirdonecount,'player2_score':thirdtwocount}
            dispatch(getScorer(obj))
            
        }
        else{
            setThirdOneCount(++thirdonecount)
        }
    }
    const handleThirdTwoMinus=()=>{
        if(thirdtwocount<=0){
            setThirdTwoCount(0);
        }
        else{
        setThirdTwoCount(--thirdtwocount)
        }
    }
    const handleThirdTwoPlus=()=>{
        if(thirdtwocount>=(maxscore-1)){
            setThirdTwoCount(maxscore);
            let obj={'match_id':id,'set_no':3,'player1_id':player1id,'player2_id':player2id,'player1_score':thirdonecount,'player2_score':thirdtwocount}
            dispatch(getScorer(obj))
            
        }
        else{
            setThirdTwoCount(++thirdtwocount)
        }
    }
    function coverover1(){
        document.getElementById("2").style.display="none"
        document.getElementById("3").style.display="none"
        document.getElementById("scorer2").style.opacity=1.0
        document.getElementById("scorer2").style.opacity=0.3
        document.getElementById("scorer3").style.opacity=0.3
    }
    function coverover2(){
        document.getElementById("2").style.display="flex"
        document.getElementById("1").style.display="none"
        document.getElementById("3").style.display="none"
        document.getElementById("scorer1").style.opacity=0.3
        document.getElementById("scorer2").style.opacity=1.0
        document.getElementById("scorer3").style.opacity=0.3
    }
    function coverover3(){
        document.getElementById("2").style.display="none"
        document.getElementById("1").style.display="none"
        document.getElementById("3").style.display="flex"
        document.getElementById("scorer1").style.opacity=0.3
        document.getElementById("scorer2").style.opacity=0.3
        document.getElementById("scorer3").style.opacity=1.0
    }
    return (
        <div className="screenwidth" onLoad={coverover1}>
             <Row className="shadow-sm p-3 mb-2 bg-white rounded text-center">
                <Col lg={1} xs={2}><ArrowLeft size="lg" height="30" width="30" onClick={()=>history.goBack()} /></Col>
                <Col lg={10} xs={9}>
                    <h3 >Scorer</h3>
                </Col>
                <Col lg={1} xs={1}>
                </Col>
            </Row>
            <div className="rect">
                
            </div>
            <div>
                <Row>
                    <Col lg={6} xs= {6} className="text-center p-2">
                        <div>
                        <p>{player1name}</p>
                        <div className="firstplayerscorerphoto">
                            <img src={player1image} alt="first player pic" className="playersphoto" />
                        </div>
                        <div>
                            Give bye
                        </div>
                        </div>
                    </Col>
                    <Col lg={6} xs={6} className="text-center p-2">
                        <p>{player2name}</p>
                        <div className="secondplayerscorerphoto">
                            <img src={player2image} alt="second player pic" className="playersphoto" />
                        </div>
                        <div>
                            Give bye
                        </div>
                    </Col>
                    </Row>
                    <Row id="1">
                    <Col lg={6} xs={6} className="text-center">
                    <div className="playerscounter" id="ten">
                        <DashCircleFill className="icons" color="red" size="40" onClick={handleOneMinus}></DashCircleFill>
                        <div className="p-2">
                            {onecount}
                        </div>
                        <PlusCircleFill className="icons" color="green" size="40" onClick={handleOnePlus} />
                    </div>
                    </Col>
                    <Col lg={6} xs={6} className="text-center">
                    <div className="playerscounter">
                        <DashCircleFill className="icons" color="red" size="40" onClick={handleTwoMinus}></DashCircleFill>
                        <div className="p-2">
                            {twocount}
                        </div>
                        <PlusCircleFill className="icons" color="green" size="40" onClick={handleTwoPlus} />
                    </div>
                    </Col>
                </Row>
                <Row id="2">
                    <Col lg={6} xs={6} className="text-center">
                    <div className="playerscounter">
                        <DashCircleFill className="icons" color="red" size="40" onClick={handleSecondOneMinus}></DashCircleFill>
                        <div className="p-2">
                            {secondonecount}
                        </div>
                        <PlusCircleFill className="icons" color="green" size="40" onClick={handleSecondOnePlus} />
                    </div>
                    </Col>
                    <Col lg={6} xs={6} className="text-center">
                    <div className="playerscounter">
                        <DashCircleFill className="icons" color="red" size="40" onClick={handleSecondTwoMinus}></DashCircleFill>
                        <div className="p-2">
                            {secondtwocount}
                        </div>
                        <PlusCircleFill className="icons" color="green" size="40" onClick={handleSecondTwoPlus} />
                    </div>
                    </Col>
                </Row>
                <Row id="3">
                    <Col lg={6} xs={6} className="text-center">
                    <div className="playerscounter" id="ten">
                        <DashCircleFill  className="icons" color="red" size="40" onClick={handleThirdOneMinus}></DashCircleFill>
                        <div className="p-2">
                            {thirdonecount}
                        </div>
                        <PlusCircleFill className="icons" color="green" size="40" onClick={handleThirdOnePlus} />
                    </div>
                    </Col>
                    <Col lg={6} xs={6} className="text-center">
                    <div className="playerscounter">
                        <DashCircleFill className="icons" color="red" size="40" onClick={handleThirdTwoMinus}></DashCircleFill>
                        <div className="p-2">
                            {thirdtwocount}
                        </div>
                        <PlusCircleFill className="icons" color="green" size="40" onClick={handleThirdTwoPlus} />
                    </div>
                    </Col>
                </Row>
                <div id="prize11">
                {onecount===maxscore?<TrophyFill color="#fcd01e" width="25" height="25" />:""}
                </div>
                <div id="scorer1">
                    <Row>
                    <Col lg={4}>{onecount}</Col>
                    <Col lg={4}>Set 1</Col>
                    <Col lg={4}>{twocount}</Col>
                    </Row>
                </div>
                <div id="prize12">
                {twocount===maxscore?<TrophyFill color="#fcd01e" width="25" height="25" />:""}
                </div>
                <div id="prize21">
                {secondonecount===maxscore?<TrophyFill color="#fcd01e" width="25" height="25" />:""}
                </div>
                <div id="scorer2" onClick={coverover2} >
                    <Row>
                    <Col lg={4}>{secondonecount}</Col>
                    <Col lg={4}>Set 2</Col>
                    <Col lg={4}>{secondtwocount}</Col>
                    </Row>
                </div>
                <div id="prize22">
                {secondtwocount===maxscore?<TrophyFill color="#fcd01e" width="25" height="25" />:""}
                </div>
                <div id="prize31">
                {thirdonecount===maxscore?<TrophyFill color="#fcd01e" width="25" height="25" />:""}
                </div>
                <div id="scorer3" onClick={coverover3}>
                    <Row>
                    <Col lg={4}>{thirdonecount}</Col>
                    <Col lg={4}>Set 3</Col>
                    <Col lg={4}>{thirdtwocount}</Col>
                    </Row>
                </div>
                <div id="prize32">
                {thirdtwocount===maxscore?<TrophyFill color="#fcd01e" width="25" height="25" />:""}
                </div>
            </div>
        </div>
    )
}
export default Scorer

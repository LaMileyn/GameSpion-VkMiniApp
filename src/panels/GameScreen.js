import React, {useEffect} from "react"
import {Avatar, Button, Cell, Group, Panel, PanelHeader, PanelHeaderBack, SimpleCell, Title} from "@vkontakte/vkui";
import './game.css'


const GameScreen = (props) =>{

    const minutes = Math.floor(props.timeLeft/60) >= 10 ? Math.floor(props.timeLeft/60) : `0${Math.floor(props.timeLeft/60)}`
    const seconds = props.timeLeft - minutes * 60 >= 10 ? props.timeLeft - minutes * 60 : `0${props.timeLeft - minutes * 60}`
    const checkBeforeExit = () =>{
        props.setActivePanel("home")
    }
    if (props.timeLeft === 0 && props.currentLocation){
        for(let i = 0; i < 8; i++){
            props.openTheFlashLight()
            props.closeTheFlashLight()
        }
        props.setCurrentLocation(null)
    }
    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={checkBeforeExit} />}
            >
                <SimpleCell  indicator={<Title className ="title_tillEnd_header">До конца: {`${minutes}:${seconds}`}</Title>}>
                Выйти из игры
                </SimpleCell>
            </PanelHeader>
            <Group>
                    <div className="gameWrapper">
                        { props.isCounting && <Title style = {{fontSize : "45px",padding: "15px",width: "auto",marginBottom : '25px',lineHeight : '55px',textAlign : "center"}}>Игра началась</Title> }
                        { !props.isCounting && <Title style = {{fontSize : "45px",padding: "15px",width: "auto",marginBottom : '25px',lineHeight : '55px',textAlign : "center"}}>Игра завершена...</Title> }
                        <Avatar size={228} mode={"image"} src = {"https://peopletalk.ru/wp-content/uploads/2020/07/sherlock-serial-sherlock-bbc-sherlock-holmes-sherlock-bene-8-1.jpg"}></Avatar>
                        <Group style = {{marginTop : '35px'}}>
                            { props.isCounting && <Title style = {{fontSize : "45px",padding: "35px",width: "auto",lineHeight : '55px',textAlign : "center"}}>До конца: {`${minutes}:${seconds}`} </Title> }
                            { !props.isCounting && <Title style = {{fontSize : "45px",padding: "35px",width: "auto",color : "red",lineHeight : '55px',textAlign : "center"}}>Время вышло!</Title> }
                        </Group>
                            { props.isCounting && <Title onClick = { () => props.setActivePanel("check_locations")} style = {{fontSize : "25px",padding: "35px",width: "auto",lineHeight : '55px',cursor : "pointer"}}>Посмотреть возможные Локации</Title> }
                            { !props.isCounting && <Title onClick = { () => props.setActivePanel("endscreen_roles")} style = {{fontSize : "25px",padding: "35px",width: "auto",lineHeight : '55px',cursor : "pointer"}}>Посмотреть роли</Title> }
                        {/*{props.flashLight === true && !props.isCounting && (*/}
                        {/*    <SimpleCell>*/}
                        {/*        <Button onClick = { props.flashLightOn ? props.closeTheFlashLight : props.openTheFlashLight}>Посветить фонариком</Button>*/}
                        {/*    </SimpleCell>*/}
                        {/*)}*/}
                    </div>
            </Group>

        </Panel>
    )
}
export default GameScreen;
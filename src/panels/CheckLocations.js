import React from 'react';
import {
    Avatar,
    Button,
    Cell,
    Div,
    Group,
    Headline,
    List,
    Panel, PanelHeader,
    PanelHeaderBack,
    SimpleCell,
    Title
} from "@vkontakte/vkui";


const CheckLocations = (props) => {

    const minutes = Math.floor(props.timeLeft/60) >= 10 ? Math.floor(props.timeLeft/60) : `0${Math.floor(props.timeLeft/60)}`
    const seconds = props.timeLeft - minutes * 60 >= 10 ? props.timeLeft - minutes * 60 : `0${props.timeLeft - minutes * 60}`

    return (
        <Panel id ={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={ () => props.setActivePanel("game_play")} data-to="game_play"/>}
            >
                <SimpleCell  indicator={
                    props.isCounting
                        ? <Title className ="title_tillEnd_header">До конца: {`${minutes}:${seconds}`}</Title>
                        : <Title className ="title_tillEnd_header" style = {{color : "red"}}>Время вышло</Title>

                }>
                    Назад
                </SimpleCell>
            </PanelHeader>
            <Group>
                <Div>
                    <SimpleCell>
                        { props.isCounting && <Title className ="title_tillEnd_inLocation" style={{marginBottom: 16}}>До конца: {`${minutes}:${seconds}`}</Title> }
                        { !props.isCounting && <Title className ="title_tillEnd_inLocation" style={{marginBottom: 16,color : "red"}}>Время вышло!</Title> }
                        <Title style={{marginBottom: 16}}>Локации</Title>
                    </SimpleCell>
                </Div>
                <List style={{display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(450px,1fr))"}}>
                    {
                        props.locations.map((location, index) => (
                            <Cell key={index} style={{marginBottom: 16}} expandable
                                  before={<Avatar style={{objectFit: "cover"}} src={location.image} size={128}
                                                  mode="image"/>}>
                                <Title level="3" weight="1">{location.name}</Title>
                            </Cell>
                        ))
                    }

                </List>
            </Group>
        </Panel>
    )
}
export default CheckLocations;
import React from 'react';
import {
    Avatar,
    Button,
    Cell,
    Div,
    Group,
    List,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    SimpleCell,
    Title
} from "@vkontakte/vkui";


const EndScreenRoles = (props) => {

    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                <SimpleCell>
                    В главное меню
                </SimpleCell>
            </PanelHeader>
            <Group>
                <Div>
                    <SimpleCell>
                        <Title style={{marginBottom: 16}}>Игроки и их роли</Title>
                    </SimpleCell>
                </Div>
                <List style={{display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(400px,1fr))"}}>
                    {
                        props.peopleAndRoles.map((person, index) => (
                            <Cell key={index} style={{marginBottom: 16}} expandable
                                  before={<Avatar style={{objectFit: "cover"}} src={ person.isSpion
                                      ? "https://img2.freepng.ru/20180422/hxw/kisspng-computer-icons-telephone-avatar-online-dating-serv-thief-icon-5adc326e93b879.7746285615243802706051.jpg"
                                      : "https://yt3.ggpht.com/ytc/AKedOLRT5R6513JXboB4q4GIJUtt-nGr25PppEUY5fhWbQ=s900-c-k-c0x00ffffff-no-rj"
                                  } size={128}
                                                  mode="image"/>}>
                                <Title level="3" weight="1">{person.name} { person.isSpion ? "( Шпион )" : "( Обычный игрок )"}</Title>
                            </Cell>
                        ))
                    }

                </List>
            </Group>
        </Panel>
    )
}
export default  EndScreenRoles;
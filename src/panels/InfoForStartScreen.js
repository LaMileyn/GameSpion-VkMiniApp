import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {
    Avatar, Button,
    Cell,
    Div, FormField,
    FormItem,
    FormLayout,
    Group,
    List,
    Panel,
    PanelHeader,
    PanelHeaderBack, SimpleCell, Snackbar,
    Title
} from '@vkontakte/vkui';

import './Persik.css';
import {Icon24Error} from "@vkontakte/icons";


const InfoForStartScreen = props => {


    const changeInput = (text) => {
        props.setCountPeople(text)
    }
    const checkFunction = () => {
        if (props.countPeople <= 2) {
            props.setSnackBar(<Snackbar
                layout="vertical"
                onClose={() => props.setSnackBar(false)}
                before={<Avatar size={24} styles={{backgroundColor: "var(--dynamic-red)"}}><Icon24Error fill="#fff"
                                                                                                        width="14"
                                                                                                        heigth="14"></Icon24Error></Avatar>}
                duration={900}
            > Колличество игроков должно быть больше 2
            </Snackbar>)
        } else {
            props.setActivePanel("name_info_for_start")
        }
    }
    const styleInput = {
        position: "relative",
        display: "block",
        width: "100%",
        margin: 0,
        padding: 11,
        fontSize: 16,
        lineHeight: "19px",
        textOverflow: "ellipsis",
        border: "none",
        background: "transparent",
        zIndex: 2,
        color: props.scheme == "bright_light" ? "black" : "white"
    };

    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Настройки игры
            </PanelHeader>
            <Group>
                <Div>
                    <SimpleCell>
                        <Title level="2" weight="1" style={{marginBottom: 16}}>Укажите колличество игроков, больше
                            2:</Title>
                    </SimpleCell>
                    <FormLayout>
                        <FormItem>
                            <FormField>
                                <input onChange={(e) => changeInput(e.currentTarget.value)} value={props.countPeople}
                                       type="number" style={styleInput} placeholder="Введите колличество.."/>
                            </FormField>
                        </FormItem>
                    </FormLayout>
                </Div>
            </Group>
            <Group>
                <Div>
                    <SimpleCell>
                        <Button onClick={checkFunction}>Далее</Button>
                    </SimpleCell>
                </Div>
            </Group>
            {props.snackBar}
        </Panel>

    );

}
export default InfoForStartScreen;

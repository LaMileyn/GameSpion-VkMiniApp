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


const NameInfoForStartScreen = props => {

    const [value, setValue] = useState('')
    const checkFunction = () => {

        if (value.trim().split(',').length != props.countPeople) {
            props.setSnackBar(<Snackbar
                layout="vertical"
                onClose={() => props.setSnackBar(false)}
                before={<Avatar size={24} styles={{backgroundColor: "var(--dynamic-red)"}}><Icon24Error fill="#fff"
                                                                                                        width="14"
                                                                                                        heigth="14"></Icon24Error></Avatar>}
                duration={900}
            > Вы ввели имена только {value.trim().split(",").length} пользователей из {props.countPeople}
            </Snackbar>)
        } else {
            props.setPeopleInGroup(value.trim().split(","))
            props.setActivePanel("card_picking")

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
                left={<PanelHeaderBack onClick={props.go} data-to="info_for_start"/>}
            >
                Введите имена игроков
            </PanelHeader>
            <Group>
                <Div>
                    <SimpleCell>
                        <Title level="2" weight="1" style={{marginBottom: 16}}>Укажите имена игроков через
                            запятую:</Title>
                    </SimpleCell>
                    <FormLayout>
                        <FormItem>
                            <FormField>
                                <input onChange={(e) => setValue(e.currentTarget.value)} value={value}
                                       type="text" style={styleInput} placeholder="Введите Имена.."/>
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
export default NameInfoForStartScreen;

import React, {useEffect, useState} from 'react';
import "./Home.css"

import {
    Panel,
    PanelHeader,
    Header,
    Button,
    Group,
    Cell,
    Div,
    Avatar,
    Card,
    List,
    Title,
    CardGrid,
    Text, SimpleCell, FormLayout, FormItem, FormField, File
} from '@vkontakte/vkui';
import {Icon24Document, Icon28PrivacyOutline, Icon28SettingsOutline, Icon28UserOutline} from "@vkontakte/icons";
import {PopoutWrapper} from "@vkontakte/vkui";

const Home = ({id, go, fetchedUser, setActivePanel, locations, setLocations, scheme}) => {

        const [poputOpen, setPoputOpen] = useState(false)
        const [image, setImage] = useState(null)
        const [nameNewLocation] = useState(null)
        const [inputValue, setInputValue] = useState("")
        const [currentPhoto, setCurrentPhoto] = useState(null)

        const createNewLocation = () => {
            setPoputOpen(true);
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
            color: scheme == "bright_light" ? "black" : "white"
        };

        function onFileChange(file) {
            console.log(file.files[0])
            setCurrentPhoto(file.files[0].name)

            if (file.files[0]) {
                let fr = new FileReader();

                fr.addEventListener("load", function () {
                    setCurrentPhoto(fr.result)
                }, false);
                fr.readAsDataURL(file.files[0]);
            }

        }

        return (
            <Panel id={id}>
                {poputOpen && (
                    <div className="popup">
                        <div className="for_dark_pop"></div>
                        <Group className="popupContent">
                            <Div>
                                <SimpleCell>
                                    <SimpleCell>
                                        <Title>Введите название вашей локации: </Title>
                                    </SimpleCell>
                                    <FormLayout>
                                        <FormItem>
                                            <FormField>
                                                <input onChange={(e) => setInputValue(e.currentTarget.value)}
                                                       type="text" style={styleInput} placeholder="Введите название.."
                                                       value={inputValue}/>
                                            </FormField>
                                        </FormItem>
                                    </FormLayout>
                                    <FormItem top="Загрузите фото*">
                                        <File onChange={(e) => onFileChange(e.currentTarget)} before={<Icon24Document/>}
                                              controlSize="l" mode="secondary"/>
                                    </FormItem>
                                    {
                                        currentPhoto && (
                                            <SimpleCell>
                                                <Avatar mode="image" style={{objectFit: "cover"}} size={128}
                                                        src={currentPhoto}/>
                                            </SimpleCell>
                                        )
                                    }
                                    <SimpleCell>
                                        <Button style={{marginTop: "25px"}} onClick={() => {
                                            if (inputValue.trim().length) {
                                                setLocations(prev => [...prev, {
                                                    name: inputValue,
                                                    image: currentPhoto
                                                        ? currentPhoto
                                                        : "https://keemaesthetics.co.uk/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-6.jpg?itok=ZntA2jRH"
                                                }])
                                                setCurrentPhoto(null)
                                                setInputValue("")
                                                setPoputOpen(false)
                                            }

                                        }}>Добавить</Button>
                                    </SimpleCell>
                                </SimpleCell>
                            </Div>
                        </Group>
                    </div>
                )}

                <Group>
                    <SimpleCell style = {{paddingTop : '50px'}} >
                        <Title style = {{marginBottom : "20px"}}>Добро пожаловать в игру Spion!</Title>
                        <Button onClick={() => setActivePanel("info_for_start")}>Начать игру</Button>
                    </SimpleCell>
                </Group>
                <Group>

                        <SimpleCell indicator={<Button onClick={createNewLocation}>Добавить свою</Button>}>
                            <Title style={{marginBottom: 16}}>Локации</Title>
                        </SimpleCell>

                    <List style={{display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(500px,1fr))"}}>
                        {
                            locations.map((location, index) => (
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
;


export default Home;

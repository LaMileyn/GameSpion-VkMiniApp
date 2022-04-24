import React, {useEffect, useMemo, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardGrid,
    Div,
    Group,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    SimpleCell,
    Title
} from "@vkontakte/vkui";
import './card_picking.css'


function shuffle(array) {
    let resArray = array
    array.sort(() => Math.random() - 0.5);
    return resArray
}

const CardPickingScreen = (props) => {

    const [currentIndexPerson, setCurrentIndexPerson] = useState(0) // текущий смотрящий  карточку игрок
    const [openedToSeeTheCard, setOpenedToSeeTheCard] = useState(false) // можно ли посмотреть карту
    const numberOfSpions = Math.round(props.peopleInGroup.length / 3.5) // колличество шпионов в игре
    const shuffledArrayPeopleInRound = useMemo(() => {
        const getCurrentLocation = shuffle(props.locations)
        props.setCurrentLocation(getCurrentLocation[0])
        let res = props.peopleInGroup.map(person => ({name: person, isSpion: false}))
        for (let i = 0; i < numberOfSpions; i++) {
            res[i].isSpion = true
        }
        let result = shuffle(res)
        props.setPeopleAndRoles(result)
        return result
    }, [props.peopleInGroup])


    const clickToSeeHandler = () => {
        setOpenedToSeeTheCard(true)
    }
    const clickToNextHandler = () => {
        setOpenedToSeeTheCard(false)
        setCurrentIndexPerson(prevState => prevState + 1)
    }

    const checkBeforeGame = () =>{
        props.handleStart()
        props.setActivePanel("game_play")
    }
    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Берите карту
            </PanelHeader>
            <Group>
                <Group mode="plain">
                    <CardGrid size="l">
                        <Card>
                            <div className="main_block_take_card" style={{height: "90vh"}}>
                                <Div className="group_with_card">
                                    <Group>
                                        <div style={{padding: '45px'}}>
                                            <Title>Игрок {shuffledArrayPeopleInRound[currentIndexPerson].name} смотрит свою карту</Title>
                                        </div>
                                    </Group>
                                    {
                                        !openedToSeeTheCard
                                            ?
                                                    <Avatar size={228} mode={"image"}
                                                            src={"https://proprikol.ru/wp-content/uploads/2020/07/kartinki-znak-voprosa-17.jpg"}></Avatar>
                                            : (
                                                <>
                                                    <Title level="1" weight="2" style={{marginBottom: 30}}>{
                                                        shuffledArrayPeopleInRound[currentIndexPerson].isSpion == true
                                                            ? "Вы Шпион"
                                                            : `Локация ${props.currentLocation.name}`
                                                    }</Title>
                                                    {
                                                        shuffledArrayPeopleInRound[currentIndexPerson].isSpion == true
                                                            ? <Avatar size={228} mode={"image"} src="https://i.ytimg.com/vi/0UfyiGIsLMA/maxresdefault.jpg"></Avatar>
                                                            : <Avatar size={228} mode={"image"} src={props.currentLocation.image}></Avatar>
                                                    }

                                                </>
                                            )
                                    }
                                    {!openedToSeeTheCard &&
                                        <Button className = "btn-underCard" onClick={clickToSeeHandler} style={{marginTop: "35px"}}>Посмотреть свою
                                            карту</Button>}
                                    {openedToSeeTheCard && currentIndexPerson !== shuffledArrayPeopleInRound.length - 1 &&
                                        <Button className = "btn-underCard" onClick={clickToNextHandler} style={{marginTop: "35px"}}>Следующий
                                            игрок </Button>}
                                    {openedToSeeTheCard && currentIndexPerson === shuffledArrayPeopleInRound.length - 1 &&
                                        <Button className = "btn-underCard" onClick={checkBeforeGame}
                                                style={{marginTop: "35px"}}>Начать игру </Button>}
                                </Div>
                            </div>
                        </Card>
                    </CardGrid>
                </Group>

            </Group>
        </Panel>
    )
}
export default CardPickingScreen;
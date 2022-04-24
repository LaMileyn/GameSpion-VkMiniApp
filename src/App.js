import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	View,
	ScreenSpinner,
	AdaptivityProvider,
	AppRoot,
	ConfigProvider,
	SplitLayout,
	SplitCol,
	Button
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import InfoForStartScreen from './panels/InfoForStartScreen';
import CardPickingScreen from "./panels/CardPickingScreen";
import NameInfoForStartScreen from "./panels/NameInfoForStartScreen";
import GameScreen from "./panels/GameScreen";
import CheckLocations from "./panels/CheckLocations";
import EndScreenRoles from "./panels/EndScreenRoles";


const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [peopleInGroupArray,setPeopleInGroup] = useState([])
	const [locations,setLocations] = useState([
		{
			image: "https://i.pinimg.com/originals/db/84/80/db84806167e2f8da2be3205837e3d53a.jpg",
			name: "Воздушный корабль"
		},
		{
			image: "https://voenflot.ru/wp-content/uploads/2019/08/POC_wrecked1.jpg",
			name: "Летучий Голандец"
		},
		{
			image: "https://phonoteka.org/uploads/posts/2021-05/1621015574_12-phonoteka_org-p-fon-dlya-akvariuma-bikini-bottom-24.jpg",
			name: "Бикинни Боттом"
		},
		{
			image: "https://i.ytimg.com/vi/i2q31m8w0Uk/maxresdefault.jpg",
			name: "База Террористов"
		},
		{
			image: "https://pro-dachnikov.com/uploads/posts/2021-10/1634223796_48-p-stena-saraya-foto-76.jpg",
			name: "Дом Рустама"
		},
		{
			image: "https://static.life.ru/posts/2019/06/1219712/82c71d5289b2b99d5b7317c9e991422a.jpg",
			name: "Белый Дом"
		}
	])
	const [countPeople, setCountPeople] = useState('')
	const [snackBar,setSnackBar] = useState(false)
	const [currentLocation,setCurrentLocation] = useState(null)
	const [timeLeft,setTimeLeft] = useState(0)
	const [isCounting,setIsCounting] = useState(false)
	const [peopleAndRoles,setPeopleAndRoles] = useState(null)
	const [flashLight,setFlashLight] = useState(false)
	const [flashLightOn,setTurnFlashLight] = useState(false)

	const handleStart = () =>{
		setTimeLeft(Number(countPeople*60))
		setIsCounting(true)
	}
	const handleStop = () =>{
		setIsCounting(false)
	}


	useEffect( () =>{
		const interval = setInterval(() =>{
			isCounting && setTimeLeft( prev => prev >= 1 ? prev - 1 : 0)
		},1000)
		if (timeLeft === 0) setIsCounting(false)
		return () => clearInterval(interval)
	},[timeLeft,isCounting])

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const light = await bridge.send("VKWebAppFlashGetInfo");
			if (light.is_available){
				setFlashLight(true)
			}
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);
	useEffect( () =>{

	},[])

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const openTheFlashLight = async () =>{
		try{
			await bridge.send("VKWebAppFlashSetLevel", {"level": 1});
			setTurnFlashLight(true)
		} catch (e) {
			console.log(e)
		}
	}
	const closeTheFlashLight = async () =>{
		try{
			await bridge.send("VKWebAppFlashSetLevel", {"level": 0});
			setTurnFlashLight(false)
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id='home' fetchedUser={fetchedUser} go={go} setActivePanel = {setActivePanel} locations = {locations} setLocations ={setLocations} scheme = {scheme} />
								<InfoForStartScreen id='info_for_start' go={go} scheme = {scheme} setActivePanel = {setActivePanel}  countPeople = {countPeople}
													setCountPeople = {setCountPeople} setSnackBar ={setSnackBar} snackBar ={snackBar}/>
								<NameInfoForStartScreen id='name_info_for_start' go={go} scheme = {scheme} setActivePanel = {setActivePanel}
														peopleInGroupArray = {peopleInGroupArray} setPeopleInGroup={setPeopleInGroup} setSnackBar ={setSnackBar} snackBar ={snackBar} countPeople = {countPeople} />
								<CardPickingScreen id="card_picking" go={go} setActivePanel = {setActivePanel} peopleInGroup ={peopleInGroupArray}
												   countPeople={countPeople} locations = {locations} currentLocation ={currentLocation} setCurrentLocation ={setCurrentLocation}
												   isCounting = {isCounting}
												   setIsCounting = {setIsCounting} timeLeft = {timeLeft}
												   setTimeLeft = {setTimeLeft} handleStart = {handleStart} peopleAndRoles = {peopleAndRoles} setPeopleAndRoles = {setPeopleAndRoles}
								/>
								<GameScreen
									id="game_play"
									setCurrentLocation = {setCurrentLocation}
									go={go}
									setTurnFlashLight = {setTurnFlashLight}
									setActivePanel = {setActivePanel} locations = {locations}
									currentLocation ={currentLocation} isCounting = {isCounting}
									setIsCounting = {setIsCounting} timeLeft = {timeLeft}
									setTimeLeft = {setTimeLeft} flashLight = {flashLight}
									openTheFlashLight = {openTheFlashLight} closeTheFlashLight ={closeTheFlashLight}
									flashLightOn = {flashLightOn}


								/>
								<CheckLocations
									go={go}
									id = "check_locations"
									setActivePanel = {setActivePanel} locations = {locations}
									isCounting = {isCounting} timeLeft = {timeLeft}
								/>
								<EndScreenRoles id ="endscreen_roles"
												go={go}
												peopleAndRoles = {peopleAndRoles} setPeopleAndRoles = {setPeopleAndRoles}
												currentLocation ={currentLocation} peopleInGroup = {peopleInGroupArray}
												setCurrentLocation ={setCurrentLocation}

								/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;

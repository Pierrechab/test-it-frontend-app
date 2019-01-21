import React from "react";
import axios from "axios";
import {
	KeyboardAvoidingView,
	AsyncStorage,
	Image,
	Text,
	TouchableOpacity,
	TextInput,
	View,
	ScrollView,
	Button,
	Platform
} from "react-native";
import { Permissions, Notifications } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BackGroundImage from "../../components/BackGroundImage";

export default class LogIn extends React.Component {
	static navigationOptions = {
		title: "Connexion",
		headerStyle: {
			backgroundColor: "#041A39"
		},
		headerTintColor: "#ffffff",
		headerTitleStyle: {
			fontWeight: "bold"
		}
		//header: null //pour enlever le header
	};

	state = {
		email: "jo@msn.com",
		password: "jo",
		isAuthenticated: false,
		tokenNotifications: ""
	};

	forgetSubmit = () => {
		const { navigate } = this.props.navigation;
		navigate("ForgotPassword");
	};

	async registerForPushNotificationsAsync() {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;

		// only ask if permissions have not already been determined, because
		// iOS won't necessarily prompt the user a second time.
		if (existingStatus !== "granted") {
			// Android remote notification permissions are granted during the app
			// install, so this will only ask on iOS
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}

		// Stop here if the user did not grant permissions
		if (finalStatus !== "granted") {
			return;
		}

		// Get the token that uniquely identifies this device
		let token = await Notifications.getExpoPushTokenAsync();
		this.setState(
			{
				tokenNotifications: token
			},
			() => {
				console.log(this.state.tokenNotifications);
			}
		);
	}

	handleSubmit = () => {
		const { navigate } = this.props.navigation;
		axios
			.post("http://localhost:3000/log_in", {
				tokenNotifications: this.state.tokenNotifications,
				email: this.state.email,
				password: this.state.password
			})
			.then(response => {
				// console.log("response****", response.data);

				if (response) {
					AsyncStorage.setItem(
						"userInformation",
						JSON.stringify(response.data),
						() => {
							navigate("Main");
						}
					);
				}
			})
			.catch(err => {
				console.log("erreur", err);
				alert("Mauvais identifiant ou mauvais mot de passe");
			});
	};
	componentDidMount() {
		console.log("did mount");
		this.registerForPushNotificationsAsync();
	}

	render() {
		return (
			<BackGroundImage style={{ flex: 1, width: "100%" }}>
				<KeyboardAwareScrollView
					enabledOnAndroid={true}
					// enableAutoAutomaticScroll={Platform.OS === "ios"}
					style={{
						display: "flex",
						// backgroundColor: "#FF5054"
						// justifyContent: "center",
						// alignItems: "center",
						flex: 1
					}}
					extraScrollHeight={80}
					resetScrollToCoords={{ x: 0, y: 0 }}
					contentContainerStyle={{
						// backgroundColor: "#FF5054",
						justifyContent: "center",
						alignItems: "center",
						flex: 1
					}}
					scrollEnabled
				>
					<Image
						style={{
							height: 160,
							width: 160,
							alignSelf: "center",
							marginTop: 30,
							marginRight: 30
						}}
						source={require("../../assets/images/testit-logo.png")}
					/>
					<TextInput
						style={{
							fontSize: 20,
							color: "black",
							height: 50,
							width: 200,
							marginTop: 30,
							borderBottomWidth: 1,
							borderBottomColor: "rgb(103,114,129)",
							paddingBottom: 5
						}}
						placeholder="email" //arno@airbnb-api.com
						placeholderTextColor="lightgrey"
						type="email-address"
						autoCapitalize="none"
						name="email"
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
					/>
					<TextInput
						style={{
							fontSize: 20,
							color: "black",
							height: 50,
							width: 200,
							marginTop: 30,
							borderBottomWidth: 1,
							borderBottomColor: "rgb(103,114,129)",
							paddingBottom: 5
						}}
						placeholder="........"
						placeholderTextColor="lightgrey"
						secureTextEntry
						type="text"
						name="password"
						value={this.state.password}
						onChangeText={text => this.setState({ password: text })}
					/>
					<TouchableOpacity
						style={{
							height: 40,
							width: 190,
							borderRadius: 20,
							backgroundColor: "white",
							alignItems: "center",
							justifyContent: "center",
							marginTop: 50,
							alignSelf: "center"
						}}
						onPress={this.handleSubmit}
					>
						<Text>SE CONNECTER</Text>
					</TouchableOpacity>
					<View style={{ marginTop: 15 }}>
						<Button
							title="Mot de passe oublié ?"
							color="#841584"
							onPress={this.forgetSubmit}
						/>
					</View>
				</KeyboardAwareScrollView>
			</BackGroundImage>
		);
	}
}

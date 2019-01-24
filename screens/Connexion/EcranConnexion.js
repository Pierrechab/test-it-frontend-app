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
			backgroundColor: "#F5F5F5"
		},
		headerTintColor: "#041A39",
		headerTitleStyle: {
			fontWeight: "bold",
			fontSize: 22
		}
		//header: null //pour enlever le header
	};

	state = {
		email: "" /* "jo@msn.com" */,
		password: "",
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
		// console.log("yes");
		// Get the token that uniquely identifies this device
		let token = await Notifications.getExpoPushTokenAsync();
		// console.log(token);
		this.setState(
			{
				tokenNotifications: token
			},
			() => {
				// console.log("yo", this.state.tokenNotifications);
			}
		);
	}

	handleSubmit = () => {
		const { navigate } = this.props.navigation;
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (reg.test(this.state.email) === false) {
			alert("Email invalide");
		} else {
			axios
				.post("http://192.168.86.23:3000/log_in", {
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
		}
	};
	componentDidMount() {
		console.log("did mount");
		this.registerForPushNotificationsAsync();
	}

	render() {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
						marginTop: 100,
						marginBottom: 200,
						alignItems: "center",
						// justifyContent: "space-around",
						// justifyContent: "space-between",
						flex: 1
					}}
					scrollEnabled
				>
					<Image
						style={{
							height: 160,
							width: 160,
							alignSelf: "center",
							// marginTop: 30,
							marginRight: 30
						}}
						source={require("../../assets/images/testit-logo.png")}
					/>
					<View>
						<TextInput
							style={{
								fontSize: 17,
								color: "#041A39",
								height: 30,
								width: 250,
								marginTop: 30,
								borderBottomWidth: 1,
								borderBottomColor: "#041A39",
								paddingBottom: 2,
								textAlign: "center",
								fontStyle: "italic"
							}}
							placeholder="Enter your email" //arno@airbnb-api.com
							placeholderTextColor="#041A39"
							textContentType="emailAddress"
							keyboardType="email-address"
							autoCapitalize="none"
							name="email"
							value={this.state.email}
							onChangeText={email => this.setState({ email })}
						/>
						<TextInput
							style={{
								fontSize: 17,
								textAlign: "center",
								fontStyle: "italic",
								color: "#041A39",
								height: 30,
								width: 250,
								marginTop: 30,
								borderBottomWidth: 1,
								borderBottomColor: "#041A39",
								paddingBottom: 2
							}}
							placeholder="Enter your password"
							placeholderTextColor="#041A39"
							secureTextEntry
							textContentType="password"
							name="password"
							value={this.state.password}
							onChangeText={text => this.setState({ password: text })}
						/>
					</View>
					<View>
						{this.state.email !== "" &&
						this.state.password !== "" &&
						reg.test(this.state.email) === true ? (
							<TouchableOpacity
								style={{
									height: 40,
									width: 190,
									borderRadius: 20,
									backgroundColor: "#B2025A",
									alignItems: "center",
									justifyContent: "center",
									marginTop: 50,
									alignSelf: "center",
									// borderColor: "#041A39",
									// borderWidth: 0.5,
									shadowColor: "#041A39",
									shadowOffset: { width: 5, height: 5 },
									shadowOpacity: 0.4
								}}
								onPress={this.handleSubmit}
							>
								<Text style={{ color: "white", fontWeight: "bold" }}>
									SE CONNECTER
								</Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								style={{
									height: 40,
									width: 190,
									borderRadius: 20,
									backgroundColor: "white",
									alignItems: "center",
									justifyContent: "center",
									marginTop: 50,
									alignSelf: "center",
									// borderColor: "#041A39",
									// borderWidth: 0.5,
									shadowColor: "#041A39",
									shadowOffset: { width: 5, height: 5 },
									shadowOpacity: 0.4
								}}
								onPress={this.handleSubmit}
							>
								<Text style={{ color: "#041A39", fontWeight: "bold" }}>
									SE CONNECTER
								</Text>
							</TouchableOpacity>
						)}

						<View style={{ marginTop: 7 }}>
							<Button
								style={{ fontSize: 10 }}
								title="Mot de passe oublié ?"
								color="#841584"
								onPress={this.forgetSubmit}
							/>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</BackGroundImage>
		);
	}
}

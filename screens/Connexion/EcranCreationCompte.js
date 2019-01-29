import React from "react";
import axios from "axios";
import {
	KeyboardAvoidingView,
	Image,
	Text,
	TouchableOpacity,
	TextInput,
	Platform,
	View,
	ScrollView
} from "react-native";
import Icono from "react-native-vector-icons/FontAwesome";
import BackGroundImage from "../../components/BackGroundImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// pierre@msn.com
//  pierre

export default class SignUpScreen extends React.Component {
	static navigationOptions = {
		title: "Inscription",
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
		email: "",
		password: "",
		passwordConfirmed: ""
		//hasCheckedEmail: false
	};

	handleSubmit = () => {
		const { navigate } = this.props.navigation;
		if (this.state.email !== "" && this.state.password !== "") {
			if (this.state.password !== this.state.passwordConfirmed) {
				alert("Mots de passe différents");
			} else {
				axios
					.post("http://192.168.86.249:3000/sign_up", {
						email: this.state.email,
						password: this.state.password
					})
					.then(response => {
						if (response) {
							navigate("StartingProfile", { _id: response.data._id });
							//J'envoie l'Id sur l'écran startingProfile
						}
					})
					.catch(err => {
						console.log("erreur", err);
						alert("Email déjà utilisé. Veuillez donner un email valable.");
					});
			}
		} else {
			alert(
				"Veuillez renseigner un email valide et choisir votre mot de passe"
			);
		}
	};
	// renderIconEmail = () => {
	//   axios
	//     .post("http://192.168.86.249:3000/freeemail", {
	//       hasCheckedEmail: this.state.hasCheckedEmail
	//     })
	//     .then(response => {
	//       if (response) {
	//         return <Icono name="check-circle" size={30} color="green" />;
	//       }
	//     });
	// };
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
							marginTop: 30,
							marginRight: 30
						}}
						source={require("../../assets/images/testit-logo.png")}
					/>
					<View>
						<TextInput
							keyboardType="email-address"
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
							placeholder="Entrez votre email" //arno@airbnb-api.com
							placeholderTextColor="#041A39"
							textContentType="emailAddress"
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
							placeholder="Entrez votre mot de passe"
							placeholderTextColor="#041A39"
							secureTextEntry
							// textContentType="password"
							name="mot de passe"
							value={this.state.password}
							onChangeText={password => this.setState({ password })}
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
							placeholder="Confirmez votre mot de passe"
							placeholderTextColor="#041A39"
							secureTextEntry
							// textContentType="password"
							name="confirmation de mot de passe"
							value={this.state.passwordConfirmed}
							onChangeText={passwordConfirmed =>
								this.setState({ passwordConfirmed })
							}
						/>
					</View>
					{/* {this.state.hasCheckedEmail  && this.renderIconEmail()} */}
					{this.state.email !== "" &&
					this.state.password !== "" &&
					this.state.password === this.state.passwordConfirmed ? (
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
								CONTINUER
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
								CONTINUER
							</Text>
						</TouchableOpacity>
					)}
				</KeyboardAwareScrollView>
			</BackGroundImage>
		);
	}
}

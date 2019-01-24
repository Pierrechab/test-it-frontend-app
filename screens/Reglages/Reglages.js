import React from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
// import Icon5 from "react-native-vector-icons/FontAwesome5";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconIonicons from "react-native-vector-icons/Ionicons";
import BackGroundImage from "../../components/BackGroundImage";

export default class ReglagesScreen extends React.Component {
	static navigationOptions = {
		title: "Paramètres",
		headerStyle: {
			backgroundColor: "#F5F5F5"
		},
		headerTintColor: "#041A39",
		headerTitleStyle: {
			fontWeight: "bold",
			fontSize: 22
		}
	};

	logOut = () => {
		AsyncStorage.removeItem("userInformation").then(() => {
			this.props.navigation.navigate("Auth");
		});
	};
	getContact = () => {
		console.log("youpi", this.props);
		const { navigate } = this.props.navigation;
		navigate("ContactUs");
	};
	getBank = () => {
		console.log("youpi", this.props);
		const { navigate } = this.props.navigation;
		navigate("BankAccount");
	};
	getNewPassword = () => {
		const { navigate } = this.props.navigation;
		navigate("NewPassword");
	};
	getCertification = () => {
		const { navigate } = this.props.navigation;
		navigate("Certification");
	};
	getFAQ = () => {
		const { navigate } = this.props.navigation;
		navigate("FAQ");
	};

	render() {
		const { navigate } = this.props.navigation;
		return (
			<BackGroundImage style={{ flex: 1, width: "100%" }}>
				<ScrollView>
					<View
						style={{
							flex: 1,
							alignItems: "center",
							marginTop: 13,
							justifyContent: "flex-start"
						}}
					>
						<TouchableOpacity
							style={{
								...styles.conexion
							}}
							onPress={this.getBank}
						>
							<View
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<IconEntypo name="credit-card" size={30} color="#428CC4" />
							</View>
							<View
								style={{
									flex: 6,
									justifyContent: "center",
									marginLeft: 25
								}}
							>
								<Text
									style={{
										color: "#041A39",
										fontSize: 14
									}}
								>
									Mes données bancaires
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.conexion
							}}
							onPress={this.getNewPassword}
						>
							<View
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Icon name="cogs" size={30} color="lightgray" />
							</View>
							<View
								style={{
									flex: 6,
									justifyContent: "center",
									marginLeft: 25
								}}
							>
								<Text
									style={{
										color: "#041A39",
										fontSize: 14
									}}
								>
									Changer mon mot de passe
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.conexion
							}}
							onPress={this.getFAQ}
						>
							<View
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Icon name="question" size={30} color="blue" />
							</View>
							<View
								style={{
									flex: 6,
									justifyContent: "center",
									marginLeft: 25
								}}
							>
								<Text
									style={{
										color: "#041A39",
										fontSize: 14
									}}
								>
									F.A.Q
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.conexion
							}}
							onPress={this.getContact}
						>
							<View
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<IconIonicons name="ios-mail" size={30} color="burlywood" />
							</View>
							<View
								style={{
									flex: 6,
									justifyContent: "center",
									marginLeft: 25
								}}
							>
								<Text
									style={{
										color: "#041A39",
										fontSize: 14
									}}
								>
									Nous contacter
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.conexion
							}}
							onPress={this.getCertification}
						>
							<View
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Icon name="check-square-o" size={30} color="darkseagreen" />
							</View>
							<View
								style={{
									flex: 6,
									justifyContent: "center",
									marginLeft: 25
								}}
							>
								<Text
									style={{
										color: "#041A39",
										fontSize: 14
									}}
								>
									Faire certifier mon compte
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.conexion,
								width: 250
							}}
							onPress={this.logOut}
						>
							<View
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Icon name="power-off" size={30} color="red" />
							</View>
							<View
								style={{
									flex: 3,
									justifyContent: "center",
									marginLeft: 25
								}}
							>
								<Text
									style={{
										color: "#041A39",
										fontSize: 14
									}}
								>
									Déconnexion
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</BackGroundImage>
		);
	}
}
const styles = StyleSheet.create({
	conexion: {
		display: "flex",
		paddingLeft: 28,
		paddingRight: 28,
		width: 300,
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 55,
		alignItems: "center",
		justifyContent: "center",
		margin: 20,
		alignSelf: "center",
		height: 60,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		// borderColor: "#B2025A",
		// borderWidth: 0.5,
		shadowColor: "#041A39",
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.2,
		flexDirection: "row"
	}
});

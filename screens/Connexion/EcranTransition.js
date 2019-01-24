import React from "react";

import {
	KeyboardAvoidingView,
	AsyncStorage,
	Image,
	Text,
	TouchableOpacity,
	TextInput
} from "react-native";
import BackGroundImage from "../../components/BackGroundImage";

export default class Transition extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Bienvenue",
		headerStyle: {
			backgroundColor: "#F5F5F5"
		},
		headerTintColor: "#041A39",
		headerTitleStyle: {
			fontWeight: "bold",
			fontSize: 22
		}
	});

	//   static navigationProps = {
	//     header: ({ state }) => {
	//       return {
	//         title: state.params.firstname
	//       };
	//     }
	//   };

	//   componentDidMount() {
	//     this.props.navigation.setParams({
	//       firstName: this.props.navigation.state.params.firstName
	//     });
	//   }

	render() {
		const { navigate } = this.props.navigation;

		return (
			<BackGroundImage style={{ flex: 1, width: "100%" }}>
				<Image
					style={{
						height: 160,
						width: 160,
						alignSelf: "center",
						marginTop: 60,
						marginRight: 30
					}}
					source={require("../../assets/images/testit-logo.png")}
				/>
				<Text
					style={{
						marginTop: 35,
						fontSize: 30,
						color: "#041A39",
						alignSelf: "center"
					}}
				>
					Bienvenue {this.props.navigation.state.params.firstName}
				</Text>
				<Text
					style={{
						fontSize: 15,
						color: "#041A39",
						alignSelf: "center",
						marginTop: 30,
						marginLeft: 30,
						marginRight: 30,
						textAlign: "center"
					}}
				>
					Tu vas maintenant avoir accès aux annonces qui correspondent à ton
					profil et t'inscrire à tes premiers tests !
				</Text>
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
					onPress={() =>
						navigate("Main", {
							_id: this.props.navigation.state.params._id
						})
					}
				>
					<Text style={{ color: "#041A39", fontWeight: "bold" }}>
						C'est parti !
					</Text>
				</TouchableOpacity>
			</BackGroundImage>
		);
	}
	// componentDidMount() {
	// 	AsyncStorage.getItem("userInformation", (err, result) => {
	// 		const userInformation = JSON.parse(result);
	// 		console.log(userInformation);
	// 		this.setState({ userInformation: userInformation });
	// 		console.log("state", this.state);
	// 	});
	// }
}

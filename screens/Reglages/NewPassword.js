import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	AsyncStorage
} from "react-native";
import axios from "axios";

class NewPassword extends React.Component {
	state = {
		oldPassword: "",
		newPassword: ""
	};

	handleSubmit = () => {
		AsyncStorage.getItem("userInformation", (err, result) => {
			const userInformation = JSON.parse(result);
			const id = userInformation._id;
			console.log(userInformation);
			axios
				.post("http://192.168.86.249:3000/newPassword", {
					id: id,
					oldPassword: this.state.password,
					newPassword: this.state.newPassword
				})
				.then(response => {
					// console.log("response****", response.data);
					if (response) {
						alert("Nouveau mdp enregistré avec succès");
						this.props.navigation.navigate("Reglages");
					}
				})
				.catch(err => {
					console.log("erreur", err);
					alert("Ancien mdp invalide");
				});
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>This is the NewPassword component</Text>
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
					placeholder="ancien mdp" //arno@airbnb-api.com
					placeholderTextColor="lightgrey"
					type="password"
					autoCapitalize="none"
					name="oldPassword"
					value={this.state.oldPassword}
					onChangeText={oldPassword => this.setState({ oldPassword })}
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
					placeholder="new mdp"
					placeholderTextColor="lightgrey"
					secureTextEntry
					type="password"
					name="newPassword"
					value={this.state.newPassword}
					onChangeText={newPassword =>
						this.setState({ newPassword: newPassword })
					}
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
					<Text>Valider</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default NewPassword;

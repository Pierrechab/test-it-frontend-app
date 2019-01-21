import React from "react";
import axios from "axios";
import {
	AsyncStorage,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Image,
	StyleSheet,
	ScrollView
} from "react-native";
import Icono from "react-native-vector-icons/FontAwesome";
import DateTimePickerTester from "../../components/DateTimePickerTester";
import ButtonSex from "../../components/ButtonSex";
import { ImagePicker, Camera, Permissions } from "expo";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class StatingProfileScreen extends React.Component {
	static navigationOptions = {
		title: "Profil ",
		headerStyle: {
			backgroundColor: "rgb(239,239,244)"
		}
		//header: null //pour enlever le header
	};
	// L'Id est déjà transmis par la birthDate d'avant, pas besoin de le mettre dans les state
	// On recupere l'Id par : this.props.navigation.state.params
	state = {
		firstName: "",
		lastName: "",
		birthDate: new Date(),
		sex: "",
		image: "WOW",
		hasCameraPermission: null,
		showCamera: false,
		avatar: ""
	};

	handleAvatar = value => {
		this.setState({
			avatar: "data:image/jpg;base64," + value
		});
	};

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === "granted" });
	}

	_pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 4],
			base64: true
		});
		this.handleAvatar(result.base64);
		this.setState({ image: result.uri, showCamera: false });
	};

	snap = async () => {
		let result = await this.camera.takePictureAsync({
			base64: true
		});
		this.handleAvatar(result.base64);
		this.setState({
			image: result.uri,
			showCamera: false
		});
	};

	renderPicture = () => {
		let { image, showCamera } = this.state;

		if (showCamera === true) {
			return (
				<View>
					<View style={customStyles.viewCamera}>
						<Camera
							style={customStyles.camera}
							type={Camera.Constants.Type.front}
							ref={ref => {
								this.camera = ref;
							}}
						/>
					</View>

					<TouchableOpacity onPress={this.snap} style={customStyles.snap}>
						<Entypo name="fingerprint" size={34} color="#FFFFFF" />
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View>
					<Image
						// Add component of Tovo (inital name) if there is no image
						source={{ uri: image || image }}
						style={customStyles.image}
					/>
				</View>
			);
		}
	};

	// componentDidMount() {
	// 	console.log("did mount", this.state);
	// }

	renderIcon = () => {
		if (
			(this.state.firstName !== "") &
			(this.state.lastName !== "") &
			(this.state.sex !== "") &
			(this.state.birthDate !== "")
		) {
			return (
				<TouchableOpacity
					style={{
						height: 60,
						width: 60,
						marginLeft: 200,
						marginTop: 100,
						borderRadius: 60,
						backgroundColor: "rgb(171,36,100)",
						justifyContent: "center",
						alignItems: "center"
					}}
					onPress={this.handleSubmit}
				>
					<Icono name="chevron-right" size={30} color="white" />
				</TouchableOpacity>
			);
		}
	};

	handleSubmit = () => {
		const { navigate } = this.props.navigation;
		const { firstName, lastName, sex, birthDate } = this.state;
		axios
			.post("http://localhost:3000/user/update", {
				_id: this.props.navigation.state.params,
				firstName,
				lastName,
				sex,
				birthDate
			})
			.then(response => {
				if (response) {
					AsyncStorage.setItem(
						"userInformation",
						JSON.stringify(response.data),
						() => {
							navigate("Transition", { firstName: this.state.firstName });
						}
					);
				}
			})
			.catch(err => {
				console.log("erreur", err);
			});
	};

	render() {
		// console.log("this.props.navigation.state.params",
		//   this.props.navigation.state.params)

		return (
			<ScrollView>
				<KeyboardAwareScrollView
					enabledOnAndroid
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
					<View>
						{this.renderPicture()}
						<View
							style={{
								flexDirection: "row",
								paddingTop: 50
							}}
						>
							<TouchableOpacity
								onPress={this._pickImage}
								style={[
									// styles.bgWhite,
									// styles.padding10,
									// styles.margin10,
									customStyles.w50,
									{ borderRadius: 5 }
								]}
							>
								<Entypo
									name="images"
									size={32}
									color="#1d262a"
									// style={styles.textCenter}
								/>
								<Text /* style={[styles.textCenter, styles.blackColor]} */>
									Choisir une photo
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									this.setState({
										showCamera: true
									});
								}}
								style={[
									// styles.bgWhite,
									// styles.padding10,
									// styles.margin10,
									customStyles.w50,
									{ borderRadius: 5 }
								]}
							>
								<Entypo
									name="camera"
									size={32}
									color="#1d262a"
									// style={styles.textCenter}
								/>

								<Text /* style={[styles.textCenter, styles.blackColor]} */>
									Prendre une photo
								</Text>
							</TouchableOpacity>
						</View>

						<View
							style={{
								marginLeft: 20,
								marginRight: 20,
								marginTop: 30,
								flex: 1,
								backgroundColor: "rgb( 239,239,244)"
							}}
						>
							<Text>Prénom</Text>
							<TextInput
								style={{
									fontSize: 20,
									color: "black",
									height: 35,
									backgroundColor: "white",
									marginTop: 10,
									paddingLeft: 6,
									fontSize: 15,
									borderWidth: 1,
									borderColor: "rgb(103,114,129)",
									paddingBottom: 5
								}}
								type="text"
								name="firstName"
								value={this.state.firstName}
								onChangeText={firstName => this.setState({ firstName })}
							/>
							<Text style={{ marginTop: 10 }}>Nom</Text>
							<TextInput
								style={{
									fontSize: 20,
									backgroundColor: "white",
									color: "black",
									height: 35,
									fontSize: 15,
									paddingLeft: 6,
									marginTop: 10,
									borderWidth: 1,
									borderColor: "rgb(103,114,129)",
									paddingBottom: 5
								}}
								type="text"
								name="lastName"
								value={this.state.lastName}
								onChangeText={lastName => this.setState({ lastName })}
							/>
							<Text style={{ marginTop: 20 }}>Date de naissance</Text>

							<View
								style={{
									height: 35,
									backgroundColor: "white",
									marginTop: 10,
									borderWidth: 1,
									borderColor: "rgb(103,114,129)",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<DateTimePickerTester
									changeDate={birthDate => {
										this.setState({ birthDate });
									}}
									birthDate={this.state.birthDate}
								/>
							</View>
							<Text style={{ marginTop: 10 }}>Sexe</Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-evenly",
									marginTop: 10
								}}
							>
								<ButtonSex
									type="Homme"
									selected={this.state.sex === "homme" ? true : false}
									onPress={() => this.setState({ sex: "homme" })}
								/>
								<ButtonSex
									type="Femme"
									selected={this.state.sex === "femme" ? true : false}
									onPress={() => this.setState({ sex: "femme" })}
								/>
							</View>

							{this.renderIcon()}
						</View>
					</View>
				</KeyboardAwareScrollView>
			</ScrollView>
		);
	}
}
const customStyles = StyleSheet.create({
	// w50: { width: Dimensions.get("window").width / 2 - 40 },
	snap: {
		backgroundColor: "#1d262a",
		width: 55,
		height: 55,
		borderRadius: 55,
		borderColor: "#1d262a",
		borderWidth: 5,
		position: "absolute",
		padding: 5,
		top: 120,
		left: 48
	},
	camera: { width: 150, height: 190 },
	viewCamera: {
		width: 150,
		overflow: "hidden",
		height: 150,
		borderRadius: 75
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 75,
		borderColor: "#FFF",
		borderWidth: 5,
		backgroundColor: "#1d262a"
	},
	input: {
		backgroundColor: "#FFF",
		borderRadius: 3,
		padding: 15,
		// width: Dimensions.get("window").width - 60,
		marginBottom: 10,
		marginTop: 30
	},
	button: {
		backgroundColor: "#1d262a",
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10
		// width: Dimensions.get("window").width - 60
	},
	buttonSecondary: {
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10,
		borderWidth: 1,
		borderColor: "#1d262a"
		// width: Dimensions.get("window").width - 60
	}
});

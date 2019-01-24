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
	ScrollView,
	Dimensions
} from "react-native";
import Icono from "react-native-vector-icons/FontAwesome";
import DateTimePickerTester from "../../components/DateTimePickerTester";
import ButtonSex from "../../components/ButtonSex";
import { ImagePicker, Camera, Permissions } from "expo";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BackGroundImage from "../../components/BackGroundImage";

export default class StatingProfileScreen extends React.Component {
	static navigationOptions = {
		title: "Profil ",
		headerStyle: {
			backgroundColor: "#F5F5F5"
		},
		headerTintColor: "#041A39",
		headerTitleStyle: {
			fontWeight: "bold",
			fontSize: 22
		},
		headerLeft: null
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
				<View style={{ justifyContent: "center", alignItems: "center" }}>
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
				<View>
					<TouchableOpacity
						style={{
							width: 170,
							height: 40,
							marginTop: 30,
							borderRadius: 60,
							backgroundColor: "#B2025A",
							justifyContent: "center",
							alignItems: "center"
						}}
						onPress={this.handleSubmit}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<Text
								style={{
									color: "white",
									fontWeight: "bold",
									flex: 4,
									textAlign: "center"
								}}
							>
								CONTINUER
							</Text>
							<View style={{ flex: 1 }}>
								<Icono name="chevron-right" size={25} color="white" />
							</View>
						</View>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View>
					<TouchableOpacity
						style={{
							width: 170,
							height: 40,
							marginTop: 30,
							borderRadius: 60,
							backgroundColor: "white",
							justifyContent: "center",
							alignItems: "center"
						}}
						onPress={this.handleSubmit}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<Text
								style={{
									color: "#041A39",
									fontWeight: "bold",
									flex: 4,
									textAlign: "center"
								}}
							>
								CONTINUER
							</Text>
							<View style={{ flex: 1 }}>
								<Icono name="chevron-right" size={25} color="#041A39" />
							</View>
						</View>
					</TouchableOpacity>
				</View>
			);
		}
	};

	handleSubmit = () => {
		const { navigate } = this.props.navigation;
		const { firstName, lastName, sex, birthDate } = this.state;
		axios
			.post("http://192.168.86.23:3000/user/update", {
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
			<BackGroundImage style={{ flex: 1, width: "100%" }}>
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
						justifyContent: "space-between",
						alignItems: "center",
						flex: 1,
						marginTop: 30,
						marginBottom: 100
					}}
					scrollEnabled
				>
					<View
						style={{
							display: "flex",
							// marginTop: 35,
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						{this.renderPicture()}
						<View
							style={{
								flexDirection: "row",
								paddingTop: 10
							}}
						>
							<TouchableOpacity
								onPress={this._pickImage}
								style={[
									customStyles.w50,
									{ borderRadius: 5, display: "flex", alignItems: "center" }
								]}
							>
								<Entypo
									name="images"
									size={32}
									color="#041A39"
									// style={styles.textCenter}
								/>
								<Text style={{ color: "#041A39" }}>Choisir une photo</Text>
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
									{ borderRadius: 5, display: "flex", alignItems: "center" }
								]}
							>
								<Entypo
									name="camera"
									size={32}
									color="#041A39"
									// style={styles.textCenter}
								/>

								<Text style={{ color: "#041A39" }}>Prendre une photo</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View
						style={{
							display: "flex",
							marginTop: 30,
							justifyContent: "center"
						}}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								// justifyContent: "center",
								alignItems: "center"
							}}
						>
							<Text
								style={{
									color: "#041A39",
									fontSize: 15,
									flex: 1,
									marginRight: 10
								}}
							>
								Prénom :
							</Text>
							<TextInput
								style={{
									fontSize: 15,
									color: "#041A39",
									height: 35,
									padding: 6,
									borderBottomWidth: 1,
									borderColor: "#041A39",
									flex: 3,
									textAlign: "center",
									fontStyle: "italic"
								}}
								placeholder="Marc"
								placeholderTextColor="#041A39"
								type="text"
								name="firstName"
								value={this.state.firstName}
								onChangeText={firstName => this.setState({ firstName })}
							/>
						</View>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								// justifyContent: "center",
								alignItems: "center",
								marginTop: 20
							}}
						>
							<Text style={{ marginTop: 10, flex: 1, marginRight: 10 }}>
								Nom :
							</Text>
							<TextInput
								style={{
									fontSize: 15,
									color: "#041A39",
									height: 35,
									padding: 6,
									borderBottomWidth: 1,
									borderColor: "#041A39",
									flex: 3,
									textAlign: "center",
									fontStyle: "italic"
								}}
								placeholder="Dupond"
								placeholderTextColor="#041A39"
								type="text"
								name="lastName"
								value={this.state.lastName}
								onChangeText={lastName => this.setState({ lastName })}
							/>
						</View>
						<View
							style={{
								display: "flex",
								height: 40,
								width: 300,
								backgroundColor: "white",
								marginTop: 40,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 18,
								shadowColor: "#000000",
								shadowOffset: { width: 5, height: 5 },
								shadowOpacity: 0.4
							}}
						>
							<DateTimePickerTester
								changeDate={birthDate => {
									this.setState({ birthDate });
								}}
								birthDate={this.state.birthDate}
							/>
						</View>
						<Text
							style={{
								marginTop: 15,
								textAlign: "center",
								color: "#041A39",
								fontSize: 18
							}}
						>
							Vous êtes :
						</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-evenly"
							}}
						>
							<ButtonSex
								type="Un homme"
								selected={this.state.sex === "homme" ? true : false}
								onPress={() => this.setState({ sex: "homme" })}
							/>
							<ButtonSex
								type="Une femme"
								selected={this.state.sex === "femme" ? true : false}
								onPress={() => this.setState({ sex: "femme" })}
							/>
						</View>
						<View
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							{this.renderIcon()}
						</View>
					</View>
				</KeyboardAwareScrollView>
			</BackGroundImage>
		);
	}
}
const customStyles = StyleSheet.create({
	w50: { width: Dimensions.get("window").width / 2 - 40 },
	snap: {
		backgroundColor: "#041A39",
		width: 55,
		height: 55,
		borderRadius: 55,
		borderColor: "#FFF",
		borderWidth: 3,
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
		borderWidth: 3,
		backgroundColor: "#041A39"
	},
	input: {
		backgroundColor: "#041A39",
		borderRadius: 3,
		padding: 15,
		// width: Dimensions.get("window").width - 60,
		marginBottom: 10,
		marginTop: 30
	},
	button: {
		backgroundColor: "#041A39",
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
		borderColor: "#FFF"
		// width: Dimensions.get("window").width - 60
	}
});

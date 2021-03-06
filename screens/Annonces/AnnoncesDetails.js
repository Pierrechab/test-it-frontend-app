import React from "react";
import IonIcon from "react-native-vector-icons/Ionicons";
import MapView from "react-native-maps";
import axios from "axios";
import moment from "moment";
import { Share } from "react-native";
import { BackHandler } from "react-native";
import { LinearGradient } from "expo";
import {
	Image,
	ImageBackground,
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	FlatList,
	AlertIOS,
	AsyncStorage,
	Linking,
	WebView
} from "react-native";

class Offer extends React.Component {
	state = {
		user_id: "",
		offer: "",
		favorites: false,
		checkfavorites: "",
		history: false,
		checkhistory: "",
		register: false,
		participation: false,
		companyName: "",
		logoCompany: "",
		adresse: "",
		postalCode: "",
		city: "",
		country: "",
		latitude: "",
		longitude: ""
	};
	handleBackPress = () => {
		this.goBack();
		return true;
	};
	register = () => {
		axios
			.post("http://192.168.86.249:3000/addRemoveTester", {
				Offer_id: this.props.navigation.state.params.id,
				User_id: this.state.user_id
			})
			.then(response => {
				AlertIOS.alert("", response.data);
			})
			.catch(e => {
				console.error("error", e);
			});
		this.setState({
			register: !this.state.register
		});
	};
	getToFavorites = () => {
		if (this.state.register === true) {
			return AlertIOS.alert("", "Vous vous êtes déjà inscrit à cette offre.");
		}
		axios
			.post("http://192.168.86.249:3000/addToFavorite", {
				Offer_id: this.props.navigation.state.params.id,
				User_id: this.state.user_id
			})
			.then(response => {
				AlertIOS.alert("", response.data);
			})
			.catch(e => {
				console.error("error", e);
			});
		this.setState({
			favorites: !this.state.favorites
		});
	};
	share = () => {
		Share.share(
			{
				message:
					"BAM: we're helping your business with awesome React Native apps",
				url: "http://bam.tech",
				title: "Wow, did you see that?"
			},
			{
				// Android only:
				dialogTitle: "Share BAM goodness",
				// iOS only:
				excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"]
			}
		);
	};

	render() {
		// console.log(this.state.offer);
		// console.log(this.props.navigation.state.params.routeName);
		return (
			<View>
				<View style={styles.BoutonContainer}>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate(
								this.props.navigation.state.params.routeName.toString()
							);
							// this.props.navigation.state.params.pageName === undefined
							// 	? this.props.navigation.navigate("AnnoncesDetails", {
							// 			id: this.props.id,
							// 			navigation: this.props.navigation
							// 	  })
							// 	: this.props.navigation.navigate(
							// 			this.props.navigation.state.params.pageName.toString(),
							// 			{
							// 				id: this.props.id,
							// 				navigation: this.props.navigation
							// 			}
							// 	  );
						}}
					>
						<IonIcon
							name="ios-close-circle-outline"
							style={styles.iconCloseOn}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.getToFavorites();
						}}
					>
						{this.state.favorites === true ? (
							<IonIcon name="ios-heart" style={styles.iconFavorites} />
						) : (
							<IonIcon name="ios-heart-empty" style={styles.iconFavorites} />
						)}
					</TouchableOpacity>
				</View>
				<ScrollView style={styles.scrollviewContainer}>
					<View style={styles.ImageContainer}>
						{this.state.offer.picture === "" ? (
							this.state.logoCompany === "" ? (
								<ImageBackground
									style={styles.Image}
									source={require("../../assets/images/placeholder-image.png")}
								/>
							) : (
								<ImageBackground
									style={styles.Image}
									source={{
										uri: this.state.logoCompany
									}}
								/>
							)
						) : (
							<ImageBackground
								style={styles.Image}
								source={{
									uri: this.state.offer.picture
								}}
							/>
						)}
					</View>
					<View style={styles.title}>
						<Text style={styles.companyName} numberOfLines={1}>
							{this.state.companyName}
						</Text>
						<Text style={styles.titlePrice}>{this.state.offer.price} €</Text>
					</View>
					<Text style={styles.titleOffer} numberOfLines={1}>
						{this.state.offer.offerName}
					</Text>
					{/* Ligne de séparation */}
					<View style={styles.separationLine} />
					{/* =================== */}
					<View />
					<Text style={styles.subTitle}>Critères</Text>
					<View style={styles.ArrayContainer}>
						<View style={styles.ArrayContainerN1}>
							<IonIcon name="ios-calendar" style={styles.icones} />
							<Text style={styles.OfferSecondTitle}>
								Date :{" "}
								{moment(this.state.offer.deadlineTest).format("DD-MM-YYYY")}
							</Text>
						</View>
						{this.state.offer.typeOffer === "Online" ? (
							<View style={styles.ArrayContainerN1}>
								<IonIcon name="ios-phone-portrait" style={styles.icones} />
								<Text style={styles.OfferSecondTitle}>Sondage</Text>
							</View>
						) : (
							<View style={styles.ArrayContainerN1}>
								<IonIcon name="ios-beaker" style={styles.icones} />
								<Text style={styles.OfferSecondTitle}>Test produits</Text>
							</View>
						)}
					</View>
					<View style={styles.ArrayContainer}>
						<View style={styles.ArrayContainerN1}>
							<IonIcon name="ios-timer" style={styles.icones} />
							<Text style={styles.OfferSecondTitle}>
								Durée : {this.state.offer.duration}
							</Text>
						</View>
						<View style={styles.ArrayContainerN1}>
							<IonIcon name="ios-people" style={styles.icones} />
							<Text style={styles.OfferSecondTitle}>
								Nb de places : {this.state.offer.availabilities}
							</Text>
						</View>
					</View>
					{/* Ligne de séparation */}
					<View style={styles.separationLine} />
					{/* =================== */}
					<Text style={styles.subTitle}>Description</Text>
					<Text style={styles.paragraphe}>{this.state.offer.description}</Text>
					<Text style={styles.subTitle}>Profils recherchés</Text>
					<Text style={styles.paragraphe}>
						{this.state.offer.wantedProfiles}
					</Text>
					{/* Ligne de séparation */}
					<View style={styles.separationLine} />
					{/* =================== */}
					{this.state.offer.typeOffer === "Online" ? (
						// SI PAS DE LATITUDE NE PAS AFFICHER LA MAP
						<View />
					) : (
						<TouchableOpacity
							style={styles.mapViewContainer}
							onPress={() => {
								this.props.navigation.navigate("GPS", {
									id: this.state.offer._id,
									pageName: this.props.navigation.state.params.pageName.toString(),
									navigation: this.props.navigation,
									latitude: this.state.latitude,
									longitude: this.state.longitude,
									adresse: this.state.adresse,
									postalCode: this.state.postalCode,
									city: this.state.city,
									country: this.state.country,
									routeName: this.props.navigation.state.params.routeName
								});
							}}
						>
							<MapView
								style={styles.MapView}
								region={{
									latitude: Number(this.state.latitude),
									longitude: Number(this.state.longitude),
									latitudeDelta: 0.0922,
									longitudeDelta: 0.0421
								}}
							>
								<MapView.Marker
									coordinate={{
										latitude: Number(this.state.latitude),
										longitude: Number(this.state.longitude)
									}}
								/>
								{/* <LinearGradient
									colors={["rgba(255,255,255,0.1)", "white"]}
									start={[1, 0]}
									end={[0, 1]}
									style={styles.linearGradient}
								/> */}
								{/* <View style={styles.mapCache}>
									<Text style={styles.textMap}>
										{this.state.city} {this.state.postalCode}
									</Text>
									<TouchableOpacity
										style={styles.mapButton}
										onPress={() => {
											this.props.navigation.navigate("GPS", {
												id: this.state.offer._id,
												pageName: this.props.navigation.state.params.pageName.toString(),
												navigation: this.props.navigation,
												latitude: this.state.latitude,
												longitude: this.state.longitude,
												adresse: this.state.adresse,
												postalCode: this.state.postalCode,
												city: this.state.city,
												country: this.state.country
											});
										}}
									>
										<Text style={styles.textMapButton}>Voir sur la carte</Text>
									</TouchableOpacity>
								</View> */}
							</MapView>
						</TouchableOpacity>
					)}
					<View style={styles.shareContainer}>
						<TouchableOpacity
							style={styles.shareFacebookContainer}
							onPress={() => {
								this.share();
							}}
						>
							<IonIcon name="logo-facebook" style={styles.facebookShare} />
							<Text style={styles.labelShare}>Partager sur Facebook</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.shareFacebookContainer}
							onPress={() => {
								AlertIOS.alert("", "Le lien à été copié.");
							}}
						>
							<IonIcon name="ios-link" style={styles.facebookShare} />
							<Text style={styles.labelShare}>Copier le lien</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.shareFacebookContainer}
							onPress={() => {
								this.share();
							}}
						>
							<IonIcon name="md-share" style={styles.facebookShare} />
							<Text style={styles.labelShare}>Partager</Text>
						</TouchableOpacity>
					</View>
					{/* <View style={styles.end} /> */}
				</ScrollView>
				{/* REGISTER  -  REGISTER  -  REGISTER  -  REGISTER */}
				{this.state.history === false ? (
					<View style={styles.registerContainer}>
						{this.state.register === true ? (
							<TouchableOpacity
								style={styles.registerButtonOff}
								onPress={() => {
									this.register();
								}}
							>
								<Text style={styles.textButton}>SE DÉSINSCRIRE</Text>
								<IonIcon name="ios-close" style={styles.iconClose} />
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								style={styles.registerButtonOn}
								onPress={() => {
									// Cas des sondages internet
									if (this.state.offer.typeOffer === "Online") {
										return AlertIOS.prompt(
											"Sondage " + this.state.companyName,
											"Participer immédiatement ?",
											[
												{
													text: "Oui",
													onPress: () => {
														// this.getToHistory();
														this.props.navigation.navigate("TypeForm", {
															id: this.state.offer._id,
															user_id: this.state.user_id,
															companyName: this.state.companyName,
															pageName: this.props.navigation.state.params.pageName.toString(),
															navigation: this.props.navigation,
															typeForm: this.state.offer.typeForm,
															routeName: this.props.navigation.state.params
																.routeName
														});
													}
												},
												{
													text: "Non",
													onPress: () => {
														console.log("Cancel Pressed");
													}
												}
											],
											{ cancelable: false }
										);
									} else {
										// Cas des tests produits
										this.register();
									}
								}}
							>
								{this.state.offer.typeOffer === "Online" ? (
									<Text style={styles.textButton}>PARTICIPER</Text>
								) : (
									<Text style={styles.textButton}>S’INSCRIRE</Text>
								)}
								<IonIcon
									name="ios-arrow-dropright"
									style={styles.iconRegister}
								/>
							</TouchableOpacity>
						)}
					</View>
				) : (
					<View style={styles.registerContainer}>
						<View style={styles.participationContainer}>
							<IonIcon
								name="ios-checkbox-outline"
								style={styles.iconParticipation}
							/>
							<Text style={styles.textIfParticipate}>
								Participation enregistrée.
							</Text>
						</View>
					</View>
				)}
			</View>
		);
	}
	componentDidMount() {
		// Récupérer l'id de l'utilisateur
		AsyncStorage.getItem("userInformation").then(value => {
			const userInformation = JSON.parse(value);
			this.setState(
				{
					user_id: userInformation._id
				},
				() => {
					// Charger l'annonce et vérifier l'inscription de l'user
					axios
						.get(
							"http://192.168.86.249:3000/offer/" +
								this.props.navigation.state.params.id
						)
						.then(response => {
							this.setState(
								{
									offer: response.data
								},
								() => {
									this.state.offer.listTesters.indexOf(this.state.user_id) ===
									-1
										? this.setState({
												register: false
										  })
										: this.setState({
												register: true
										  });
									if (this.state.offer.adress.length === 0) {
										this.setState({
											companyName: this.state.offer.company.companyAccount
												.companyName,
											logoCompany: this.state.offer.company.companyAccount
												.companyLogo
										});
									} else {
										this.setState({
											companyName: this.state.offer.company.companyAccount
												.companyName,
											logoCompany: this.state.offer.company.companyAccount
												.companyLogo,
											adresse: this.state.offer.adress[0].streetName,
											postalCode: this.state.offer.adress[0].zipcode,
											city: this.state.offer.adress[0].city,
											country: this.state.offer.adress[0].country,
											latitude: this.state.offer.adress[0].latitude,
											longitude: this.state.offer.adress[0].longitude
										});
									}
								}
							);
						});
					// Vérifier les favoris
					axios
						.get(
							"http://192.168.86.249:3000/checkfavorites/" + this.state.user_id
						)
						.then(response => {
							this.setState(
								{
									checkfavorites: response.data
								},
								() => {
									this.state.checkfavorites.indexOf(
										this.props.navigation.state.params.id
									) === -1
										? this.setState({
												favorites: false
										  })
										: this.setState({
												favorites: true
										  });
								}
							);
						});
					// Vérifier l'historique
					axios
						.get(
							"http://192.168.86.249:3000/checkhistory/" + this.state.user_id
						)
						.then(response => {
							this.setState(
								{
									checkhistory: response.data
								},
								() => {
									this.state.checkhistory.indexOf(
										this.props.navigation.state.params.id
									) === -1
										? this.setState({
												history: false
										  })
										: this.setState({
												history: true
										  });
								}
							);
						});
				}
			);
		});
	}
	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
	}
}

const styles = StyleSheet.create({
	scrollviewContainer: {
		height: 635
	},
	ImageContainer: {
		width: "100%",
		height: 250
	},
	Image: {
		flex: 1
	},
	Logo: {
		flex: 1,
		borderRadius: 23
	},
	BoutonContainer: {
		backgroundColor: "#F5F5F5",
		paddingTop: 33,
		flexDirection: "row",
		height: 90,
		alignItems: "center",
		justifyContent: "space-between"
	},
	iconCloseOn: {
		color: "#B2025A",
		fontSize: 40,
		margin: 5,
		marginLeft: 20
	},
	iconFavorites: {
		color: "#B2025A",
		fontSize: 40,
		margin: 5,
		marginRight: 20
	},
	companyName: {
		fontSize: 22,
		marginLeft: 15,
		marginTop: 10,
		width: "72%"
	},
	titleOffer: {
		marginLeft: 15,
		marginTop: 5,
		fontSize: 15,
		color: "#567294",
		width: "90%"
	},
	title: {
		flexDirection: "row"
	},
	titlePrice: {
		marginTop: 10,
		fontSize: 22,
		fontWeight: "bold",
		color: "#B2025A",
		width: "20%",
		textAlign: "right"
	},
	LogoSociété: {
		height: 45,
		width: 45,
		marginLeft: 25
	},
	NomSociétéContainer: {
		paddingLeft: 10,
		width: "80%",
		justifyContent: "center"
	},
	SociétéContainer: {
		flexDirection: "row"
	},
	subTitle: {
		fontSize: 17,
		marginLeft: 15,
		color: "#B2025A",
		marginTop: 15,
		marginBottom: 5
	},
	paragraphe: {
		marginLeft: 15,
		marginRight: 15,
		textAlign: "justify"
	},
	separationLine: {
		width: "100%",
		height: 1,
		borderTopWidth: 0.4,
		borderColor: "lightgray",
		marginTop: 20
	},
	ArrayContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-start",
		marginLeft: "auto",
		marginRight: "auto",
		marginLeft: 15
	},
	ArrayContainerN1: {
		flexDirection: "row",
		marginTop: 5,
		width: 180,
		height: 30
	},
	titleN1: {
		fontWeight: "bold",
		fontSize: 13,
		paddingBottom: 5
	},
	titleN2: {
		fontSize: 13
	},
	registerContainer: {
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: 15,
		height: 200,
		width: "100%",
		backgroundColor: "#EFEFF4"
	},
	registerButtonOn: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: 180,
		height: 40,
		borderRadius: 50,
		backgroundColor: "#B2025A",
		shadowOffset: { width: 1, height: 1 },
		shadowColor: "lightgray",
		shadowOpacity: 0.2
	},
	registerButtonOff: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: 180,
		height: 40,
		borderRadius: 50,
		backgroundColor: "#567294",
		shadowOffset: { width: 1, height: 1 },
		shadowColor: "lightgray",
		shadowOpacity: 0.2
	},
	textButton: {
		fontSize: 15,
		fontWeight: "bold",
		color: "white"
	},
	localisationON: {
		height: 130
	},
	MapView: {
		flex: 1,
		width: "100%",
		position: "relative",
		opacity: 1
	},
	mapCache: {
		flex: 1,
		height: 90,
		width: "100%",
		padding: 15,
		position: "absolute"
	},
	textMap: {
		fontSize: 17,
		color: "#111111"
	},
	mapButton: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 3,
		borderColor: "#B2025A",
		marginLeft: 15,
		marginTop: 40,
		borderWidth: 1.2,
		height: 30,
		width: 130,
		position: "absolute"
	},
	textMapButton: {
		position: "absolute",
		color: "#B2025A",
		marginTop: 40
	},
	shareContainer: {
		flexDirection: "row",
		width: "90%",
		height: 45,
		marginLeft: 9
	},
	shareFacebookContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRightWidth: 0.5,
		borderColor: "#567294",
		marginTop: 3,
		width: "37%"
	},
	facebookShare: {
		marginTop: 3,
		fontSize: 30,
		color: "#567294"
	},
	labelShare: {
		fontSize: 12,
		marginLeft: 7,
		color: "#567294"
	},
	iconRegister: {
		color: "white",
		fontSize: 25,
		marginLeft: 5,
		marginTop: 3
	},
	iconClose: {
		color: "white",
		fontSize: 35,
		marginLeft: 5,
		marginTop: 3
	},
	OfferSecondTitle: {
		fontSize: 14,
		height: 19,
		marginLeft: 5,
		marginTop: 8,
		color: "#567294"
	},
	icones: {
		fontSize: 25,
		marginRight: 2.5,
		marginTop: 3,
		color: "#567294"
	},
	linearGradient: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 100,
		width: "70%"
	},
	mapViewContainer: {
		width: "100%",
		height: 85
	},
	textIfParticipate: {
		marginTop: 10,
		fontSize: 15,
		fontWeight: "bold",
		color: "green"
	},
	participationContainer: {
		flexDirection: "row"
	},
	iconParticipation: {
		fontSize: 30,
		marginTop: 4,
		marginRight: 5,
		color: "green"
	},
	WebView: {
		height: 200,
		width: "100%"
	}
	// end: {
	// 	height: 50
	// }
});

export default Offer;

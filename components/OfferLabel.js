// OFFER LABEL

// Importer React
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ImageBackground,
	Dimensions
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const widthDimensions = Dimensions.get("window").width;

// Créer le composant
class OfferLabel extends React.Component {
	state = {
		pageName: "MesOffres"
	};
	render() {
		// console.log(this.props);
		return (
			<View style={styles.PrincipalContainer}>
				<TouchableOpacity
					onPress={() => {
						// alert(this.props.id);
						this.props.navigation.navigate("AnnoncesDetails", {
							key: this.props.id,
							id: this.props.id,
							pageName: this.state.pageName,
							navigation: this.props.navigation,
							routeName: this.props.navigation.state.routeName
						});
					}}
				>
					<View style={styles.FirstContainer}>
						<View style={styles.LogoOfferContainer}>
							{this.props.typeOffer === "Physique" ? (
								<MaterialIcons name="place" style={styles.iconOffer} />
							) : (
								<IonIcon name="ios-phone-portrait" style={styles.iconOffer} />
							)}
						</View>
						<View>
							<Text style={styles.NameCompany}>
								{this.props.typeOffer === "Physique"
									? "A tester sur place"
									: "Sondage internet"}
							</Text>
							<Text style={styles.OfferSubTitle}>
								{this.props.typeOffer === "Physique"
									? this.props.address
									: "Participez immédiatement au sondage !"}
							</Text>
						</View>
						<Text style={styles.Price}>{this.props.price} €</Text>
					</View>
					<View style={styles.SecondContainer}>
						<View style={styles.SecondContainerLeft}>
							{this.props.picture === "" ? (
								this.props.logoCompany === "" ||
								this.props.logoCompany === "d" ? (
									<ImageBackground
										resizeMode="contain"
										style={styles.Image2}
										source={require("../assets/images/placeholder-image.png")}
									/>
								) : (
									<ImageBackground
										resizeMode="contain"
										style={styles.Image2}
										source={{
											uri: this.props.logoCompany
										}}
									/>
								)
							) : (
								<ImageBackground
									resizeMode="contain"
									style={styles.Image2}
									source={{
										uri: this.props.picture
									}}
								/>
							)}
						</View>
						<View
							style={{
								display: "flex",
								alignItems: "flex-end",
								flex: 3
							}}
						>
							<Text style={styles.OfferFirstTitle}>
								{this.props.companyName}
							</Text>
							<Text style={styles.OfferTitle} numberOfLines={1}>
								{this.props.title}
							</Text>
							{this.props.availabilities <= 5 ? (
								<View style={styles.OfferSecondTitleContainer}>
									<Text
										style={{
											fontSize: 13,
											height: 15,
											marginRight: 5,
											marginTop: 8,
											color: "#B2025A"
										}}
									>
										{this.props.availabilities} place(s) restante(s)
									</Text>
									<IonIcon name="ios-people" style={styles.icones} />
								</View>
							) : (
								<View style={styles.OfferSecondTitleContainer}>
									<Text style={styles.OfferSecondTitle}>
										{this.props.availabilities} place(s) restante(s)
									</Text>
									<IonIcon name="ios-people" style={styles.icones} />
								</View>
							)}
							<View style={styles.OfferSecondTitleContainer}>
								<Text style={styles.OfferSecondTitle}>
									Durée du test : {this.props.duration}
								</Text>
								<IonIcon name="ios-timer" style={styles.icones} />
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

// Exporter le composant
export default OfferLabel;

// Styles
var styles = StyleSheet.create({
	PrincipalContainer: {
		flexDirection: "column",
		backgroundColor: "white",
		width: widthDimensions,
		// marginLeft: "3%",
		marginTop: 5,
		borderWidth: 0.5,
		borderColor: "#CCCCCC"
		// borderRadius: 10,
		// shadowOffset: { width: 5, height: 5 },
		// shadowColor: "gray",
		// shadowOpacity: 0.3
	},
	FirstContainer: {
		display: "flex",
		justifyContent: "space-between",
		// marginLeft: 15,
		// marginRight: 15,
		flexDirection: "row",
		alignItems: "center",
		height: 53,
		borderBottomColor: "gray",
		borderBottomWidth: 0.5,
		borderBottomColor: "#CCCCCC",
		backgroundColor: "white"
	},
	SecondContainer: {
		display: "flex",
		flexDirection: "row",
		height: 120,
		borderBottomWidth: 0.5,
		borderColor: "#d6d7da",
		marginLeft: 15,
		marginRight: 15
		// borderBottomLeftRadius: 10,
		// borderBottomRightRadius: 10
	},
	SecondContainerLeft: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center",
		width: 190,
		padding: 5
	},
	LogoOfferContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 15
	},
	iconOffer: {
		fontSize: 40,
		color: "#567294"
	},
	Image2: {
		width: 150,
		height: 110
	},
	NameCompany: {
		marginLeft: 3,
		fontSize: 16,
		fontWeight: "bold",
		color: "#041A39",
		width: 210
	},
	OfferTitle: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#567294",
		marginBottom: 3,
		width: 180,
		textAlign: "right"
	},
	OfferSubTitle: {
		marginTop: 3,
		marginLeft: 3,
		fontSize: 11,
		fontStyle: "italic",
		color: "#567294"
	},
	Price: {
		marginRight: 15,
		fontWeight: "bold",
		textAlign: "right",
		fontSize: 25,
		color: "#B2025A"
	},
	OfferFirstTitle: {
		fontSize: 18,
		marginTop: 10,
		marginBottom: 1,
		fontWeight: "bold",
		color: "#041A39"
	},
	OfferSecondTitleContainer: {
		flexDirection: "row"
	},
	OfferSecondTitle: {
		fontSize: 13,
		height: 15,
		marginRight: 5,
		marginTop: 8,
		color: "#567294"
	},
	icones: {
		fontSize: 25,
		marginLeft: 5,
		marginTop: 3,
		color: "#567294"
	}
});

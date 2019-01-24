import React from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	AsyncStorage,
	StyleSheet,
	ImageBackground,
	TextInput,
	Dimensions
} from "react-native";
import { SearchBar, Slider } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import TopOfferCard from "../../components/TopOfferCard";
import OfferLabel from "../../components/OfferLabel";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Modal from "react-native-modal";
import IconEntypo from "react-native-vector-icons/Entypo";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BackGroundImage from "../../components/BackGroundImage";
import MultiSelect from "react-native-multiple-select";
import Certification from "../Reglages/Certification";
const widthDimensions = Dimensions.get("window").width;

export default class Annonces extends React.Component {
	state = {
		pageName: "Annonces",
		userId: this.props.navigation.state.params,
		offers: [],
		title: "",
		priceMin: "",
		priceMax: "",
		sort: "Trier par...",
		online: false,
		physical: false,
		filterItems: [
			{ label: "Prix croissants", value: "Prix croissants" },
			{ label: "Prix décroissants", value: "Prix décroissants" }
			// { label: "Les plus récentes", value: "Les plus récentes" },
			// { label: "Tests les plus courts", value: "Tests les plus courts" },
			// { label: "Tests les plus longs", value: "Tests les plus longs" }
		],
		dataTopFilter: [],
		activeSlide: 0,
		isModalVisible: false,
		text: "",
		duration: 0,
		categories: [],
		sport: false,
		food: false,
		jeuxvideo: false,
		cosmetique: false,
		highTech: false,
		automobile: false,
		mode: false,
		musique: false,
		selectedCategories: [],
		selectedCategoryJoin: ""
	};

	toggleModal = () =>
		this.setState({ isModalVisible: !this.state.isModalVisible });

	addCategory = value => {
		let exist = false;
		for (i = 0; i < this.state.selectedCategories.length; i++) {
			if (this.state.selectedCategories[i] === value) {
				this.state.selectedCategories.splice(i, 1);
				exist = true;
				break;
			}
		}
		if (exist === false) {
			this.state.selectedCategories.push(value);
		}
		let categoryJoin = this.state.selectedCategories.join(" ");
		this.setState({ selectedCategoryJoin: categoryJoin }, () => {
			this.getOffers();
		});
		// console.log(this.state.selectedCategoryJoin);
	};
	getOffers = () => {
		AsyncStorage.getItem("userInformation", (err, result) => {
			const userInformation = JSON.parse(result);
			const today = new Date();
			const birthDate = new Date(userInformation.account.birthDate);
			const age = today.getFullYear() - birthDate.getFullYear();
			axios
				.get(
					// pour pouvoir se connecter avec son telephone portable il faut mettre l'adresse ip a la place de localhost:3000:
					//"http://192.168.86.60:3000/home/with-count?age=" +
					"http://localhost:3000/home/with-count?age=" +
						age +
						"&genderTarget=" +
						userInformation.account.sex,
					{
						params: {
							title: this.state.title,
							priceMin: this.state.priceMin,
							priceMax: this.state.priceMax,
							sort: this.state.sort,
							online: this.state.online,
							physical: this.state.physical,
							sport: this.state.sport,
							food: this.state.food,
							jeuxvideo: this.state.jeuxvideo,
							cosmetique: this.state.cosmetique,
							highTech: this.state.highTech,
							automobile: this.state.automobile,
							mode: this.state.mode,
							musique: this.state.musique,
							selectedCategoryJoin: this.state.selectedCategoryJoin
						}
					}
				)
				.then(response => {
					this.setState({
						offers: response.data.offers
						// dataTopFilter: response.data.offers
					});
					const dataTopFilter = [...this.state.dataTopFilter];
					dataTopFilter.sort(function(a, b) {
						return b.price - a.price;
					});
					if (dataTopFilter.length > 3) {
						dataTopFilter.splice(3, dataTopFilter.length - 3);
						this.setState({ dataTopFilter: dataTopFilter });
					}
				});
		});
	};

	render() {
		// console.log(this.state.offers[1]);
		// if (this.state.offers.length !== 0) {
		// 	console.log(this.state.offers[0].adress[0].city);
		// }
		// const dataTop = [];
		// if (this.state.dataTopFilter) {
		// 	for (let i = 0; i < this.state.dataTopFilter.length; i++) {
		// 		dataTop.push(
		// 			<TopOfferCard
		// 				key={this.state.dataTopFilter[i]._id}
		// 				id={this.state.dataTopFilter[i]._id}
		// 				title={this.state.dataTopFilter[i].offerName}
		// 				picture={this.state.dataTopFilter[i].picture}
		// 				availabilities={this.state.dataTopFilter[i].availabilities}
		// 				price={this.state.dataTopFilter[i].price}
		// 				typeOffer={this.state.dataTopFilter[i].typeOffer}
		// 				duration={this.state.dataTopFilter[i].duration}
		// 				picture={this.state.dataTopFilter[i].picture}
		// 				companyName={
		// 					this.state.dataTopFilter[i].company.companyAccount.companyName
		// 				}
		// 				logoCompany={
		// 					this.state.dataTopFilter[i].company.companyAccount.companyLogo[0]
		// 				}
		// 				navigation={this.props.navigation}
		// 			/>
		// 		);
		// 	}
		// }

		const listOffers = [];
		if (this.state.offers) {
			for (let i = 0; i < this.state.offers.length; i++) {
				if (this.state.offers[i].adress[0]) {
					listOffers.push(
						<OfferLabel
							key={this.state.offers[i]._id}
							id={this.state.offers[i]._id}
							title={this.state.offers[i].offerName}
							picture={this.state.offers[i].picture}
							availabilities={this.state.offers[i].availabilities}
							price={this.state.offers[i].price}
							typeOffer={this.state.offers[i].typeOffer}
							duration={this.state.offers[i].duration}
							picture={this.state.offers[i].picture}
							companyName={
								this.state.offers[i].company.companyAccount.companyName
							}
							logoCompany={
								this.state.offers[i].company.companyAccount.companyLogo[0]
							}
							navigation={this.props.navigation}
							address={
								this.state.offers[i].adress[0].streetNumber +
								" " +
								this.state.offers[i].adress[0].streetName +
								", " +
								this.state.offers[i].adress[0].city
							}
						/>
					);
				} else {
					listOffers.push(
						<OfferLabel
							key={this.state.offers[i]._id}
							id={this.state.offers[i]._id}
							title={this.state.offers[i].offerName}
							picture={this.state.offers[i].picture}
							availabilities={this.state.offers[i].availabilities}
							price={this.state.offers[i].price}
							typeOffer={this.state.offers[i].typeOffer}
							duration={this.state.offers[i].duration}
							picture={this.state.offers[i].picture}
							companyName={
								this.state.offers[i].company.companyAccount.companyName
							}
							logoCompany={
								this.state.offers[i].company.companyAccount.companyLogo[0]
							}
							navigation={this.props.navigation}
						/>
					);
				}
			}
		}

		const { selectedCategories } = this.state;
		let searchFilters = false;
		if (
			this.state.title !== "" ||
			this.state.physical !== false ||
			this.state.online !== false ||
			this.state.text !== "" ||
			this.state.duration !== 0 ||
			this.state.selectedCategories.length !== 0 ||
			// this.state.searchParams.sort !== "Prix croissants"
			this.state.sort !== "Trier par..."
		) {
			searchFilters = true;
		}
		const pinkColor = "#B2025A";
		const blueColor = "#536D91";
		return (
			<View style={{ backgroundColor: "#F5F5F5" }}>
				{/* <BackGroundImage style={{ flex: 1, width: "100%" }}> */}
				<ScrollView>
					<Text
						style={{
							color: "#B2025A",
							fontSize: 18,
							// fontWeight: "bold",
							// fontStyle: "italic",
							marginBottom: 15,
							marginTop: 10,
							marginLeft: 20
							// textDecorationLine: "underline"
						}}
					>
						A ne pas manquer
					</Text>
					<View style={{ display: "flex", alignItems: "center" }}>
						<Carousel
							ref={c => {
								this._carousel = c;
							}}
							loop={true}
							loopClonesPerSide={2}
							autoplay={true}
							autoplayDelay={500}
							autoplayInterval={3000}
							data={this.state.dataTopFilter}
							layout="stack"
							renderItem={({ item, index }) => {
								return (
									<View style={styles.container}>
										<TouchableOpacity
											onPress={() => {
												this.props.navigation.navigate("AnnoncesDetails", {
													id: item._id,
													pageName: this.state.pageName,
													navigation: item.navigation
												});
											}}
											// style={{
											// 	backgroundColor: "white",
											// 	borderWidth: 1,
											// 	borderColor: "black",
											// 	borderRadius: 10
											// }}
										>
											<View
												style={{
													backgroundColor: "white",
													borderWidth: 0.5,
													borderColor: "gray",
													borderRadius: 10
												}}
											>
												<ImageBackground
													source={{ uri: item.picture }}
													imageStyle={{ borderRadius: 10 }}
													style={{
														height: 200,
														width: 300,
														borderRadius: 10
													}}
													resizeMode="stretch"
												/>
											</View>
										</TouchableOpacity>
									</View>
								);
							}}
							slideStyle={{}}
							contentContainerCustomStyle={{}}
							sliderWidth={widthDimensions}
							itemWidth={350}
							onSnapToItem={index => this.setState({ activeSlide: index })}
						/>
						<Pagination
							dotsLength={this.state.dataTopFilter.length}
							dotColor={"#B2025A"}
							activeDotIndex={this.state.activeSlide}
							inactiveDotColor={"#567294"}
							inactiveDotOpacity={0.4}
							inactiveDotScale={0.6}
							style={{ marginBottom: 0 }}
						/>
					</View>
					<View>
						<View
							style={{
								marginTop: 10,
								marginRight: 10,
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center"
							}}
						>
							<Text
								style={{
									color: "#B2025A",
									fontSize: 18,
									// fontWeight: "bold",
									// fontStyle: "italic",
									marginBottom: 5,
									marginLeft: 20
									// textDecorationLine: "underline"
								}}
							>
								Toutes les annonces
							</Text>
							{searchFilters === false ? (
								<TouchableOpacity onPress={this.toggleModal}>
									<IconEntypo
										name="magnifying-glass"
										style={{ fontSize: 20, color: "#536D91", marginRight: 20 }}
									/>
								</TouchableOpacity>
							) : (
								<TouchableOpacity onPress={this.toggleModal}>
									<IconEntypo
										name="magnifying-glass"
										style={{ fontSize: 20, color: "#B2025A", marginRight: 20 }}
									/>
								</TouchableOpacity>
							)}
						</View>
						<Modal isVisible={this.state.isModalVisible}>
							<ScrollView>
								<View
									style={{
										flex: 1,
										backgroundColor: "#F5F5F5",
										display: "flex",
										marginTop: 20,
										borderRadius: 15,
										opacity: 0.9
									}}
								>
									<View
										style={{
											display: "flex",
											flexDirection: "row",
											marginTop: 20,
											justifyContent: "flex-end",
											marginRight: 10,
											marginBottom: 20
										}}
									>
										<TouchableOpacity
											onPress={this.toggleModal}
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center"
											}}
										>
											<IconEntypo
												name="circle-with-cross"
												style={{
													fontSize: 30,
													color: "#B2025A"
												}}
											/>
										</TouchableOpacity>
									</View>

									<SearchBar
										name="title"
										placeholder="Chercher une annonce"
										placeholderTextColor="#8396B2"
										clearIcon={{
											style: {
												color: "#8396B2",
												height: 40,
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												top: 12
											}
										}}
										containerStyle={{
											marginLeft: 15,
											marginRight: 15,
											backgroundColor: "rgba(52, 52, 52, 0)",
											borderTopWidth: 0,
											marginBottom: 15,
											borderBottomWidth: 0
										}}
										icon={{
											style: {
												color: "#8396B2",
												height: 40,
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												top: 12
											}
										}}
										inputStyle={{
											margin: 0,
											paddingLeft: 34,
											height: 40,
											fontStyle: "italic",
											fontSize: 12,
											color: "#8396B2",
											backgroundColor: "white",
											borderColor: "#536D91",
											borderWidth: 1,
											borderRadius: 3
										}}
										onChangeText={text => {
											this.setState(
												{
													title: text
												},
												() => {
													this.getOffers();
												}
											);
										}}
										value={this.state.title}
									/>

									<RNPickerSelect
										placeholder={{
											label: "Trier par...",
											value: "Trier par..."
										}}
										items={this.state.filterItems}
										onValueChange={value => {
											this.setState(
												{
													sort: value
												},
												() => {
													this.getOffers();
												}
											);
											// console.log(this.state.searchParams);
										}}
										style={{
											inputIOS: {
												height: 40,
												fontSize: 12,
												paddingTop: 13,
												paddingHorizontal: 10,
												paddingBottom: 12,
												borderWidth: 1,
												borderColor: "#536D91",
												borderRadius: 5,
												backgroundColor: "white",
												color: "#536D91",
												marginLeft: 15,
												marginRight: 15,
												fontStyle: "italic"
											},
											icon: {
												marginRight: 10,
												bottom: 90,
												borderTopColor: "#536D91"
											}
										}}
										placeholderTextColor="#8396B2"
										value={this.state.sort}
									/>
									<View
										style={{
											marginTop: 25,
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center"
										}}
									>
										<FontAwesome
											name="filter"
											style={{ fontSize: 25, color: "#536D91" }}
										/>
										<Text
											style={{ color: "#536D91", fontSize: 25, marginLeft: 10 }}
										>
											Filtres :
										</Text>
									</View>
									<View
										style={{
											display: "flex",
											flexDirection: "row",
											marginTop: 20,
											marginBottom: 20
										}}
									>
										{this.state.physical === false ? (
											<TouchableOpacity
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													marginLeft: 10,
													marginRight: 10,
													flex: 1,
													borderWidth: 1,
													borderRadius: 25,
													borderColor: "#B2025A",
													height: 40
												}}
												onPress={() => {
													this.setState(
														{
															physical: !this.state.physical
														},
														() => {
															this.getOffers();
														}
													);
												}}
											>
												<Text style={{ color: "#B2025A", fontSize: 20 }}>
													Test physique
												</Text>
											</TouchableOpacity>
										) : (
											<TouchableOpacity
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													marginLeft: 10,
													marginRight: 10,
													flex: 1,
													borderRadius: 25,
													backgroundColor: "#B2025A",
													height: 40
												}}
												onPress={() => {
													this.setState(
														{
															physical: !this.state.physical
														},
														() => {
															this.getOffers();
														}
													);
												}}
											>
												<Text style={{ color: "white", fontSize: 20 }}>
													Test physique
												</Text>
											</TouchableOpacity>
										)}
										{this.state.online === false ? (
											<TouchableOpacity
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													marginLeft: 10,
													marginRight: 10,
													flex: 1,
													borderWidth: 1,
													borderRadius: 25,
													borderColor: "#B2025A",
													height: 40
												}}
												onPress={() => {
													this.setState(
														{
															online: !this.state.online
														},
														() => {
															this.getOffers();
														}
													);
												}}
											>
												<Text style={{ color: "#B2025A", fontSize: 20 }}>
													Test online
												</Text>
											</TouchableOpacity>
										) : (
											<TouchableOpacity
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													marginLeft: 10,
													marginRight: 10,
													flex: 1,
													borderRadius: 25,
													backgroundColor: "#B2025A",
													height: 40
												}}
												onPress={() => {
													this.setState(
														{
															online: !this.state.online
														},
														() => {
															this.getOffers();
														}
													);
												}}
											>
												<Text style={{ color: "white", fontSize: 20 }}>
													Test online
												</Text>
											</TouchableOpacity>
										)}
									</View>
									<View
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											margin: 10
										}}
									>
										<MaterialIcons
											name="place"
											style={{ fontSize: 30, color: "#B2025A", padding: 5 }}
										/>
										<Text style={{ marginRight: 5, flex: 1, color: "#536D91" }}>
											Par ville :
										</Text>
										<TextInput
											style={{
												height: 20,
												flex: 3,
												borderColor: "#536D91",
												borderWidth: 1,
												marginRight: 5
											}}
											onChangeText={text => this.setState({ text })}
											value={this.state.text}
										/>
									</View>
									<View
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											margin: 10
										}}
									>
										<IonIcon
											name="md-time"
											style={{ fontSize: 30, color: "#B2025A", padding: 5 }}
										/>
										<Text style={{ marginRight: 5, flex: 1, color: "#536D91" }}>
											Par durée max :
										</Text>
										<View
											style={{
												flex: 1,
												alignItems: "stretch",
												justifyContent: "center",
												marginRight: 10
											}}
										>
											<Slider
												minimumValue={0}
												// minimumTrackTintColor="#B2025A"
												thumbTintColor="#B2025A"
												// animateTransitions={true}
												// animationType="spring"
												maximumValue={120}
												step={5}
												value={this.state.duration}
												onValueChange={duration => this.setState({ duration })}
											/>
										</View>
										<Text style={{ color: "#B2025A" }}>
											{this.state.duration} mins
										</Text>
									</View>
									<View
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											margin: 10
										}}
									>
										<Text
											style={{ color: "#536D91", fontSize: 25, marginLeft: 10 }}
										>
											Catégories :
										</Text>
									</View>
									<View style={{ display: "flex", flexDirection: "column" }}>
										<View
											style={{
												display: "flex",
												flexDirection: "row",
												marginLeft: 30,
												marginRight: 30
											}}
										>
											<TouchableOpacity
												style={{
													flex: 1,
													width: 100,
													display: "flex",
													flexDirection: "column",
													padding: 7,
													justifyContent: "center",
													alignItems: "center"
												}}
												onPress={() => {
													this.setState({ sport: !this.state.sport });
													this.addCategory("Sport");
												}}
											>
												{this.state.sport !== true ? (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																borderWidth: 1,
																borderColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<MaterialIcons
																name="directions-run"
																style={{
																	fontSize: 30,
																	color: "#B2025A"
																}}
															/>
														</View>
														<Text style={{ color: "#536D91" }}>Sport</Text>
													</View>
												) : (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																backgroundColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<MaterialIcons
																name="directions-run"
																style={{
																	fontSize: 30,
																	color: "white"
																}}
															/>
														</View>
														<Text style={{ color: "#B2025A" }}>Sport</Text>
													</View>
												)}
											</TouchableOpacity>
											<TouchableOpacity
												style={{
													flex: 1,
													width: 100,
													display: "flex",
													flexDirection: "column",
													padding: 7,
													justifyContent: "center",
													alignItems: "center"
												}}
												onPress={() => {
													this.setState({ food: !this.state.food });
													this.addCategory("Food");
												}}
											>
												{this.state.food !== true ? (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																borderWidth: 1,
																borderColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<MaterialCommunityIcons
																name="food"
																style={{
																	fontSize: 30,
																	color: "#B2025A"
																}}
															/>
														</View>
														<Text style={{ color: "#536D91" }}>Food</Text>
													</View>
												) : (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																backgroundColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<MaterialCommunityIcons
																name="food"
																style={{
																	fontSize: 30,
																	color: "white"
																}}
															/>
														</View>
														<Text style={{ color: "#B2025A" }}>Food</Text>
													</View>
												)}
											</TouchableOpacity>
											<TouchableOpacity
												style={{
													flex: 1,
													width: 100,
													display: "flex",
													flexDirection: "column",
													padding: 7,
													justifyContent: "center",
													alignItems: "center"
												}}
												onPress={() => {
													this.setState({ jeuxvideo: !this.state.jeuxvideo });
													this.addCategory("Jeux-vidéos");
												}}
											>
												{this.state.jeuxvideo !== true ? (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																borderWidth: 1,
																borderColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<IonIcon
																name="logo-game-controller-b"
																style={{
																	fontSize: 30,
																	color: "#B2025A"
																}}
															/>
														</View>
														<Text style={{ color: "#536D91" }}>
															Jeux-vidéos
														</Text>
													</View>
												) : (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																backgroundColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<IonIcon
																name="logo-game-controller-b"
																style={{
																	fontSize: 30,
																	color: "white"
																}}
															/>
														</View>
														<Text style={{ color: "#B2025A" }}>
															Jeux-vidéos
														</Text>
													</View>
												)}
											</TouchableOpacity>
										</View>
										<View
											style={{
												display: "flex",
												flexDirection: "row",
												marginLeft: 30,
												marginRight: 30
											}}
										>
											<TouchableOpacity
												style={{
													flex: 1,
													width: 100,
													display: "flex",
													flexDirection: "column",
													padding: 7,
													justifyContent: "center",
													alignItems: "center"
												}}
												onPress={() => {
													this.setState({ cosmetique: !this.state.cosmetique });
													this.addCategory("Cosmétique");
												}}
											>
												{this.state.cosmetique !== true ? (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																borderWidth: 1,
																borderColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<IconEntypo
																name="brush"
																style={{
																	fontSize: 30,
																	color: "#B2025A"
																}}
															/>
														</View>
														<Text style={{ color: "#536D91" }}>Cosmétique</Text>
													</View>
												) : (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																backgroundColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<IconEntypo
																name="brush"
																style={{
																	fontSize: 30,
																	color: "white"
																}}
															/>
														</View>
														<Text style={{ color: "#B2025A" }}>Cosmétique</Text>
													</View>
												)}
											</TouchableOpacity>
											<TouchableOpacity
												style={{
													flex: 1,
													width: 100,
													display: "flex",
													flexDirection: "column",
													padding: 7,
													justifyContent: "center",
													alignItems: "center"
												}}
												onPress={() => {
													this.setState({ highTech: !this.state.highTech });
													this.addCategory("highTech");
												}}
											>
												{this.state.highTech !== true ? (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																borderWidth: 1,
																borderColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<FontAwesome
																name="tv"
																style={{
																	fontSize: 30,
																	color: "#B2025A"
																}}
															/>
														</View>
														<Text style={{ color: "#536D91" }}>High-Tech</Text>
													</View>
												) : (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																backgroundColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<FontAwesome
																name="tv"
																style={{
																	fontSize: 30,
																	color: "white"
																}}
															/>
														</View>
														<Text style={{ color: "#B2025A" }}>High-Tech</Text>
													</View>
												)}
											</TouchableOpacity>
											<TouchableOpacity
												style={{
													flex: 1,
													width: 100,
													display: "flex",
													flexDirection: "column",
													padding: 7,
													justifyContent: "center",
													alignItems: "center"
												}}
												onPress={() => {
													this.setState({ automobile: !this.state.automobile });
													this.addCategory("Automobile");
												}}
											>
												{this.state.automobile !== true ? (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																borderWidth: 1,
																borderColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<IonIcon
																name="ios-car"
																style={{
																	fontSize: 30,
																	color: "#B2025A"
																}}
															/>
														</View>
														<Text style={{ color: "#536D91" }}>Automobile</Text>
													</View>
												) : (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																backgroundColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<IonIcon
																name="ios-car"
																style={{
																	fontSize: 30,
																	color: "white"
																}}
															/>
														</View>
														<Text style={{ color: "#B2025A" }}>Automobile</Text>
													</View>
												)}
											</TouchableOpacity>
										</View>
										<View
											style={{
												display: "flex",
												flexDirection: "row",
												marginLeft: 55,
												marginRight: 55
											}}
										>
											<TouchableOpacity
												style={{
													flex: 1,
													width: 100,
													display: "flex",
													flexDirection: "column",
													padding: 7,
													justifyContent: "center",
													alignItems: "center"
												}}
												onPress={() => {
													this.setState({ mode: !this.state.mode });
													this.addCategory("Mode");
												}}
											>
												{this.state.mode !== true ? (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																borderWidth: 1,
																borderColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<IonIcon
																name="ios-bowtie"
																style={{
																	fontSize: 30,
																	color: "#B2025A"
																}}
															/>
														</View>
														<Text style={{ color: "#536D91" }}>Mode</Text>
													</View>
												) : (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																backgroundColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<IonIcon
																name="ios-bowtie"
																style={{
																	fontSize: 30,
																	color: "white"
																}}
															/>
														</View>
														<Text style={{ color: "#B2025A" }}>Mode</Text>
													</View>
												)}
											</TouchableOpacity>
											<TouchableOpacity
												style={{
													flex: 1,
													width: 100,
													display: "flex",
													flexDirection: "column",
													padding: 7,
													justifyContent: "center",
													alignItems: "center"
												}}
												onPress={() => {
													this.setState({ musique: !this.state.musique });
													this.addCategory("musique");
												}}
											>
												{this.state.musique !== true ? (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																borderWidth: 1,
																borderColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<MaterialCommunityIcons
																name="music"
																style={{
																	fontSize: 30,
																	color: "#B2025A"
																}}
															/>
														</View>
														<Text style={{ color: "#536D91" }}>Music</Text>
													</View>
												) : (
													<View
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: 100
														}}
													>
														<View
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																padding: 5,
																backgroundColor: "#B2025A",
																borderRadius: 7,
																height: 50,
																width: 50,
																marginBottom: 5
															}}
														>
															<MaterialCommunityIcons
																name="music"
																style={{
																	fontSize: 30,
																	color: "white"
																}}
															/>
														</View>
														<Text style={{ color: "#B2025A" }}>Music</Text>
													</View>
												)}
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</ScrollView>
						</Modal>
					</View>
					<View>{listOffers}</View>
				</ScrollView>
				{/* </BackGroundImage> */}
			</View>
		);
	}
	componentDidMount() {
		AsyncStorage.getItem("userInformation", (err, result) => {
			const userInformation = JSON.parse(result);
			const today = new Date();
			const birthDate = new Date(userInformation.account.birthDate);
			const age = today.getFullYear() - birthDate.getFullYear();
			axios
				.get(
					// pour pouvoir se connecter avec son telephone portable il faut mettre l'adresse ip a la place de localhost:3000:
					//"http://192.168.86.60:3000/home/with-count?age=" +
					"http://localhost:3000/home/with-count?age=" +
						age +
						"&genderTarget=" +
						userInformation.account.sex,
					{
						params: {
							title: this.state.title,
							priceMin: this.state.priceMin,
							priceMax: this.state.priceMax,
							sort: this.state.sort,
							online: this.state.online,
							physical: this.state.physical,
							sport: this.state.sport,
							food: this.state.food,
							jeuxvideo: this.state.jeuxvideo,
							cosmetique: this.state.cosmetique,
							highTech: this.state.highTech,
							automobile: this.state.automobile,
							mode: this.state.mode,
							musique: this.state.musique
						}
					}
				)
				.then(response => {
					this.setState({
						offers: response.data.offers,
						dataTopFilter: response.data.offers
					});
					const dataTopFilter = [...this.state.dataTopFilter];
					dataTopFilter.sort(function(a, b) {
						return b.price - a.price;
					});
					if (dataTopFilter.length > 5) {
						dataTopFilter.splice(5, dataTopFilter.length - 5);
						this.setState({ dataTopFilter: dataTopFilter });
					}
				});
		});
		axios.get("http://localhost:3000/get_category").then(response => {
			this.setState({
				categories: response.data
			});
		});
	}
}
const styles = StyleSheet.create({
	container: {
		// backgroundColor: "white",
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});

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
import BackGroundImage from "../../components/BackGroundImage";
import MultiSelect from "react-native-multiple-select";
const widthDimensions = Dimensions.get("window").width;

export default class Annonces extends React.Component {
	static navigationOptions = {
		title: "Annonces",
		headerStyle: {
			backgroundColor: "#041A39"
		},
		headerTintColor: "#ffffff",
		headerTitleStyle: {
			fontWeight: "bold"
		}
	};

	state = {
		pageName: "Annonces",
		userId: this.props.navigation.state.params,
		offers: [],
		searchParams: {
			title: "",
			priceMin: "",
			priceMax: "",
			sort: ""
		},
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
		selectedCategories: []
	};

	toggleModal = () =>
		this.setState({ isModalVisible: !this.state.isModalVisible });

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
						params: this.state.searchParams
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
					if (dataTopFilter.length > 3) {
						dataTopFilter.splice(3, dataTopFilter.length - 3);
						this.setState({ dataTopFilter: dataTopFilter });
					}
				});
		});
	};

	render() {
		const dataTop = [];
		if (this.state.dataTopFilter) {
			for (let i = 0; i < this.state.dataTopFilter.length; i++) {
				dataTop.push(
					<TopOfferCard
						key={this.state.dataTopFilter[i]._id}
						id={this.state.dataTopFilter[i]._id}
						title={this.state.dataTopFilter[i].offerName}
						picture={this.state.dataTopFilter[i].picture}
						availabilities={this.state.dataTopFilter[i].availabilities}
						price={this.state.dataTopFilter[i].price}
						typeOffer={this.state.dataTopFilter[i].typeOffer}
						duration={this.state.dataTopFilter[i].duration}
						picture={this.state.dataTopFilter[i].picture}
						companyName={
							this.state.dataTopFilter[i].company.companyAccount.companyName
						}
						logoCompany={
							this.state.dataTopFilter[i].company.companyAccount.companyLogo[0]
						}
						navigation={this.props.navigation}
					/>
				);
			}
		}

		const listOffers = [];
		if (this.state.offers) {
			for (let i = 0; i < this.state.offers.length; i++) {
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

		const { selectedCategories } = this.state;
		return (
			<View style={{ backgroundColor: "#EFEFF4" }}>
				<BackGroundImage style={{ flex: 1, width: "100%" }}>
					<ScrollView>
						<View
							style={{
								borderRadius: 30
							}}
						>
							<Text
								style={{
									color: "#B2025A",
									fontSize: 18,
									fontWeight: "bold",
									fontStyle: "italic",
									marginBottom: 15,
									marginTop: 15,
									marginLeft: 20,
									textDecorationLine: "underline"
								}}
							>
								A ne pas manquer
							</Text>
						</View>
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
												style={{
													backgroundColor: "white",
													borderWidth: 1,
													borderColor: "black",
													borderRadius: 10

													// shadowOffset: { width: 10, height: 10 },
													// shadowColor: "gray",
													// shadowOpacity: 0.5
												}}
											>
												<View style={{ padding: 10 }}>
													<ImageBackground
														source={{ uri: item.picture }}
														style={{
															height: 180,
															width: 240,
															backgroundColor: "white"
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
							<Text
								style={{
									color: "#B2025A",
									fontSize: 18,
									fontWeight: "bold",
									fontStyle: "italic",
									marginBottom: 5,
									marginLeft: 20,
									textDecorationLine: "underline"
								}}
							>
								Toutes les annonces
							</Text>
							<SearchBar
								name="searchParams.title"
								placeholder="Chercher une annonce"
								placeholderTextColor="#8396B2"
								clearIcon={{
									style: {
										color: "#8396B2",
										height: 40,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										top: 19
									}
								}}
								containerStyle={{
									marginLeft: 15,
									marginRight: 15,
									backgroundColor: "rgba(52, 52, 52, 0)",
									borderTopWidth: 0,
									marginBottom: 5,
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
											searchParams: { title: text }
										},
										() => {
											this.getOffers();
										}
									);
								}}
							/>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									marginRight: 15,
									marginLeft: 15
								}}
							>
								<RNPickerSelect
									placeholder={{
										label: "Trier par...",
										value: null
									}}
									items={this.state.filterItems}
									onValueChange={value => {
										this.setState(
											{
												searchParams: { sort: value }
											},
											() => {
												this.getOffers();
											}
										);
									}}
									style={{
										inputIOS: {
											width: 165,
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
											// marginLeft: 15,
											// marginRight: 13,
											fontStyle: "italic"
										},
										icon: {
											marginRight: 10,
											bottom: 90,
											borderTopColor: "#536D91"
										}
									}}
									placeholderTextColor="#8396B2"
									value={this.state.searchParams.sort}
								/>

								<TouchableOpacity
									style={{
										width: 165,
										backgroundColor: "white",
										borderWidth: 1,
										borderColor: "#536D91",
										borderRadius: 5,
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center"
									}}
									onPress={this.toggleModal}
								>
									<Text
										style={{
											fontSize: 12,
											backgroundColor: "white",
											color: "#536D91",
											marginLeft: 15,
											marginRight: 13,
											fontStyle: "italic"
										}}
									>
										Ajouter des filtres
									</Text>
									{/* <IconEntypo name="dots-three-horizontal" fontSize={26} />
							
							 */}
									<FontAwesome
										name="filter"
										style={{ fontSize: 20, color: "#536D91" }}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<Modal isVisible={this.state.isModalVisible}>
							<View
								style={{
									flex: 1,
									backgroundColor: "white",
									display: "flex",
									marginTop: 20,
									borderRadius: 15
								}}
							>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										marginTop: 20,
										justifyContent: "flex-end",
										marginRight: 10
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
											style={{ fontSize: 30, color: "#B2025A" }}
										/>
									</TouchableOpacity>
								</View>
								<View
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center"
									}}
								>
									<Text style={{ color: "#B2025A", fontSize: 30 }}>
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
									<TouchableOpacity
										style={{
											display: "flex",
											alignItems: "center",
											marginLeft: 10,
											marginRight: 10,
											flex: 1,
											borderColor: "blue",
											borderWidth: 1,
											borderRadius: 10,
											borderColor: "#B2025A"
										}}
									>
										<Text style={{ color: "#B2025A", fontSize: 20 }}>
											Test physique
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={{
											display: "flex",
											alignItems: "center",
											marginLeft: 10,
											marginRight: 10,
											flex: 1,
											borderColor: "blue",
											borderWidth: 1,
											borderRadius: 10,
											borderColor: "#B2025A"
										}}
									>
										<Text style={{ color: "#B2025A", fontSize: 20 }}>
											Test online
										</Text>
									</TouchableOpacity>
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
									<Text style={{ marginRight: 5, flex: 1 }}>Par ville :</Text>
									<TextInput
										style={{
											height: 20,
											flex: 3,
											borderColor: "gray",
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
									<Text style={{ marginRight: 5, flex: 1 }}>Par durée :</Text>
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
									<Text>{this.state.duration} mins</Text>
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
									<FontAwesome
										name="bars"
										style={{ fontSize: 30, color: "#B2025A", padding: 5 }}
									/>
									<Text>Par catégories :</Text>
									<View style={{ flex: 1 }}>
										<MultiSelect
											hideTags={false}
											items={this.state.categories}
											uniqueKey="_id"
											ref={component => {
												this.multiSelect = component;
											}}
											onSelectedItemsChange={selectedCategories => {
												this.setState({ selectedCategories });
												console.log(this.state.selectedCategories);
											}}
											selectedItems={this.state.selectedCategories}
											selectText="Pick Items"
											searchInputPlaceholderText="Search Items..."
											// onChangeInput={text => console.log(text)}
											// altFontFamily="ProximaNova-Light"
											tagRemoveIconColor="#CCC"
											tagBorderColor="#CCC"
											tagTextColor="#CCC"
											selectedItemTextColor="#CCC"
											selectedItemIconColor="#CCC"
											itemTextColor="#000"
											displayKey="name"
											searchInputStyle={{ color: "#CCC" }}
											submitButtonColor="#CCC"
											submitButtonText="Submit"
										/>
									</View>
								</View>
							</View>
						</Modal>
						<View>{listOffers}</View>
					</ScrollView>
				</BackGroundImage>
			</View>
		);
	}
	componentDidMount() {
		this.getOffers();
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

import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ImageBackground
} from "react-native";

class TopOfferCard extends React.Component {
	state = {
		pageName: "MesOffres"
	};
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => {
						// alert(this.props.id);
						this.props.navigation.navigate("AnnoncesDetails", {
							id: this.props.id,
							pageName: this.state.pageName,
							navigation: this.props.navigation
						});
					}}
				>
					<ImageBackground
						source={{ uri: this.props.picture }}
						style={{ height: 180, width: 240, marginRight: 10 }}
						resizeMode="stretch"
					>
						<Text>This is the TopOfferCard component</Text>
					</ImageBackground>
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

export default TopOfferCard;

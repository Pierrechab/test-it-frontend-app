import React from "react";
import { StyleSheet, Text, View } from "react-native";

class Certification extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the Certification component</Text>
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

export default Certification;

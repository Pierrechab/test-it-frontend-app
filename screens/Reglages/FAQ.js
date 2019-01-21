import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class FAQ extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			opened: [false, false, false, false]
		};
	}

	toggleBox(number) {
		const opened = this.state.opened;
		opened[number] = !opened[number];
		this.setState({
			opened: opened
		});
		// console.log("lol", this.state.opened);
	}
	renderingAnswer(number) {
		const opened = this.state.opened;
		// console.log("lici", opened[number]);
		if (opened[number] === false) {
			return;
		} else {
			return (
				<Text style={{ color: "#567294", fontStyle: "italic", fontSize: 12 }}>
					BLABLABLA BLABLABLA BLABLABLA BLABLABLA BLABLABLA BLABLABLA BLABLABLA
					BLABLABLA BLABLABLA BLABLABLA BLABLABLA BLABLABLA
				</Text>
			);
		}
	}
	render() {
		return (
			<View
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginLeft: 20,
					marginRight: 20
				}}
			>
				<Text
					style={{
						fontSize: 30,
						color: "#041A39",
						marginTop: 30,
						marginBottom: 40
					}}
				>
					F.A.Q
				</Text>
				<View
					style={{
						borderWidth: 1,
						borderStyle: "solid",
						borderColor: "#041A39",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						padding: 5,
						width: 300,
						backgroundColor: "white",
						borderRadius: 3,
						shadowOffset: { width: 5, height: 5 },
						shadowColor: "gray",
						shadowOpacity: 1.0,
						marginBottom: 10
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 5
							// borderWidth: 1,
							// borderStyle: "solid",
							// borderColor: "#041A39",
						}}
					>
						{this.state.opened[0] === false ? (
							<Text style={{ color: "#041A39", fontSize: 15 }}>
								How to Blabla ?
							</Text>
						) : (
							<Text
								style={{ color: "#B2025A", fontSize: 15, fontWeight: "bold" }}
							>
								How to Blabla ?
							</Text>
						)}

						<TouchableOpacity
							style={{ marginLeft: 10 }}
							onPress={() => this.toggleBox(0)}
						>
							{this.state.opened[0] === false ? (
								<Icon name="angle-down" size={30} color="#041A39" />
							) : (
								<Icon name="angle-up" size={30} color="#B2025A" />
							)}
						</TouchableOpacity>
					</View>
					{this.renderingAnswer(0)}
				</View>
				<View
					style={{
						borderWidth: 1,
						borderStyle: "solid",
						borderColor: "#041A39",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						padding: 5,
						width: 300,
						backgroundColor: "white",
						borderRadius: 3,
						shadowOffset: { width: 5, height: 5 },
						shadowColor: "gray",
						shadowOpacity: 1.0,
						marginBottom: 10
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 5
							// borderWidth: 1,
							// borderStyle: "solid",
							// borderColor: "#041A39",
						}}
					>
						{this.state.opened[1] === false ? (
							<Text style={{ color: "#041A39", fontSize: 15 }}>
								How to Blabla ?
							</Text>
						) : (
							<Text
								style={{ color: "#B2025A", fontSize: 15, fontWeight: "bold" }}
							>
								How to Blabla ?
							</Text>
						)}

						<TouchableOpacity
							style={{ marginLeft: 10 }}
							onPress={() => this.toggleBox(1)}
						>
							{this.state.opened[1] === false ? (
								<Icon name="angle-down" size={30} color="#041A39" />
							) : (
								<Icon name="angle-up" size={30} color="#B2025A" />
							)}
						</TouchableOpacity>
					</View>
					{this.renderingAnswer(1)}
				</View>
				<View
					style={{
						borderWidth: 1,
						borderStyle: "solid",
						borderColor: "#041A39",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						padding: 5,
						width: 300,
						backgroundColor: "white",
						borderRadius: 3,
						shadowOffset: { width: 5, height: 5 },
						shadowColor: "gray",
						shadowOpacity: 1.0,
						marginBottom: 10
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 5
							// borderWidth: 1,
							// borderStyle: "solid",
							// borderColor: "#041A39",
						}}
					>
						{this.state.opened[2] === false ? (
							<Text style={{ color: "#041A39", fontSize: 15 }}>
								How to Blabla ?
							</Text>
						) : (
							<Text
								style={{ color: "#B2025A", fontSize: 15, fontWeight: "bold" }}
							>
								How to Blabla ?
							</Text>
						)}

						<TouchableOpacity
							style={{ marginLeft: 10 }}
							onPress={() => this.toggleBox(2)}
						>
							{this.state.opened[2] === false ? (
								<Icon name="angle-down" size={30} color="#041A39" />
							) : (
								<Icon name="angle-up" size={30} color="#B2025A" />
							)}
						</TouchableOpacity>
					</View>
					{this.renderingAnswer(2)}
				</View>
				<View
					style={{
						borderWidth: 1,
						borderStyle: "solid",
						borderColor: "#041A39",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						padding: 5,
						width: 300,
						backgroundColor: "white",
						borderRadius: 3,
						shadowOffset: { width: 5, height: 5 },
						shadowColor: "gray",
						shadowOpacity: 1.0,
						marginBottom: 10
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 5
							// borderWidth: 1,
							// borderStyle: "solid",
							// borderColor: "#041A39",
						}}
					>
						{this.state.opened[3] === false ? (
							<Text style={{ color: "#041A39", fontSize: 15 }}>
								How to Blabla ?
							</Text>
						) : (
							<Text
								style={{ color: "#B2025A", fontSize: 15, fontWeight: "bold" }}
							>
								How to Blabla ?
							</Text>
						)}

						<TouchableOpacity
							style={{ marginLeft: 10 }}
							onPress={() => this.toggleBox(3)}
						>
							{this.state.opened[3] === false ? (
								<Icon name="angle-down" size={30} color="#041A39" />
							) : (
								<Icon name="angle-up" size={30} color="#B2025A" />
							)}
						</TouchableOpacity>
					</View>
					{this.renderingAnswer(3)}
				</View>
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

export default FAQ;

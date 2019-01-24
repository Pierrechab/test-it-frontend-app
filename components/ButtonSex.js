import React from "react";
import { TouchableOpacity, Text } from "react-native";

class ButtonSex extends React.Component {
	render() {
		const buttonColor = this.props.selected ? "rgb(171,36,100)" : "white";
		const textColor = this.props.selected ? "white" : "#041A39";
		return (
			<TouchableOpacity
				style={{
					height: 40,
					margin: 10,
					flex: 1,
					borderRadius: 50,
					backgroundColor: buttonColor,
					justifyContent: "center",
					alignItems: "center",
					shadowColor: "#000000",
					shadowOffset: { width: 5, height: 5 },
					shadowOpacity: 0.4
				}}
				onPress={this.props.onPress}
			>
				<Text
					style={{
						color: textColor,
						fontWeight: "800"
					}}
				>
					{this.props.type}
				</Text>
			</TouchableOpacity>
		);
	}
}

export default ButtonSex;

import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import Icon from "react-native-vector-icons/Foundation";

export default class DateTimePickerTester extends Component {
	state = {
		isDateTimePickerVisible: false
	};

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = date => {
		console.log("A date has been picked: ", date);
		this.props.changeDate(date);
		this._hideDateTimePicker();
	};

	renderDateBox(birthDate) {
		let content = "Sélectionner votre date de naissance";
		if (moment(birthDate).format("DDMMYYYY") !== moment().format("DDMMYYYY")) {
			content = moment(birthDate).format("DD/MM/YYYY");
		}
		return (
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					flex: 1
				}}
			>
				<Text style={{ marginRight: 10, color: "#041A39", fontWeight: "bold" }}>
					{content}
				</Text>
				<Icon name="calendar" size={30} color="rgb(171,36,100)" />
			</View>
		);
	}

	render() {
		const { birthDate } = this.props;

		return (
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					display: "flex"
				}}
			>
				<TouchableOpacity
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center"
						// width: "100%"
					}}
					onPress={this._showDateTimePicker}
				>
					{this.renderDateBox(birthDate)}
				</TouchableOpacity>
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
					cancelTextIOS="Annuler"
					confirmTextIOS="Confirmer"
					date={birthDate}
				/>
			</View>
		);
	}
}

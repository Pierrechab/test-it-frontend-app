import React from "react";
import { Platform } from "react-native";
import {
	createStackNavigator,
	createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import AnnoncesScreen from "../screens/Annonces/Annonces";
import AnnoncesDetailsScreen from "../screens/Annonces/AnnoncesDetails";
import ProfilScreen from "../screens/Profil/Profil";
import MesOffresScreen from "../screens/Mesoffres/MesOffres";
import ReglagesScreen from "../screens/Reglages/Reglages";
import BankAccountScreen from "../screens/Reglages/Bank";
import ContactUsScreen from "../screens/Reglages/Contact";
import IbanFormScreen from "../screens/Reglages/IbanForm";
import Certification from "../screens/Reglages/Certification";
import FAQ from "../screens/Reglages/FAQ";
import NewPassword from "../screens/Reglages/NewPassword";
import IconEntypo from "react-native-vector-icons/Entypo";
import Colors from "../constants/Colors";

const Annonces = createStackNavigator({
	Annonces: {
		screen: AnnoncesScreen,
		navigationOptions: {
			headerStyle: {
				backgroundColor: "#041A39"
			},
			title: "Annonces",
			headerTitleStyle: {
				color: "white",
				fontSize: 22
			}
		}
	}
});

Annonces.navigationOptions = {
	tabBarLabel: "Annonces",
	tabBarOptions: {
		activeTintColor: "#B2025A",
		inactiveTintColor: "#ACB9CC"
	},
	tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"home"} />
};

const Profil = createStackNavigator({
	Profil: {
		screen: ProfilScreen,
		navigationOptions: {
			headerStyle: {
				backgroundColor: "#041A39"
			},
			title: "Mon profil",
			headerTitleStyle: {
				color: "white",
				fontSize: 22
			}
		}
	}
});

Profil.navigationOptions = {
	tabBarLabel: "Profil",
	tabBarOptions: {
		activeTintColor: "#B2025A",
		inactiveTintColor: "#ACB9CC"
	},
	tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"user"} />
};

const MesOffres = createStackNavigator({
	MesOffres: MesOffresScreen
});

MesOffres.navigationOptions = {
	tabBarLabel: "Mes offres",
	tabBarOptions: {
		activeTintColor: "#B2025A",
		inactiveTintColor: "#ACB9CC"
	},
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={"dollar, usd"} />
	)
};

const SettingsStack = createStackNavigator({
	Reglages: ReglagesScreen,
	BankAccount: BankAccountScreen,
	ContactUs: ContactUsScreen,
	IbanForm: IbanFormScreen,
	FAQ: FAQ,
	NewPassword: NewPassword,
	Certification: Certification
});

SettingsStack.navigationOptions = {
	tabBarLabel: "Plus",
	tabBarOptions: {
		activeTintColor: "#B2025A",
		inactiveTintColor: "#ACB9CC"
	},
	tabBarIcon: ({ focused }) => {
		return (
			<IconEntypo
				name="dots-three-horizontal"
				fontSize={26}
				style={{ marginBottom: -15 }}
				color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
			/>
		);
	}
};

export default createBottomTabNavigator({
	Annonces,
	MesOffres,
	SettingsStack
});

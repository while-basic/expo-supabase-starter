import React from "react";
import { View, Switch, ScrollView } from "react-native";
import { router } from "expo-router";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";
import { useColorScheme } from "@/lib/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
	const { signOut } = useSupabase();
	const { colorScheme, setColorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	const toggleTheme = () => {
		setColorScheme(isDark ? "light" : "dark");
	};

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="p-4 gap-y-6">
				<H1 className="text-center">Settings</H1>

				{/* Appearance Section */}
				<View className="bg-card p-4 rounded-lg">
					<H2 className="mb-2">Appearance</H2>
					<View className="flex-row items-center justify-between py-2">
						<View className="flex-row items-center">
							<Ionicons 
								name={isDark ? "moon" : "sunny"} 
								size={20} 
								color={isDark ? "#FFF" : "#000"} 
								style={{ marginRight: 8 }}
							/>
							<Text>Dark Mode</Text>
						</View>
						<Switch
							value={isDark}
							onValueChange={toggleTheme}
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
						/>
					</View>
				</View>

				{/* Notifications Section */}
				<View className="bg-card p-4 rounded-lg">
					<H2 className="mb-2">Notifications</H2>
					<View className="flex-row items-center justify-between py-2">
						<View className="flex-row items-center">
							<Ionicons 
								name="notifications-outline" 
								size={20} 
								color={isDark ? "#FFF" : "#000"} 
								style={{ marginRight: 8 }}
							/>
							<Text>Push Notifications</Text>
						</View>
						<Switch
							value={true}
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={"#f5dd4b"}
						/>
					</View>
					<View className="flex-row items-center justify-between py-2">
						<View className="flex-row items-center">
							<Ionicons 
								name="mail-outline" 
								size={20} 
								color={isDark ? "#FFF" : "#000"} 
								style={{ marginRight: 8 }}
							/>
							<Text>Email Notifications</Text>
						</View>
						<Switch
							value={false}
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={"#f5dd4b"}
						/>
					</View>
				</View>

				{/* About Section */}
				<View className="bg-card p-4 rounded-lg">
					<H2 className="mb-2">About</H2>
					<View className="py-2">
						<Text className="font-bold">Version</Text>
						<Muted>1.0.0</Muted>
					</View>
					<View className="py-2">
						<Text className="font-bold">Made with</Text>
						<Muted>Expo, React Native, and Supabase</Muted>
					</View>
				</View>

				{/* Sign Out Button */}
				<Button
					className="w-full mt-4"
					size="default"
					variant="destructive"
					onPress={signOut}
				>
					<Text className="text-white">Sign Out</Text>
				</Button>
			</View>
		</ScrollView>
	);
}

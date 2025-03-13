import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { H1, Muted } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSupabase } from "@/context/supabase-provider";

export default function Modal() {
	const { user } = useSupabase();
	const [formData, setFormData] = useState({
		username: user?.email?.split('@')[0] || "",
		fullName: "Demo User",
		bio: "I'm a demo user exploring this awesome app!",
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		setLoading(true);
		
		// Simulate API call
		setTimeout(() => {
			setLoading(false);
			router.back();
		}, 1000);
		
		// In a real app, you would update the profile in Supabase
		// const { error } = await supabase
		//   .from('profiles')
		//   .update({
		//     username: formData.username,
		//     full_name: formData.fullName,
		//     bio: formData.bio,
		//     updated_at: new Date(),
		//   })
		//   .eq('id', user.id);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1"
		>
			<ScrollView className="flex-1 bg-background">
				<View className="p-4">
					<View className="flex-row items-center justify-between mb-6">
						<H1>Edit Profile</H1>
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons name="close" size={24} color="#9CA3AF" />
						</TouchableOpacity>
					</View>
					
					<View className="mb-4">
						<Text className="text-foreground font-medium mb-2">Username</Text>
						<TextInput
							className="bg-card p-3 rounded-lg text-foreground mb-1"
							value={formData.username}
							onChangeText={(value) => handleChange("username", value)}
							placeholder="Username"
							placeholderTextColor="#9CA3AF"
						/>
						<Muted>This will be displayed on your profile</Muted>
					</View>
					
					<View className="mb-4">
						<Text className="text-foreground font-medium mb-2">Full Name</Text>
						<TextInput
							className="bg-card p-3 rounded-lg text-foreground"
							value={formData.fullName}
							onChangeText={(value) => handleChange("fullName", value)}
							placeholder="Full Name"
							placeholderTextColor="#9CA3AF"
						/>
					</View>
					
					<View className="mb-6">
						<Text className="text-foreground font-medium mb-2">Bio</Text>
						<TextInput
							className="bg-card p-3 rounded-lg text-foreground"
							value={formData.bio}
							onChangeText={(value) => handleChange("bio", value)}
							placeholder="Tell us about yourself"
							placeholderTextColor="#9CA3AF"
							multiline
							numberOfLines={4}
							style={{ height: 100, textAlignVertical: 'top' }}
						/>
					</View>
					
					<Button
						className="w-full"
						variant="default"
						size="default"
						onPress={handleSave}
						disabled={loading}
					>
						<Text>{loading ? "Saving..." : "Save Changes"}</Text>
					</Button>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

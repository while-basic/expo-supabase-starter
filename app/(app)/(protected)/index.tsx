import { router } from "expo-router";
import { View, ScrollView, TouchableOpacity } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useToast } from "@/context/toast-provider";
import type { ToastType } from "@/components/ui/toast";
import { useSupabase } from "@/context/supabase-provider";
import { StatCard } from "@/components/ui/stat-card";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/lib/useColorScheme";

export default function Home() {
	const { showToast } = useToast();
	const { user } = useSupabase();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	const handleShowToast = (type: ToastType) => {
		const messages = {
			success: "Operation completed successfully!",
			error: "An error occurred. Please try again.",
			warning: "Warning: This action cannot be undone.",
			info: "Did you know? You can customize this app!",
		};
		
		showToast(messages[type], type);
	};

	// Get the current time to display a greeting
	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) return "Good morning";
		if (hour < 18) return "Good afternoon";
		return "Good evening";
	};

	// Get the first part of the email (username) for personalization
	const username = user?.email?.split('@')[0] || "there";

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="p-4">
				{/* Welcome Section */}
				<View className="mb-6">
					<H1>{getGreeting()}, {username}!</H1>
					<Muted>Welcome to your dashboard. Here's what's happening today.</Muted>
				</View>
				
				{/* Stats Section */}
				<View className="mb-6">
					<H2 className="mb-3">Overview</H2>
					<View className="flex-row gap-4 mb-4">
						<View className="flex-1">
							<StatCard
								title="Completed Tasks"
								value={5}
								icon="checkmark-circle"
								iconColor="#10B981"
								iconBgColor="rgba(16, 185, 129, 0.1)"
								change={{ value: 12, isPositive: true }}
							/>
						</View>
						<View className="flex-1">
							<StatCard
								title="Pending Tasks"
								value={3}
								icon="time"
								iconColor="#F59E0B"
								iconBgColor="rgba(245, 158, 11, 0.1)"
								change={{ value: 5, isPositive: false }}
							/>
						</View>
					</View>
					<StatCard
						title="Activity Score"
						value="85/100"
						icon="analytics"
						iconColor="#3B82F6"
						iconBgColor="rgba(59, 130, 246, 0.1)"
						change={{ value: 8, isPositive: true }}
					/>
				</View>
				
				{/* Quick Actions */}
				<View className="mb-6">
					<H2 className="mb-3">Quick Actions</H2>
					<View className="flex-row flex-wrap gap-4">
						<TouchableButton
							icon="add-circle"
							label="New Task"
							onPress={() => router.push("/(app)/(protected)/todos")}
							color="#3B82F6"
						/>
						<TouchableButton
							icon="search"
							label="Search"
							onPress={() => router.push("/(app)/(protected)/search")}
							color="#8B5CF6"
						/>
						<TouchableButton
							icon="person"
							label="Profile"
							onPress={() => router.push("/(app)/(protected)/profile")}
							color="#EC4899"
						/>
						<TouchableButton
							icon="settings"
							label="Settings"
							onPress={() => router.push("/(app)/(protected)/settings")}
							color="#6B7280"
						/>
					</View>
				</View>
				
				{/* Notifications Demo */}
				<View className="bg-card p-4 rounded-lg mb-6">
					<Text className="font-bold mb-2">Notifications Demo</Text>
					<Muted className="mb-4">Try out different toast notifications:</Muted>
					
					<View className="gap-y-2">
						<Button
							className="w-full"
							variant="default"
							size="sm"
							onPress={() => handleShowToast('success')}
						>
							<Text>Success Toast</Text>
						</Button>
						
						<Button
							className="w-full"
							variant="destructive"
							size="sm"
							onPress={() => handleShowToast('error')}
						>
							<Text className="text-white">Error Toast</Text>
						</Button>
						
						<Button
							className="w-full"
							variant="outline"
							size="sm"
							onPress={() => handleShowToast('warning')}
						>
							<Text>Warning Toast</Text>
						</Button>
						
						<Button
							className="w-full"
							variant="secondary"
							size="sm"
							onPress={() => handleShowToast('info')}
						>
							<Text>Info Toast</Text>
						</Button>
					</View>
				</View>
				
				{/* Modal Demo */}
				<Button
					className="w-full mb-4"
					variant="default"
					size="default"
					onPress={() => router.push("/(app)/modal")}
				>
					<Text>Open Profile Edit Modal</Text>
				</Button>
			</View>
		</ScrollView>
	);
}

// Helper component for quick action buttons
interface TouchableButtonProps {
	icon: keyof typeof Ionicons.glyphMap;
	label: string;
	onPress: () => void;
	color: string;
}

const TouchableButton = ({ icon, label, onPress, color }: TouchableButtonProps) => {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	
	return (
		<View className="w-[calc(50%-8px)]">
			<Button
				className="flex-row items-center justify-start p-4 h-auto"
				variant="outline"
				onPress={onPress}
			>
				<View
					style={{
						backgroundColor: `${color}20`, // 20% opacity
						width: 36,
						height: 36,
						borderRadius: 18,
						alignItems: 'center',
						justifyContent: 'center',
						marginRight: 12,
					}}
				>
					<Ionicons name={icon} size={20} color={color} />
				</View>
				<Text>{label}</Text>
			</Button>
		</View>
	);
};

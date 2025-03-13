import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSupabase } from "@/context/supabase-provider";
import { H1, Muted, P } from "@/components/ui/typography";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/lib/useColorScheme";
import { useToast } from "@/context/toast-provider";

export default function Profile() {
  const { user } = useSupabase();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    full_name: "",
    avatar_url: "",
    bio: "I'm a developer exploring this awesome app!",
    location: "San Francisco, CA",
    website: "https://example.com",
    joined: "January 2023",
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    try {
      setLoading(true);
      
      // This is a placeholder - in a real app, you would fetch the profile from Supabase
      // const { data, error } = await supabase
      //   .from('profiles')
      //   .select('username, full_name, avatar_url, bio, location, website, joined')
      //   .eq('id', user.id)
      //   .single();
      
      // if (error) throw error;
      // if (data) setProfile(data);
      
      // For demo purposes, we'll just use the email
      setProfile({
        username: user?.email?.split('@')[0] || "User",
        full_name: "Demo User",
        avatar_url: "",
        bio: "I'm a developer exploring this awesome app!",
        location: "San Francisco, CA",
        website: "https://example.com",
        joined: "January 2023",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      showToast("Failed to load profile", "error");
    } finally {
      setLoading(false);
    }
  }

  const handleShare = () => {
    showToast("Profile sharing is not implemented yet", "info");
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <H1>Profile</H1>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color={isDark ? "#FFFFFF" : "#000000"} />
          </TouchableOpacity>
        </View>
        
        {/* Profile Card */}
        <View className="bg-card rounded-xl overflow-hidden mb-6">
          {/* Cover Image */}
          <View className="h-32 bg-primary/30" />
          
          {/* Avatar and Basic Info */}
          <View className="px-4 pb-4">
            <View className="flex-row justify-between items-end mt-(-16)">
              <View className="w-24 h-24 rounded-full bg-background border-4 border-background overflow-hidden">
                {profile.avatar_url ? (
                  <Image 
                    source={{ uri: profile.avatar_url }} 
                    className="w-full h-full" 
                  />
                ) : (
                  <View className="w-full h-full bg-primary items-center justify-center">
                    <Text className="text-white text-2xl font-bold">
                      {profile.username.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>
              
              <Button
                variant="outline"
                size="sm"
                className="mb-2"
                onPress={() => router.push("/(app)/modal")}
              >
                <Text>Edit Profile</Text>
              </Button>
            </View>
            
            <View className="mt-2">
              <Text className="text-xl font-bold">{profile.full_name}</Text>
              <Text className="text-muted-foreground">@{profile.username}</Text>
            </View>
            
            <Muted className="mt-2">{profile.bio}</Muted>
            
            <View className="flex-row flex-wrap mt-4">
              {profile.location && (
                <View className="flex-row items-center mr-4 mb-2">
                  <Ionicons name="location-outline" size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
                  <Text className="text-muted-foreground ml-1">{profile.location}</Text>
                </View>
              )}
              
              {profile.website && (
                <View className="flex-row items-center mr-4 mb-2">
                  <Ionicons name="link-outline" size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
                  <Text className="text-primary ml-1">{profile.website}</Text>
                </View>
              )}
              
              {profile.joined && (
                <View className="flex-row items-center mb-2">
                  <Ionicons name="calendar-outline" size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
                  <Text className="text-muted-foreground ml-1">Joined {profile.joined}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        
        {/* Account Information */}
        <View className="bg-card p-4 rounded-lg mb-6">
          <Text className="font-bold text-lg mb-2">Account Information</Text>
          
          <View className="mb-3">
            <Text className="font-medium">Email</Text>
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={16} color={isDark ? "#9CA3AF" : "#6B7280"} style={{ marginRight: 8 }} />
              <Text className="text-muted-foreground">{user?.email}</Text>
            </View>
          </View>
          
          <View className="mb-3">
            <Text className="font-medium">Account Type</Text>
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={16} color={isDark ? "#9CA3AF" : "#6B7280"} style={{ marginRight: 8 }} />
              <Text className="text-muted-foreground">Free Account</Text>
            </View>
          </View>
          
          <View>
            <Text className="font-medium">Last Login</Text>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color={isDark ? "#9CA3AF" : "#6B7280"} style={{ marginRight: 8 }} />
              <Text className="text-muted-foreground">Today</Text>
            </View>
          </View>
        </View>
        
        {/* Activity */}
        <View className="bg-card p-4 rounded-lg">
          <Text className="font-bold text-lg mb-2">Recent Activity</Text>
          
          <View className="items-center justify-center py-8">
            <Ionicons name="analytics-outline" size={48} color={isDark ? "#6B7280" : "#9CA3AF"} />
            <Muted className="text-center mt-2">No recent activity to display</Muted>
          </View>
        </View>
      </View>
    </ScrollView>
  );
} 
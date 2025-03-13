import React from 'react';
import { View } from 'react-native';
import { Text } from './text';
import { useColorScheme } from '@/lib/useColorScheme';
import type { ChatMessage } from '@/lib/openai';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

interface ChatBubbleProps {
  message: ChatMessage & { id?: string; timestamp?: Date };
  isLastMessage?: boolean;
}

export function ChatBubble({ message, isLastMessage = false }: ChatBubbleProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isUser = message.role === 'user';
  
  // Format timestamp if available, otherwise use current time
  const time = message.timestamp 
    ? format(message.timestamp, 'h:mm a')
    : format(new Date(), 'h:mm a');

  return (
    <View className={`mb-4 flex-row ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <View className="mr-2 mt-1">
          <View className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Ionicons name="chatbubble" size={16} color="white" />
          </View>
        </View>
      )}
      
      <View className="max-w-[75%]">
        <View 
          className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? 'bg-primary rounded-tr-none' 
              : isDark ? 'bg-gray-800 rounded-tl-none' : 'bg-gray-100 rounded-tl-none'
          }`}
          style={{ 
            opacity: isLastMessage && message.role === 'assistant' ? 0.7 : 1,
            shadowColor: isDark ? '#000' : '#888',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1
          }}
        >
          <Text 
            className={`${isUser ? 'text-white' : 'text-foreground'} text-base`}
          >
            {message.content}
          </Text>
        </View>
        
        <Text className="text-xs text-gray-500 mt-1 ml-1">
          {time}
        </Text>
      </View>
      
      {isUser && (
        <View className="ml-2 mt-1">
          <View className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <Ionicons name="person" size={16} color="white" />
          </View>
        </View>
      )}
    </View>
  );
} 
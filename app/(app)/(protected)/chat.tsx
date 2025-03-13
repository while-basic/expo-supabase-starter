import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { H1 } from '@/components/ui/typography';
import { Text } from '@/components/ui/text';
import { useColorScheme } from '@/lib/useColorScheme';
import { useToast } from '@/context/toast-provider';
import { ChatBubble } from '@/components/ui/chat-bubble';
import { getChatCompletion } from '@/lib/openai';
import type { ChatMessage } from '@/lib/openai';
import { format } from 'date-fns';

// Initial system message to set the AI's behavior
const SYSTEM_MESSAGE: ChatMessage = {
  role: 'system',
  content: 'You are a helpful assistant. Provide concise, accurate, and friendly responses. If you don\'t know something, be honest about it.'
};

export default function Chat() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { showToast } = useToast();
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<(ChatMessage & { id?: string; timestamp?: Date })[]>([
    { ...SYSTEM_MESSAGE, id: 'system-0' },
    {
      role: 'assistant',
      content: 'Hello! How can I help you today?',
      id: 'assistant-0',
      timestamp: new Date()
    }
  ]);

  // Function to scroll to bottom
  const scrollToBottom = useRef(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }).current;

  // Scroll to bottom on initial render and when messages change
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: ChatMessage & { id: string; timestamp: Date } = {
      role: 'user',
      content: inputMessage.trim(),
      id: `user-${Date.now()}`,
      timestamp: new Date()
    };
    
    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Add a placeholder for the assistant's response
      const placeholderId = `assistant-${Date.now()}`;
      const placeholderTimestamp = new Date();
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: '...', id: placeholderId, timestamp: placeholderTimestamp }
      ]);
      
      // Get response from OpenAI
      const response = await getChatCompletion([
        ...messages,
        userMessage
      ]);
      
      // Replace the placeholder with the actual response
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === placeholderId 
            ? { ...msg, content: response, timestamp: placeholderTimestamp } 
            : msg
        )
      );
    } catch (error) {
      // Remove the placeholder message
      setMessages(prevMessages => 
        prevMessages.filter(msg => msg.content !== '...')
      );
      
      // Show error toast
      showToast(error instanceof Error ? error.message : 'Failed to get response', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { ...SYSTEM_MESSAGE, id: 'system-0' },
      {
        role: 'assistant',
        content: 'Hello! How can I help you today?',
        id: 'assistant-0',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
              <Ionicons name="chatbubble" size={18} color="white" />
            </View>
            <View>
              <Text className="font-bold text-lg">AI Assistant</Text>
              <Text className="text-xs text-gray-500">Online</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            onPress={clearChat}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
          >
            <Ionicons name="trash-outline" size={20} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
        </View>
        
        {/* Chat Messages */}
        <KeyboardAvoidingView 
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView 
            ref={scrollViewRef}
            className="flex-1 px-4"
            contentContainerStyle={{ paddingVertical: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.filter(msg => msg.role !== 'system').map((message) => (
              <ChatBubble 
                key={message.id} 
                message={message} 
                isLastMessage={message.content === '...' && isLoading}
              />
            ))}
            
            {isLoading && messages.some(msg => msg.content === '...') && (
              <View className="self-start ml-2 mb-2">
                <ActivityIndicator size="small" color={isDark ? 'white' : 'black'} />
              </View>
            )}
          </ScrollView>
          
          {/* Message Input */}
          <View className="px-4 py-2 border-t border-gray-200 dark:border-gray-800">
            <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1">
              <TextInput
                className="flex-1 py-2 text-foreground"
                placeholder="Type a message..."
                placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
                value={inputMessage}
                onChangeText={setInputMessage}
                multiline
                maxLength={1000}
                style={{ maxHeight: 100 }}
              />
              
              <TouchableOpacity
                className={`p-2 rounded-full ${!inputMessage.trim() ? 'opacity-50' : 'bg-primary'}`}
                onPress={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
              >
                <Ionicons name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
            
            <Text className="text-xs text-gray-500 text-center mt-2">
              Powered by GPT-4o-mini
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
} 
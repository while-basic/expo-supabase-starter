import type { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';

interface TodoProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Todo: FC<TodoProps> = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <View className="flex-row items-center justify-between bg-card p-4 rounded-lg mb-2">
      <TouchableOpacity 
        onPress={() => onToggle(id)}
        className="flex-row items-center flex-1"
      >
        <View className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${completed ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
          {completed && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
        <Text className={`flex-1 ${completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
          {text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => onDelete(id)} className="ml-2">
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
}; 
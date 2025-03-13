import type { FC } from 'react';
import { View } from 'react-native';
import { Text } from './text';
import { Muted } from './typography';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/lib/useColorScheme';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBgColor?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconColor = '#3B82F6',
  iconBgColor = 'rgba(59, 130, 246, 0.1)',
  change,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="bg-card p-4 rounded-lg">
      <View className="flex-row justify-between items-center mb-2">
        <Muted>{title}</Muted>
        {icon && (
          <View
            style={{
              backgroundColor: iconBgColor,
              width: 32,
              height: 32,
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name={icon} size={16} color={iconColor} />
          </View>
        )}
      </View>
      
      <Text className="text-xl font-bold">{value}</Text>
      
      {change && (
        <View className="flex-row items-center mt-1">
          <Ionicons
            name={change.isPositive ? 'arrow-up-outline' : 'arrow-down-outline'}
            size={14}
            color={change.isPositive ? '#10B981' : '#EF4444'}
          />
          <Text
            className={`text-xs ml-1 ${
              change.isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {change.value}% {change.isPositive ? 'increase' : 'decrease'}
          </Text>
        </View>
      )}
    </View>
  );
}; 
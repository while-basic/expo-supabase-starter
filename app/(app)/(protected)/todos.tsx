import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { H1 } from '@/components/ui/typography';
import { Todo } from '@/components/Todo';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSupabase } from '@/context/supabase-provider';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const { user } = useSupabase();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  // In a real app, you would fetch todos from Supabase
  useEffect(() => {
    // Simulating data for demo purposes
    setTodos([
      { id: '1', text: 'Learn React Native', completed: true },
      { id: '2', text: 'Build a Todo App', completed: false },
      { id: '3', text: 'Deploy to App Store', completed: false },
    ]);
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const newTodoItem: TodoItem = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
    
    // In a real app, you would save to Supabase
    // const { data, error } = await supabase
    //   .from('todos')
    //   .insert([{ text: newTodo, user_id: user.id, completed: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    
    // In a real app, you would update in Supabase
    // const todoToUpdate = todos.find(todo => todo.id === id);
    // const { data, error } = await supabase
    //   .from('todos')
    //   .update({ completed: !todoToUpdate.completed })
    //   .eq('id', id);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    
    // In a real app, you would delete from Supabase
    // const { data, error } = await supabase
    //   .from('todos')
    //   .delete()
    //   .eq('id', id);
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
    
    // In a real app, you would delete from Supabase
    // const { data, error } = await supabase
    //   .from('todos')
    //   .delete()
    //   .eq('completed', true)
    //   .eq('user_id', user.id);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className="flex-1 bg-background p-4">
        <H1 className="text-center mb-6">Todo List</H1>
        
        <View className="flex-row mb-4">
          <TextInput
            className="flex-1 bg-card p-3 rounded-l-lg text-foreground"
            placeholder="Add a new todo..."
            placeholderTextColor="#9CA3AF"
            value={newTodo}
            onChangeText={setNewTodo}
          />
          <TouchableOpacity
            className="bg-primary p-3 rounded-r-lg justify-center items-center"
            onPress={addTodo}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <ScrollView className="flex-1 mb-4">
          {todos.length === 0 ? (
            <View className="items-center justify-center py-8">
              <Text className="text-muted-foreground">No todos yet. Add one above!</Text>
            </View>
          ) : (
            todos.map(todo => (
              <Todo
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </ScrollView>
        
        {todos.some(todo => todo.completed) && (
          <Button
            variant="destructive"
            size="sm"
            className="mb-4"
            onPress={clearCompletedTodos}
          >
            <Text className="text-white">Clear Completed</Text>
          </Button>
        )}
      </View>
    </KeyboardAvoidingView>
  );
} 
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import TaskItem from '../components/TaskItem';

const AddTaskScreen = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

    const handleAddTask = () => {
        if (task) {
            if (editIndex !== -1) {
                const updatedTasks = [...tasks];
                updatedTasks[editIndex] = task;
                setTasks(updatedTasks);
                setEditIndex(-1);
            } else {
                setTasks([...tasks, task]);
            }
            setTask("");
        } else {
            alert('Please type in a task');
        }
    };

    const handleEditTask = (index) => {
        const taskToEdit = tasks[index];
        setTask(taskToEdit);
        setEditIndex(index);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    return (
        <View className="flex-1 p-6 mt-14">
            <Text className="text-black text-4xl text-center font-bold mt-9 mb-20">Add Task</Text>
            <TextInput
                style={{ height: 50 }}
                className="bg-gray-300 text-black p-4 rounded-lg text-lg mb-6"
                placeholder="Enter task"
                value={task}
                onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity
                className="bg-cyan-500 p-4 rounded-lg mb-6 mt-6"
                onPress={handleAddTask}
            >
                <Text className="text-white text-center text-lg font-bold ">
                    {editIndex !== -1 ? "Update Task" : "Add Task"}
                </Text>
            </TouchableOpacity>
            <FlatList
                data={tasks}
                renderItem={({ item, index }) => (
                    <TaskItem
                        item={item}
                        index={index}
                        handleEditTask={handleEditTask}
                        handleDeleteTask={handleDeleteTask}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default AddTaskScreen;

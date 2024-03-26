import React, { Component } from 'react';
import '../../style.css';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            todoText: '',
        };
    }

    async componentDidMount() {
        try {
            const res = await fetch('http://localhost:3000/todoList');
            const json = await res.json();
            this.setState({ todoList: json });
        } catch (error) {
            console.log(error);
        }
    }

    addTodo = async (e) => {
        e.preventDefault();
        try {
            const { todoText } = this.state;
            const res = await fetch('http://localhost:3000/todoList', {
                method: 'POST',
                body: JSON.stringify({
                    text: todoText,
                    isDone: false,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            const json = await res.json();

            this.setState(({ todoList }) => ({
                todoList: [json, ...todoList],
                todoText: '',
            }));
        } catch (error) {
            console.log(error);
        }
    };

    handleCheckboxChange = async (index) => {
        try {
            const updatedList = [...this.state.todoList];
            updatedList[index].isDone = !updatedList[index].isDone;

            const res = await fetch(`http://localhost:3000/todoList/${updatedList[index].id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedList[index]),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            await res.json();

            this.setState({ todoList: updatedList });
        } catch (error) {
            console.log(error);
        }
    };


    deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:3000/todoList/${id}`, {
                method: 'DELETE',
            });
            this.setState(prevState => ({
                todoList: prevState.todoList.filter(todo => todo.id !== id)
            }));
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const { todoList, todoText } = this.state;
        return (
            <div className='flex flex-col h-screen'>
                <h1 className='text-center m-10'>Todo App</h1>
                <form className='flex justify-center' onSubmit={this.addTodo}>
                    <div>
                        <Label htmlFor="todoText" className="sr-only">Todo Text</Label>
                        <Input id="todoText" placeholder="Enter Your Todo" className="rounded-r-none" value={todoText}
                            onChange={(e) => {
                                this.setState({ todoText: e.target.value });
                            }} />
                    </div>
                    <Button type="submit" className="rounded-l-none">Add Todo</Button>
                </form>
                <div className='flex-1'>
                    {todoList.map((item, index) => (
                        <div className='flex items-center m-4' key={item.id}>
                            <Label htmlFor={`taskCompleted-${index}`} className="sr-only">Task Complete Todo</Label>
                            <input type="checkbox" id={`taskCompleted-${index}`} checked={item.isDone}
                                onChange={() => this.handleCheckboxChange(index)} className='w-4 h-4 text-[#09143E] bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-[#09143E] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            />

                            <p className={`!m-0 flex-1 px-6 line-clamp-1 ${item.isDone ? 'line-through' : ''}`}>{item.text}</p>
                            <Button type="button" className="" onClick={() => this.deleteTodo(item.id)}>Delete Todo</Button>
                        </div>
                    ))}
                </div>
                <div className='flex'>
                    <Button className="flex-1 rounded-none">Add</Button>
                    <Button className="flex-1 rounded-none">Pending</Button>
                    <Button className="flex-1 rounded-none">Completed</Button>
                </div>
            </div >
        );
    }
}

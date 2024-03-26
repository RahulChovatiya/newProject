import React, { Component } from 'react';
import '../../style.css';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            orderName: '',
            orderPrice: '',
            friendName: '',
            billResults: {}
        };
    }

    addOrder = () => {
        const { orderName, orderPrice, friendName } = this.state;
        if (orderName && friendName && orderPrice) {
            const newOrder = {
                name: orderName,
                price: parseFloat(orderPrice),
                friend: friendName
            };
            this.setState(prevState => ({
                orders: [...prevState.orders, newOrder],
                orderName: '',
                orderPrice: '',
                friendName: ''
            }));
        }
    };

    calculateBill = () => {
        const { orders } = this.state;
        const newBillResults = {};
        orders.forEach(order => {
            if (newBillResults[order.friend]) {
                newBillResults[order.friend] += order.price;
            } else {
                newBillResults[order.friend] = order.price;
            }
        });
        this.setState({ billResults: newBillResults });
    };

    resetOrders = () => {
        this.setState({
            orders: [],
            billResults: {}
        });
    };

    render() {
        const { orders, orderName, orderPrice, friendName, billResults } = this.state;
        return (
            <div className="container mx-auto px-4 py-8 flex flex-col">
                <h1 className="mb-8 font-bold text-center">Order Splitter</h1>
                <form className="flex flex-wrap justify-center mb-8">
                    <Input
                        type="text"
                        value={orderName}
                        placeholder="Order Name"
                        onChange={(e) => this.setState({ orderName: e.target.value })}
                        className="border rounded flex-1 py-2 px-3 mr-2 focus:outline-none sm:flex- sm:w-full"
                        required
                    />
                    <Input
                        type="number"
                        value={orderPrice}
                        placeholder="Order Price"
                        onChange={(e) => this.setState({ orderPrice: e.target.value })}
                        className="border rounded flex-1 py-2 px-3 mr-2 focus:outline-none sm:w-full"
                        required
                    />
                    <Input
                        type="text"
                        value={friendName}
                        placeholder="Friend's Name"
                        onChange={(e) => this.setState({ friendName: e.target.value })}
                        className="border rounded flex-1 py-2 px-3 mr-2 focus:outline-none sm:w-full"
                        required
                    />
                    <Button onClick={this.addOrder}>
                        Add Order
                    </Button>
                </form>
                <div className="flex justify-center mb-8">
                    <button onClick={this.calculateBill} className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${orders.length > 0 ? '' : 'opacity-50 cursor-not-allowed'}`}>
                        {orders.length > 0 ? 'Calculate Bill' : 'Add Orders to Calculate'}
                    </button>
                </div>
                <div className="flex justify-around">
                    <div className=" w-5/12 p-3 bg-white rounded-2xl">
                        <h3 className="font-bold mb-2">Order List:</h3>
                        {orders.map((order, index) => (
                            <p key={index} className="font-semibold mb-2">Order-{index + 1}: {order.name} - {order.price} - {order.friend}</p>
                        ))}
                    </div>
                    {Object.keys(billResults).length > 0 && (
                        <div className="text-indigo-600 w-5/12 p-3 bg-white rounded-2xl">
                            <h3 className="font-bold mb-2">Bill Split Amount:</h3>
                            {Object.keys(billResults).map((friend, index) => (
                                <p key={index} className="font-bold mb-2">{friend}: {billResults[friend]}</p>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex mt-6 justify-center">
                    <button onClick={this.resetOrders} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Reset Orders
                    </button>
                </div>
            </div>
        );
    }
}

export default Billing;

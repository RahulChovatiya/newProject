import React, { Component, createRef } from 'react';

const data = [
    { city: "Ahmedabad", temperature: 21 },
    { city: "Surat", temperature: 22 },
    { city: "Vadodara", temperature: 20 },
    { city: "Rajkot" },
    { city: "Vidyanagar", temperature: 21 },
    { city: "Jamnagar", temperature: 19 },
    { city: "Junagadh", temperature: 22 },
    { city: "Gandhinagar", temperature: 20 },
    { city: "Anand", temperature: 22 },
    { city: "Bharuch", temperature: 23 }
];

export default class Weather extends Component {
    state = {
        selectedItems: null,
    };

    selectRef = createRef();

    FindClick = () => {
        const selectedCity = this.selectRef.current.value;
        const cityData = data.find(c => c.city === selectedCity);
        if (cityData) {
            this.setState({
                selectedItems: cityData
            });

        } else {
            this.setState({
                selectedItems: null
            });
        }
    };

    handleViewWeatherOnGoogle = () => {
        const { selectedItems } = this.state;
        if (selectedItems && selectedItems.city) {
            window.open(`https://www.google.com/search?q=weather+${selectedItems.city}`, '_blank');
        }
    };

    render() {
        const { selectedItems } = this.state;

        return (
            <div className='flex justify-center items-center h-screen bg-fit overflow-hidden'>
                <img src="/images/cloud.jpg" alt="" srcset="" className='relative' />
                <div className='flex-col absolute backdrop-blur p-36 rounded-3xl border-2'>
                    <h1 className='flex justify-center text-5xl text-white font-semibold mb-7'>Weather App</h1>
                    <div className='flex justify-center'>
                        <select ref={this.selectRef} id="citySelect" className='mr-2 bg-slate-200 border-slate-950 rounded-md py-2 pr-20 pl-3 font-semibold '
                        >
                            <option value="">Select a city</option>
                            {data.map(c => (
                                <option key={c.city} value={c.city} > {c.city}</option>
                            ))}
                        </select>

                        <button className='rounded-md bg-[#516161] px-10 text-base font-semibold text-white shadow-sm hover:bg-[#304C57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            onClick={this.FindClick}>Find</button>
                    </div>
                    {selectedItems !== null && selectedItems.temperature !== undefined && (
                        <div className="flex justify-center mt-4 text-white">
                            <p className="text-lg">{selectedItems.city} temperature is: {selectedItems.temperature}°C</p>
                        </div>
                    )}
                    {selectedItems !== null && selectedItems.temperature === undefined && (
                        <div className="flex justify-center mt-4 text-white">
                            <p className="text-lg">{selectedItems.city} temperature data not available.
                                <button className="text-blue-500 ml-2 underline" onClick={this.handleViewWeatherOnGoogle}>View in Google</button>
                            </p>
                        </div>
                    )}
                </div>
            </div >
        );
    }
}

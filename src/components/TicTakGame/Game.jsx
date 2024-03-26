import React, { Component } from 'react';

const initBoxes = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

export default class TickTack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'toss', // 'toss' or 'game'
            tossDone: false,
            tossWinner: null,
            boxes: initBoxes,
            turn: undefined,
            winner: null,
        };
    }

    // Function to perform the toss
    performToss = () => {
        const tossResult = Math.random() < 0.5 ? 'X' : 'O';
        this.setState({
            tossDone: true,
            tossWinner: tossResult,
            turn: tossResult,
            currentPage: 'game',
        });
    };

    // Function to reset the game
    resetGame = () => {
        this.setState({
            tossDone: false,
            tossWinner: null,
            boxes: initBoxes,
            turn: undefined,
            winner: null,
            currentPage: 'toss',
        });
    };

    onSelectBox = (e) => {
        const { tossDone, turn, winner } = this.state;

        if (!tossDone || winner) {
            return;
        }

        const outerIndex = Number(e.target.getAttribute('data-outerIndex'));
        const innerIndex = Number(e.target.getAttribute('data-innerIndex'));

        if (this.state.boxes[outerIndex][innerIndex] !== '') {
            return;
        }

        this.setState(({ boxes, turn }) => {
            let winner;

            const updatedBoxes = [
                ...boxes.slice(0, outerIndex),
                [
                    ...boxes[outerIndex].slice(0, innerIndex),
                    turn,
                    ...boxes[outerIndex].slice(innerIndex + 1),
                ],
                ...boxes.slice(outerIndex + 1),
            ];

            for (let i = 0; i < 3; i += 1) {
                winner =
                    (updatedBoxes[i][0] === turn &&
                        updatedBoxes[i][1] === turn &&
                        updatedBoxes[i][2] === turn) ||
                    (updatedBoxes[0][i] === turn &&
                        updatedBoxes[1][i] === turn &&
                        updatedBoxes[2][i] === turn);

                if (winner) {
                    break;
                }
            }

            if (!winner) {
                winner =
                    (updatedBoxes[0][0] === turn &&
                        updatedBoxes[1][1] === turn &&
                        updatedBoxes[2][2] === turn) ||
                    (updatedBoxes[0][2] === turn &&
                        updatedBoxes[1][1] === turn &&
                        updatedBoxes[2][0] === turn);
            }

            if (winner) {
                winner = turn;
            }

            return {
                boxes: winner ? initBoxes : updatedBoxes,
                turn: turn === 'O' ? 'X' : 'O',
                winner,
            };
        });
    };

    render() {
        const { currentPage, tossDone, tossWinner, boxes, winner } = this.state;

        return (
            <>
                {currentPage === 'toss' && (
                    <div className='bg-slate-200 h-screen flex flex-col justify-center items-center'>
                        <h1 className='flex justify-center items-center mb-10 text-5xl font-bold '>It's Time to PlayGame</h1>
                        <button className='py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-yellow-500 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' onClick={this.performToss}>Let's Toss</button>
                    </div>
                )}
                {currentPage === 'game' && (
                    <>
                        {tossDone && !winner && <h2>{`${tossWinner} won the toss!`}</h2>}
                        {winner && <h1>{`Winner is ${winner}`}</h1>}
                        <div className="desktop-center w-screen flex justify-center items-center">
                            <div className="w-80 aspect-square grid grid-cols-3 grid-rows-3 gap-4">
                                {boxes.map((outerItem, outerIndex) =>
                                    outerItem.map((innerItem, innerIndex) => (
                                        <button
                                            key={`${outerIndex}_${innerIndex}`}
                                            type="button"
                                            className="bg-yellow-200"
                                            data-outerIndex={outerIndex}
                                            data-innerIndex={innerIndex}
                                            onClick={this.onSelectBox}
                                        >
                                            {innerItem}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                        {(winner || (tossDone && !boxes.flat().includes(''))) && (
                            <button onClick={this.resetGame}>Reset Game</button>
                        )}
                    </>
                )
                }
            </>
        );
    }
}

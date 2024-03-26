import React, { Component } from 'react'
import './style.css'

export class App extends Component {
  state = { count: 0 }
  render() {
    const { count: data } = this.state
    return (
      <div className="text-white flex bg-black">
        <button
          className='btn'
          onClick={() => {
            this.setState(({ count }) => ({
              count: count + 1,
            }))
          }}
        >
          +
        </button>
        <p className="items-center flex">{data}</p>
        <button
          className="btn"
          disabled={data <= 0}
          onClick={() => {
            this.setState(({ count }) => ({
              count: count - 1,
            }))
          }}
        >
          -
        </button>
      </div >
    )
  }
}

export default App

// import React, { Component } from 'react'

// export default class App extends Component {
//   state = { count: 0 }
//   render() {
//     const { count: data } = this.state
//     return (
//       <div>
//         <button type='button' onClick={() => {
//             this.setState(({count}) =>  ({ count: count + 1 }))
//         }}>+</button>
//         <p>{data}</p>
//         <button type="button" disabled={data <= 0} onClick={() => {
//             this.setState(({count}) =>  ({ count: count - 1 }))
//         }}>-</button>
//       </div>
//     )
//   }
// }

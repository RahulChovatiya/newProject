import React, { Fragment } from 'react'

function Header({ c1, c2, c3, c4, c5, c6, logo }) {
  return (
    <>
      <div className="w-full py-4 bg-emerald-400 flex justify-end">
        <div className="justify-start flex w-full px-20 text-white font-bold text-5xl">
          Rahul <span className="text-red-700">.</span>
        </div>
        <li className="list-none flex gap-10 px-20 items-center">
          <ul>
            <a href="#" className="text-white font-bold">
              {c1}
            </a>
          </ul>
          <ul>
            <a href="#" className="text-white font-bold">
              {c2}
            </a>
          </ul>
          <ul>
            <a href="#" className="text-white font-bold">
              {c3}
            </a>
          </ul>
          <ul>
            <a href="#" className="text-white font-bold">
              {c4}
            </a>
          </ul>
          <ul>
            <a href="#" className="text-white font-bold">
              {c5}
            </a>
          </ul>
          <ul>
            <a href="#" className="text-white font-bold">
              {c6}
            </a>
          </ul>
        </li>
      </div>
    </>
  )
}

export default Header

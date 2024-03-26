import React, { Fragment } from 'react'

function Footer({ c1, c2, c3, c4, c5, c6, logo }) {
  return (
    <footer className="bg-red-400 w-full fixed bottom-0 block text-white font-bold">
      <h1 className="justify-center flex">{logo}</h1>
      <li className="list-none flex gap-10 justify-center">
        <ul>
          <a href="#">{c1}</a>
        </ul>
        <ul>
          <a href="#">{c2}</a>
        </ul>
        <ul>
          <a href="#">{c3}</a>
        </ul>
        <ul>
          <a href="#">{c4}</a>
        </ul>
        <ul>
          <a href="#">{c5}</a>
        </ul>
        <ul>
          <a href="#">{c6}</a>
        </ul>
      </li>
    </footer>
  )
}

export default Footer

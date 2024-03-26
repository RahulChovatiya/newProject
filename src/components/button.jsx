import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// const warnings = () => {
//     alert ('are you click me');
// }

function Button({ children }) {
  return (
    <button
      type="button"
      className="bg-red-500 px-5 py-6 rounded-full text-white"
    >
      {children}
    </button>
  )
}

Button.propTypes = PropTypes.string.isRequired

export default Button

import React from 'react'

function HighlightText({ text }) {
  return (
    <span className={`font-bold 
    bg-gradient-to-br from-from via-via to-to
    text-transparent bg-clip-text`}>
        { text }
    </span>
  )
}

export default HighlightText
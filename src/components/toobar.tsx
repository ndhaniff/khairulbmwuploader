import React from 'react'
import { Link } from 'umi'

function BreadCrumb() {
  return (
    <div>
      <div className="w-2/3 p-4 mb-1 space-x-4 border-b border-gray-100">
        <Link to="/car">Car</Link>
        <span>/</span>
        <Link to="/media">Media</Link>
      </div>
    </div>
  )
}

export default BreadCrumb

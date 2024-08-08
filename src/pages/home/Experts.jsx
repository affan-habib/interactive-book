import React from 'react'
import { Icon } from "@iconify/react"

const Experts = ({data}) => {
  return (
    <div className="bg-primary-600 py-12 mt-24">
      <h2 className="text-white text-3xl mb-8 container">Our Expertise's</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((expert, index) => (
          <div key={index} className="text-white p-6 rounded-lg shadow-lg flex items-center border border-white">
            <img src={`https://picsum.photos/200?random=${index+1}`} alt={expert.name} className="w-24 h-24 rounded-full mr-4" />
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2 text-white">{expert.name}</h3>
              <p className="mb-4">{expert.bio}</p>
              <p>{expert.email}</p>
              <p>{expert.institute}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experts
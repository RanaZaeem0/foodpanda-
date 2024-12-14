"use client"
import React, { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

const sortOptions = ['Relevance', 'Fastest delivery', 'Distance']
const quickFilters = ['Offers', 'Free delivery', 'Accepts vouchers', 'Deals']
const cuisines = [
  'American', 'BBQ', 'Beverages', 'Biryani', 'Broast', 'Burgers',
  'Cakes & Bakery', 'Chinese', 'Continental'
]

export default function FilterSidebar() {
  const [sortBy, setSortBy] = useState('Relevance')
  const [quickFilterStates, setQuickFilterStates] = useState<Record<string, boolean>>({})
  const [cuisineSearch, setCuisineSearch] = useState('')
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Quick filters': true,
    'Cuisines': true,
    'Price': true
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleQuickFilter = (filter: string) => {
    setQuickFilterStates(prev => ({ ...prev, [filter]: !prev[filter] }))
  }

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    )
  }

  const filteredCuisines = cuisines.filter(cuisine =>
    cuisine.toLowerCase().includes(cuisineSearch.toLowerCase())
  )

  return (
    <div className="w-64 bg-white shadow-lg p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Sort by */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Sort by</h3>
        {sortOptions.map(option => (
          <label key={option} className="flex items-center mb-2">
            <input
              type="radio"
              name="sortBy"
              value={option}
              checked={sortBy === option}
              onChange={() => setSortBy(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      {/* Quick filters */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection('Quick filters')}
        >
          <h3 className="font-semibold">Quick filters</h3>
          {expandedSections['Quick filters'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections['Quick filters'] && quickFilters.map(filter => (
          <label key={filter} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={quickFilterStates[filter] || false}
              onChange={() => toggleQuickFilter(filter)}
              className="mr-2"
            />
            {filter}
          </label>
        ))}
      </div>

      {/* Cuisines */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection('Cuisines')}
        >
          <h3 className="font-semibold">Cuisines</h3>
          {expandedSections['Cuisines'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections['Cuisines'] && (
          <>
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search for cuisines"
                value={cuisineSearch}
                onChange={(e) => setCuisineSearch(e.target.value)}
                className="w-full pl-8 pr-2 py-1 border rounded"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            {filteredCuisines.map(cuisine => (
              <label key={cuisine} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedCuisines.includes(cuisine)}
                  onChange={() => toggleCuisine(cuisine)}
                  className="mr-2"
                />
                {cuisine}
              </label>
            ))}
          </>
        )}
      </div>

      {/* Price range */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection('Price')}
        >
          <h3 className="font-semibold">Price</h3>
          {expandedSections['Price'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections['Price'] && (
          <div className="flex flex-col">
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


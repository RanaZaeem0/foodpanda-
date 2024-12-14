'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'

const popularSearches = [
  'React',
  'Next.js',
  'Tailwind CSS',
  'TypeScript',
  'JavaScript',
]

export default function FoodInput() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filteredItems =
    query === ''
      ? popularSearches
      : popularSearches.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (query !== '') {
      setIsOpen(true)
    }
    setSelectedIndex(-1)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredItems.length - 1 ? prevIndex + 1 : prevIndex
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      setQuery(filteredItems[selectedIndex])
      setIsOpen(false)
      inputRef.current?.blur()
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
      selectedElement.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  return (
    <div className="w-full max-w-md" ref={wrapperRef}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-teal-300 sm:text-sm">
          <input
            ref={inputRef}
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="search-list"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        {isOpen && (
          <ul
            ref={listRef}
            id="search-list"
            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            role="listbox"
          >
            {filteredItems.length === 0 ? (
              <li className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </li>
            ) : (
              filteredItems.map((item, index) => (
                <li
                  key={item}
                  className={`relative cursor-default select-none py-2 pl-10 pr-4 ${
                    index === selectedIndex ? ' text-white' : 'text-gray-900'
                  }`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  onClick={() => {
                    setQuery(item)
                    setIsOpen(false)
                    inputRef.current?.blur()
                  }}
                >
                  <span className={`block truncate ${index === selectedIndex ? 'font-medium' : 'font-normal'}`}>
                    {item}
                  </span>
                  {query === item && (
                    <span
                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                        index === selectedIndex ? 'text-white' : 'text-teal-600'
                      }`}
                    >
                      <Search className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  )
}


import React, { useEffect, useState } from 'react'
import axios from 'axios'


const LocationSearchPanel = ({
  setVehiclePanel,
  setPanelOpen,
  searchInput,
  setPickupLocation,
  setDestinationLocation,
  searchType,
  findTrip
}) => {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      // Don't fetch if input is less than 3 characters
      if (!searchInput || searchInput.length < 3) {
        setSuggestions([])
        return
      }

      setLoading(true)
      setSuggestions([])
      setError(null)

      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Authentication token not found')
        }

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/suggestions`, {
          params: { input: searchInput },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

       
        

        if (response) {
          setSuggestions(response.data)
        } else {
          throw new Error('Invalid response format')
        }
      } catch (err) {
        console.error('Error fetching suggestions:', err)
        setError(err.response?.data?.error || 'Failed to fetch suggestions')
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    // Debounce API calls with 500ms delay
    const debounceTimer = setTimeout(fetchSuggestions, 500)
    return () => clearTimeout(debounceTimer)
  }, [searchInput])

  const handleLocationSelect = async (suggestion) => {
    try {
      if (!suggestion?.description) {
        throw new Error('Invalid location selected')
      }

      // Update the appropriate location based on searchType
      if (searchType === 'pickup') {
        setPickupLocation(suggestion.description)
      } else {
        setDestinationLocation(suggestion.description)
      }

      // Clear suggestions and close panel
      setSuggestions([])
     

    } catch (err) {
      console.error('Error selecting location:', err)
      setError('Failed to select location')
    }
  }

  return (
    <>
    
    <button 
    onClick={findTrip}
    className='bg-black text-white w-full py-3 rounded-lg  '>
      find trip
    </button>
    <div className="bg-white rounded-lg shadow-lg">
      {loading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && (
        <div className="p-4 text-red-500 text-center">
          {error}
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.place_id}
            onClick={() => handleLocationSelect(suggestion)}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="bg-gray-100 p-2 rounded-full">
              <i className="ri-map-pin-line text-gray-600"></i>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{suggestion.description}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* {!loading && !error && (
        <div className="p-4 text-center text-gray-500">
          No suggestions found
        </div>
      )} */}
    </div>
    </>
  )
}

export default LocationSearchPanel
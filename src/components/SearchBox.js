import React from 'react'
import PropTypes from 'prop-types'
import ChevronIcon from './../assets/icons/chevron.svg'
import SearchIcon from './../assets/icons/search.svg'

const SearchBox = ({ searchTerm, filter, onSearchChange, onFilterChange }) => (
  <div className="flex flex-row my-4 rounded mx-auto w-full md:w-3/4 max-w-4xl focus:shadow-outline shadow-lg bg-white">
    <div className="flex flex-1 hover:bg-gray-200">
      <img
        className="mx-2"
        width="32px"
        height="32px"
        src={SearchIcon}
        alt="search-button"
      />
      <input
        value={searchTerm}
        onChange={onSearchChange}
        className="flex-1 h-16 pl-3 bg-transparent focus:outline-none text-xl"
        type="search"
        placeholder="Sök..."
      />
    </div>
    <div className="w-64 flex-row hover:bg-gray-200 cursor-pointer relative h-16 text-left">
      <select
        onChange={onFilterChange}
        value={filter}
        name="pod-category"
        id="pod-category"
        className="h-16 px-3 bg-transparent text-xl appearance-none cursor-pointer w-full"
      >
        <option value="all">Alla</option>
        <option value="campaign">Kampanj</option>
        <option value="oneShot">Oneshot</option>
      </select>
      <img
        src={ChevronIcon}
        alt="chevron-icon"
        className="my-auto mx-4 w-8 h-8 absolute right-0 inset-y-0 pointer-events-none"
      />
    </div>
  </div>
)

SearchBox.defaultProps = {
  searchTerm: '',
  filter: 'all',
}

SearchBox.propTypes = {
  searchTerm: PropTypes.string,
  filter: PropTypes.string,
  onSearchChange: PropTypes.func,
  onFilterChange: PropTypes.func,
}

export default SearchBox

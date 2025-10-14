import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

export default function Filter({ onFilterChange }) {
  const [search, setSearch] = useState('')
  const [yearRange, setYearRange] = useState('all')
  const [sort, setSort] = useState('none')

  const emit = (next) => {
    const payload = {
      search,
      yearRange,
      sort,
      ...next
    }
    onFilterChange(payload)
  }

  return (
    <Card className="p-3 mb-4">
      <h5>Filter & Sort</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => {
              const v = e.target.value
              setSearch(v)
              emit({ search: v })
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Filter by Year</Form.Label>
          <Form.Select
            value={yearRange}
            onChange={(e) => {
              const v = e.target.value
              setYearRange(v)
              emit({ yearRange: v })
            }}
          >
            <option value="all">All</option>
            <option value="<=2000">Before 2000</option>
            <option value="2001-2015">2001–2015</option>
            <option value=">2015">After 2015</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Sorting</Form.Label>
          <Form.Select
            value={sort}
            onChange={(e) => {
              const v = e.target.value
              setSort(v)
              emit({ sort: v })
            }}
          >
            <option value="none">None</option>
            <option value="year-asc">Year ↑</option>
            <option value="year-desc">Year ↓</option>
            <option value="title-asc">Title A→Z</option>
            <option value="title-desc">Title Z→A</option>
            <option value="duration-asc">Duration ↑</option>
            <option value="duration-desc">Duration ↓</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </Card>
  )
}

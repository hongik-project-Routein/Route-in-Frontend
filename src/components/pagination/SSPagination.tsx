import React from 'react'
import Pagination from 'react-js-pagination'
import '../../styles/pagination.css'

interface SSPaginationProps {
  page: number
  pageSize: number
  count: number
  setPage: (page: number) => void
}

// Server Side Pagination
function SSPagination(props: SSPaginationProps): JSX.Element {
  const { page, pageSize, count, setPage } = props
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={pageSize}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={'<'}
      nextPageText={'>'}
      linkClassFirst="first-button"
      linkClassPrev="prev-button"
      linkClassNext="next-button"
      linkClassLast="last-button"
      onChange={setPage}
    />
  )
}

export default SSPagination

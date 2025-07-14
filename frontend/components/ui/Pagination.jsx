"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import "../../styles/Pagination.css"

export function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div className="pagination">
      <div className="pagination-info">
        Mostrando {startItem} a {endItem} de {totalItems} resultados
      </div>

      <button className="pagination-button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft size={16} />
      </button>

      {getVisiblePages().map((page, index) => (
        <span key={index}>
          {page === "..." ? (
            <span className="pagination-ellipsis">...</span>
          ) : (
            <button
              className={`pagination-button ${page === currentPage ? "active" : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )}
        </span>
      ))}

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

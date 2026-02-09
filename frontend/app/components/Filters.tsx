"use client"

type PriceRange = "" | "under-100" | "100-500" | "500+"

type Props = {
  search: string
  category: string
  priceRange: PriceRange
  categories: string[]
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onPriceChange: (value: PriceRange) => void
}

export default function Filters({
  search,
  category,
  priceRange,
  categories,
  onSearchChange,
  onCategoryChange,
  onPriceChange,
}: Props) {
  return (
    <div className="
      flex flex-col gap-4
      sm:flex-row sm:items-center sm:justify-between
    ">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        placeholder="Search products..."
        className="
          w-full sm:max-w-xs
          border rounded-md
          px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-black
        "
      />

      {/* Category + Price */}
      <div className="flex gap-3">
        <select
          value={category}
          onChange={e => onCategoryChange(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={priceRange}
          onChange={e => onPriceChange(e.target.value as PriceRange)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All Prices</option>
          <option value="under-100">Under 100</option>
          <option value="100-500">100 - 500</option>
          <option value="500+">Over 500</option>
        </select>
      </div>
    </div>
  )
}

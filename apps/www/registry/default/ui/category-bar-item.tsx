import * as React from "react"

interface CategoryBarItemProps {
  value: number
  title: string
  color: string
}

export default function CategoryBarItem({
  value,
  title,
  color,
}: CategoryBarItemProps) {
  return (
    <div
      className="h-full"
      style={{
        width: `${value}%`,
        backgroundColor: color,
      }}
    />
  )
}

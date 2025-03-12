"use client"

import CategoryBar from "@/registry/default/ui/category-bar"
import CategoryBarItem from "@/registry/default/ui/category-bar-item"

export default function CategoryBarDemo() {
  return (
    <div className="flex items-center space-x-2">
      <CategoryBar thickness="m" percentage cumulative legend className="mt-4">
        <CategoryBarItem value={25} title="HTML" color="#E44D26" />
        <CategoryBarItem value={35} title="CSS" color="#1572B6" />
        <CategoryBarItem value={40} title="JavaScript" color="#F7DF1E" />
      </CategoryBar>
    </div>
  )
}

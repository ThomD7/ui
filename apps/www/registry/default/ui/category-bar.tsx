import * as React from "react"

interface CategoryBarProps {
  children: React.ReactElement[]
  thickness?: "s" | "m" | "l"
  percentage?: boolean
  cumulative?: boolean
  legend?: boolean
  className?: string
}

export default function CategoryBar({
  children,
  thickness,
  percentage,
  cumulative,
  legend,
  className,
}: CategoryBarProps) {
  let cumulativeValue = 0
  const markers: number[] = []

  if (children.reduce((acc, child) => acc + child.props.value, 0) > 100) {
    throw new Error("Values should not total more than 100%")
  }

  const sizes = {
    s: { thickness: "h-1" },
    m: { thickness: "h-3" },
    l: { thickness: "h-5" },
  }[thickness || "m"]

  // Compute cumulative or individual marker positions
  React.Children.forEach(children, (child) => {
    if (cumulative) {
      cumulativeValue += child.props.value
      markers.push(cumulativeValue)
    } else {
      markers.push(child.props.value)
    }
  })

  // Reset cumulative for rendering segments
  cumulativeValue = 0

  return (
    <div
      className={`flex flex-col items-center w-full ${className} ${
        percentage ? "mt-10" : ""
      }`}
    >
      {/* Progress Bar */}
      <div
        className={`${sizes.thickness} relative w-full bg-gray-300 rounded-full`}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {React.Children.map(children, (child, index) => {
            const currentValue: number = child.props.value
            cumulativeValue += currentValue
            return (
              <div
                key={child.props.title}
                className={`absolute top-0 left-0 h-full ${
                  index === 0 ? "rounded-l-full" : ""
                } rounded-r-full hover:brightness-90`}
                style={{
                  width: `${cumulativeValue}%`,
                  backgroundColor: child.props.color,
                  zIndex: children.length - index,
                }}
              />
            )
          })}
        </div>

        {/* Percentage Markers */}
        {percentage && (
          <div className="absolute inset-0 pointer-events-none">
            {markers.map((pos, index) => (
              <div
                key={`marker-${index}`}
                className="absolute -top-8 flex flex-col items-center"
                style={{
                  left: `${
                    cumulative
                      ? pos
                      : markers.slice(0, index + 1).reduce((a, b) => a + b, 0)
                  }%`,
                  transform: "translateX(-50%)",
                }}
              >
                <span className="text-xs text-black font-semibold">
                  {cumulative ? pos : markers[index]}%
                </span>
                <div className="w-px h-3 bg-black" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      {legend && (
        <div className="flex gap-4 mt-2">
          {React.Children.map(children, (child) => (
            <div key={child.props.title} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: child.props.color }}
              ></div>
              <span className="text-sm">{child.props.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

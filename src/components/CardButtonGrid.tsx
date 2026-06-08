import { Card } from "./ui/Card";

interface CardButtonGridProps {
  elements: { name: string, enabled: boolean }[];
  onClick: (element: string) => void;
}

export function CardButtonGrid({ elements, onClick }: CardButtonGridProps) {
  // To determine the layout we assume a phone screen layout of roughly 19:9 (in landscape mode)
  const aspectRatio = 19 / 9;
  const rowCount = Math.round(Math.sqrt(elements.length * aspectRatio));
  const itemsPerRow = Math.ceil(elements.length / rowCount);

  return (
    <div className="flex flex-col gap-2 full flex-1 justify-stretch">
      {[...Array(rowCount)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-stretch flex-1">
          {[...Array(itemsPerRow)].map((_, itemIndex) => {
            const elementIndex = rowIndex * itemsPerRow + itemIndex;
            if (elementIndex >= elements.length) return null;
            return (
              <button key={elementIndex} onClick={() => onClick(elements[elementIndex].name)} className="flex-1" disabled={!elements[elementIndex].enabled}>
                <Card className={"flex items-center justify-center h-full " + (elements[elementIndex].enabled ? "bg-blue-300" : "bg-gray-300")}>
                  {elements[elementIndex].name}
                </Card>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  )
}

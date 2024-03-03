export const Item = ({ items, box, onDragItem }) => {

  return (
    <div>
      <div className="cursor-grab border-[#404040] border rounded-lg px-3 py-2 mt-5 bg-[#272627] font-medium w-56"
        onDragStart={() => onDragItem(event, items.id, items.category)}>
        <p draggable className="text-white">{items.name}</p>
      </div>

    </div>

  )
}

export default Item

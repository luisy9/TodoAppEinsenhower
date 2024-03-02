export const Item = ({ items, box, onDragItem }) => {

  return (
    <>
      <div className="cursor-grab border-[#404040] border rounded-lg px-1 py-2 mt-5 bg-[#272627] w-56"
        onDragStart={() => onDragItem(event, items.id, items.category)}>
        <p draggable className="text-white">{items.name}</p>
      </div>
    </>

  )
}

export default Item

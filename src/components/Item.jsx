export const Item = ({items, box, onDragItem}) => {
  return (
    <div className=" cursor-grab border rounded-lg px-1 py-2 mt-5" 
    onDragStart={() => onDragItem(event, items.id, items.category)}>
      <p draggable className="">{items.name}</p>
    </div>
  )
}

export default Item

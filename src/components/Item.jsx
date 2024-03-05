import { motion } from "framer-motion";

export const Item = ({ items, box, onDragItem }) => {

  return (
    <motion.div className="" layout={items.id}>
      <div  className="cursor-grab border-none rounded-lg mt-5 bg-[#272627] font-medium active:cursor-grabbing"
        onDragStart={() => onDragItem(event, items.id, items.category)}>
        <p draggable className="text-white py-5 px-3 border-[#404040] w-56 border rounded-lg">{items.name}</p>
      </div>

    </motion.div>

  )
}

export default Item

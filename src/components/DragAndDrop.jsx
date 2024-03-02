import { useState } from "react"
import { Item } from './';

export const DragAndDrop = () => {
    const [items, setItems] = useState([
        {
            id: 10,
            name: 'Cocinar',
            category: 1
        },
        {
            id: 11,
            name: 'Jugar a Futbol',
            category: 2
        },
        {
            id: 12,
            name: 'Respirar',
            category: 3
        },
        {
            id: 13,
            name: 'Aparcar',
            category: 1
        },
        {
            id: 14,
            name: 'Programar',
            category: 4
        },
    ]);

    const [boxes, setBoxes] = useState([
        {
            id: 1,
            name: 'Blacklog',
            color: 'text-[#727273]'
        },
        {
            id: 2,
            name: 'TODO',
            color: 'text-[#FEF28B]'
        },
        {
            id: 3,
            name: 'In progress',
            color: 'text-[#95CEFF]'
        },
        {
            id: 4,
            name: 'Complete',
            color: 'text-[#6BC7B9]'
        },
        {
            id: 5,
            name: 'delete',
        }
    ])

    const onDragItem = (event, id, category) => {
        event.dataTransfer.setData('itemID', id);
    }

    const draggingOver = (event) => {
        event.preventDefault();
    }

    const onDrop = (event, idBox) => {
        const itemId = event.dataTransfer.getData('itemID');
        setItems(items.map(item => {
            if (itemId == item.id) {
                return { ...item, category: idBox };
            }
            return { ...item };
        }));

        // localStorage.setItem('todos', JSON.stringify(items));
    }


    return (
        <div className="flex gap-20">
            {
                boxes.map(box => {
                    return (
                        <div className="" key={box.id} onDragOver={() => draggingOver(event, box.id)} onDrop={() => onDrop(event, box.id)}>
                            <h1 className={`${box.color} text-2xl pt-5`}>{box.name != 'delete' ? box.name : <div className=""></div>}
                                {items.filter(item => (item.category === box.id)).length >= 0 && box.id != 5 ? items.filter(item => (item.category === box.id)).length : <div className=""></div>}</h1>
                            {
                                items.map(item => item.category === box.id ?
                                    <Item key={item.id} items={item} box={box} onDragItem={onDragItem} /> : <></>)
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DragAndDrop

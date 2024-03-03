import { useEffect, useState } from "react"
import { Item } from './';

export const DragAndDrop = () => {
    const [addTask, setAddTask] = useState([]);
    //Tenemos que diferenciar cual es el ultimo elemento escrito en el textarea
    const [newTask, setNewTask] = useState([]);

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

    // useEffect(() => {
    //     closeTaskClick(addTask);
    // }, [items])

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

    //Habrimos el div para añadir una tarea
    const addTaskClick = (id) => {
        setAddTask(task => [...task, { id: { [id]: true } }]);
    }

    //Close el Div para añadir una tarea
    const closeTaskClick = (id) => {
        console.log(id)
        setAddTask(task => task.filter(t => t.id !== id))
    }

    //Añadimos una tarea al state, y tenemes que diferenciar bien que textarea se tiene que cerrar
    const addTaskState = (id) => {
        const newTaskAdd = newTask;
        setItems(items => [...items, { id: items[items.length - 1].id + 1, name: newTaskAdd, category: id }]);
        const theTaskToClose = addTask.filter(e => e.id !== id)[0].id;
        // closeTaskClick(theTaskToClose);
    }


    return (
        <div className="flex gap-20">
            {
                boxes.map(box => {
                    return (
                        <div className="" key={box.id} onDragOver={() => draggingOver(event, box.id)} onDrop={() => onDrop(event, box.id)}>
                            <h1 className={`${box.color} text-2xl pt-5`}>{box.name != 'delete' ? box.name + ' ' : <div className=""></div>}
                                {items.filter(item => (item.category === box.id)).length >= 0 && box.id != 5 ? items.filter(item => (item.category === box.id)).length : <div className=""></div>}</h1>
                            {
                                items.map(item => item.category === box.id ?
                                    <Item key={item.id} items={item} box={box} onDragItem={onDragItem} /> : <></>)
                            }
                            {box.name != 'delete' ? (
                                <div className="flex justify-start">
                                    <div className="">
                                        <button className="text-gray-500 pt-3 px-2 text-sm font-medium hover:text-white hover:duration-300" onClick={() => addTaskClick(box.id)}>Add card +</button>
                                    </div>
                                </div>

                            ) : <></>}
                            {

                                addTask.map(e => {
                                    if (Object.keys(e.id) == box.id) {
                                        return (
                                            <>
                                                <div className="">
                                                    <textarea onChange={() => setNewTask(event.target.value)} className="w-56 bg-[#322F44] h-20 border rounded-md border-[#A78BFA] 
                                                focus:ring-1 focus:outline-none focus:ring-[#A78BFA] placeholder:text-[#C5A4C9] px-3 py-3" placeholder="Add new task..."></textarea>
                                                    <div className="flex justify-end items-center gap-5 py-1">
                                                        <div className="">
                                                            <button className="text-[#A39E9E] text-sm hover:text-white hover:duration-300" onClick={() => closeTaskClick(e.id)}>Close</button>
                                                        </div>
                                                        <div className="">
                                                            <button className="bg-white px-3 py-1 border-none rounded-md text-sm hover:bg-slate-300" onClick={() => addTaskState(box.id)}>Add +</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DragAndDrop

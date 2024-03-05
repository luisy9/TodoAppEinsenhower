import { useEffect, useState } from "react"
import { Item } from './';


export const DragAndDrop = () => {
    const [addTask, setAddTask] = useState([]);
    //Tenemos que diferenciar cual es el ultimo elemento escrito en el textarea
    const [previusTask, setPreviusTask] = useState([]);
    const [nameTask, setNameTask] = useState([]);
    const [dragg, setDragg] = useState(false);

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
            name: 'Delete',
        }
    ])


    useEffect(() => {
        
    }, [addTask])

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
        setAddTask(task => [...task, { id: { [id]: 'hidden' } }]);
    }

    //Close el Div para añadir una tarea
    const closeTaskClick = (id) => {
        //Si Object.keys(id)[0] recibe undefined si utilizara el id;
        const idBox = Object.keys(id)[0] | id;
        setAddTask(addTask.filter(t => Object.keys(t.id)[0] !== idBox));
        resetInputTask(idBox);
    }

    const resetInputTask = (idBox) => {
        setNameTask({ ...nameTask, [idBox]: { idBox, text: '' } });
    }

    //Añadimos una tarea al state, y tenemes que diferenciar bien que textarea se tiene que cerrar
    const addTaskState = (event, id) => {
        event.preventDefault();
        const previusTasks = nameTask[id]?.text;
        const itemToClose = nameTask[id]?.boxId;
        setItems(items => {
            if (nameTask[id].text.length > 0) {
                return [...items, {
                    id: items.sort((e, a) => a.id - e.id)[0].id + 1, name: previusTasks, category: id
                }].sort((a, b) => a.id - b.id)
            }
        })

        closeTaskClick(itemToClose);
    }

    const onChangeValuesTextArea = (event, boxId) => {
        event.preventDefault();
        /* No se añade uno nuevo porque lo que pasa es que en el 
        boxId es como que mira que no haya un [boxId] con el mismo boxId y por eso se modifica si se cumple este caso */
        setNameTask({ ...nameTask, [boxId]: { boxId, text: event.target.value } });
    }

    const handleDragOver = () => {
        setDragg(true);
    }

    const handleDragLeave = () => {
        setDragg(false);
    }


    return (
        <div className="flex gap-20">
            {
                boxes.map(box => {
                    return (
                        <div className="" key={box.id} onDragOver={() => draggingOver(event, box.id)} onDrop={() => onDrop(event, box.id)}>
                            <div className="">
                                <h1 className={`${box.color} text-2xl pt-5 `}>{box.name != 'Delete' ? box.name + ' ' : <div className=""></div>}
                                    {items.filter(item => (item.category === box.id)).length >= 0 && box.id != 5 ? items.filter(item => (item.category === box.id)).length : <></>}</h1>

                                {
                                    items.map(item => (item.category === box.id && item.category !== 5) ?
                                        <>
                                            <div className="">
                                                <Item key={item.id} items={item} box={box} onDragItem={onDragItem} />
                                            </div>
                                        </>
                                        : <></>)
                                }
                                {box.name != 'Delete' ? (
                                    <div className="flex justify-start ">
                                        <div className="">
                                            <button className={`text-gray-500 pt-3 px-2 text-sm font-medium hover:text-white hover:duration-300 
                                        ${addTask.filter(e => Object.keys(e.id) == box.id).map(item => Object.values(item.id))}`} onClick={() => addTaskClick(box.id)}>Add card +</button>
                                        </div>
                                    </div>

                                ) : <div className="">
                                    <div className="flex justify-center w-60 h-60 items-center" onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                                        <div className={`${dragg ? `bg-[#2F1618] border-red-500` : `bg-[#272627]`} w-60 h-60 bg-[#272627] border border-[#404040] rounded-md flex justify-center items-center`}>
                                            {
                                                dragg === false ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" className="stroke-[#404040]"><path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z" /></svg> :
                                                    <svg fill="#000000" height="50px" width="50px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                                        viewBox="0 0 611.999 611.999" xml:space="preserve" className="fill-red-500 animate-bounce">
                                                        <g>
                                                            <path d="M216.02,611.195c5.978,3.178,12.284-3.704,8.624-9.4c-19.866-30.919-38.678-82.947-8.706-149.952
                                                   c49.982-111.737,80.396-169.609,80.396-169.609s16.177,67.536,60.029,127.585c42.205,57.793,65.306,130.478,28.064,191.029
                                                   c-3.495,5.683,2.668,12.388,8.607,9.349c46.1-23.582,97.806-70.885,103.64-165.017c2.151-28.764-1.075-69.034-17.206-119.851
                                                   c-20.741-64.406-46.239-94.459-60.992-107.365c-4.413-3.861-11.276-0.439-10.914,5.413c4.299,69.494-21.845,87.129-36.726,47.386
                                                   c-5.943-15.874-9.409-43.33-9.409-76.766c0-55.665-16.15-112.967-51.755-159.531c-9.259-12.109-20.093-23.424-32.523-33.073
                                                   c-4.5-3.494-11.023,0.018-10.611,5.7c2.734,37.736,0.257,145.885-94.624,275.089c-86.029,119.851-52.693,211.896-40.864,236.826
                                                   C153.666,566.767,185.212,594.814,216.02,611.195z"/>
                                                        </g>
                                                    </svg>
                                            }

                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                            {
                                addTask.map(e => {
                                    if (Object.keys(e.id) == box.id) {
                                        return (
                                            <>
                                                <div className="pt-2">
                                                    <form onSubmit={() => addTaskState(event, box.id)}>
                                                        <textarea value={nameTask[box.id]?.text || ''}
                                                            onChange={(event) => onChangeValuesTextArea(event, box.id)}
                                                            className="w-56 bg-[#322F44] h-20 border rounded-md border-[#A78BFA] 
                                                focus:ring-1 focus:outline-none text-white focus:ring-[#A78BFA] placeholder:text-[#C5A4C9] px-3 py-3" placeholder="Add new task..."></textarea>

                                                        <div className="flex justify-end items-center gap-5 py-1">
                                                            <div className="">
                                                                <button className="text-[#A39E9E] text-sm hover:text-white hover:duration-300" onClick={() => closeTaskClick(e.id)}>Close</button>
                                                            </div>
                                                            <div className="">
                                                                <button type="submit" className="bg-white px-3 py-1 border-none rounded-md text-sm hover:bg-slate-300">Add +</button>
                                                            </div>
                                                        </div>
                                                    </form>

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

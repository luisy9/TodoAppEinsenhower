// import { DragDrop } from './DragDrop';
import { DATA, TODOS } from '../data/DATA';
import { DndContext } from '@dnd-kit/core';
import { Droppable, Draggable } from '../hooks';
import { useState } from 'react';

export const StatesTodos = () => {

    const [isDropped, setIsDropped] = useState(false);

    function handleDragEnd(event) {
        if (event.over && event.over.id === 'droppable') {
            setIsDropped(true);
        }
    }

    return (
        <div className='px-16 py-10'>
            <div className='flex gap-20'>
                <DndContext onDragEnd={handleDragEnd}>
                    {/* {!isDropped ? draggableMarkup : null} */}
                    <div className=''>
                        <Droppable>
                            {
                                DATA.map((names) => {
                                    return (
                                        <div className='rounded-lg w-full h-full' key={names.id}>
                                            <p className={`text-3xl pb-5 ${names.color}`}>{names.name}</p>
                                            <div className="" key={names.id}>
                                                {!isDropped ? (
                                                    TODOS.filter((todo) => todo.category === names.id).map(t => (
                                                        <Draggable key={t.id}>{t.name}</Draggable>
                                                    ))
                                                ) : null}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/* {isDropped ? draggableMarkup : 'Drop here'} */}
                        </Droppable>
                    </div>

                </DndContext>
            </div>

        </div>
    )
}

export default StatesTodos

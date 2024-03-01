import { useState } from 'react';
import { Draggable, Droppable } from '../hooks'
import { DndContext } from '@dnd-kit/core';

export const DragDrop = () => {

    const [isDropped, setIsDropped] = useState(false);

    function handleDragEnd(event) {
        if (event.over && event.over.id === 'droppable') {
            setIsDropped(true);
        }
    }

    const draggableMarkup = (
        <>
            <Draggable className=''>Holaaa</Draggable>
        </>

    );

    return (
        <div className='flex gap-20 text-white'>
           
        </div>
    )
}

export default DragDrop

import { useDroppable } from '@dnd-kit/core';

export const Droppable = (props) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };


    return (
        <div ref={setNodeRef} style={style} className='flex w-96 gap-20 h-40'>
            {props.children}
        </div>
    );
}
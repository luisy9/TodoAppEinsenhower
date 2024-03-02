import { useDraggable } from '@dnd-kit/core';

export const Draggable = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;


    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes} className='bg-[#4040403b] border border-[#404040] rounded-lg mb-2 w-60 py-2 text-start px-3 text-white'>
            {props.children}
        </button>
    );
}
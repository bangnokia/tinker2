import { useHotkeys } from 'react-hotkeys-hook';
import { useRef, useEffect } from 'react';

function Panel({ name = 'Untitle', closePanel, children }) {
    useHotkeys('esc', () => closePanel());
    const wrapper = useRef();

    useEffect(() => {
        wrapper.current.focus();
    });

    return (
        <div ref={wrapper}
            className="h-full shadow-xl bg-white bg-opacity-90 rounded-r-md p-5 relative overflow-y-auto focus:outline-none" tabIndex="-1">

            <h1 className="text-cyan-500 text-2xl font-semibold tracking-tight">{name}</h1>

            <div className="mt-5">
                {children}
            </div>

            {/* Close button */}
            <div onClick={closePanel} className="absolute top-6 right-6 cursor-pointer transition hover:text-gray-500">
                <CloseIcon />
            </div>
        </div>
    )
}

function CloseIcon() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )
}

export default Panel;
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
            className="h-full relative top-0 shadow-xl bg-white rounded-r-md p-5 pt-0 overflow-y-auto focus:outline-none" tabIndex="-1">

            <div>
                <div className="fixed top-0 z-20 py-5 bg-white">
                    <div className="flex items-center justify-between space-x-5">
                        {/* Close button */}
                        <button type="button" onClick={closePanel} className="transition hover:text-gray-500">
                            <CloseIcon />
                        </button>

                        <h1 className="text-cyan-500 text-2xl font-semibold tracking-tight">{name}</h1>
                    </div>
                </div>

                <div className="mt-20 z-10">
                    {children}
                </div>

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
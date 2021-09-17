function ActionButton({ type = 'button', className, children, ...otherProps }) {
    const additionClasses = "inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-normal text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " + className

    return (
        <button
            type={type}
            className={additionClasses}
            {...otherProps}
        >{children}</button>
    )
}

export default ActionButton;
function ActionButton({ type = 'button', className, children, ...otherProps }) {
    const additionClasses = "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " + className

    return (
        <button
            type={type}
            className={additionClasses}
            {...otherProps}
        >{children}</button>
    )
}

export default ActionButton;
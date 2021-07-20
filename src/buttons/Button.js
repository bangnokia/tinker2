function Button({ type = 'button', className, children, ...otherProps }) {
    const additionClasses = "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" + className

    return (
        <button
            type={type}
            className={additionClasses}
            {...otherProps}
        >{children}</button>
    )
}

export default Button;
export function ButtonGradient({children, ...props}) {
    return (
        <button type="button"
                {...props}
                className="btn bg-gradient-info w-100 mt-4 mb-0">
            {children}
        </button>
    )
}
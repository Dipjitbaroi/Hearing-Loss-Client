export default function MyErrorInfo({ message }: { message?: string }) {
    return (
        <div className="flex items-center mt-1">
            <svg
                className="mr-1 w-4 h-4 text-danger/80"
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                // height="12px"
                // width="12px"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx={12} cy={12} r={10} />
                <line x1={12} y1={16} x2={12} y2={12} />
                <line x1={12} y1={8} x2="12.01" y2={8} />
            </svg>
            <p className="text-danger/80 mr-2">{message || "This is required!"}</p>
        </div>
    )
}

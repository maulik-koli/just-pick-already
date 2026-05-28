import React from "react"

export const MapLine: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            viewBox="0 0 1000 460"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            {...props}
        >
            <path
                d="M 90 380 Q 180 300, 230 220 T 430 130"
                stroke="#A89A82"
                strokeWidth="2.5"
                strokeDasharray="2 8"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M 430 130 Q 560 180, 620 260 T 780 350"
                stroke="#A89A82"
                strokeWidth="2.5"
                strokeDasharray="2 8"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M 230 220 Q 360 240, 480 270 T 720 200"
                stroke="#A89A82"
                strokeWidth="2.5"
                strokeDasharray="2 8"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M 620 260 Q 700 230, 770 200"
                stroke="#A89A82"
                strokeWidth="2.5"
                strokeDasharray="2 8"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    )
}
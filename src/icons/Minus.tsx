import { IconProps } from "../utils/types";

const Minus: React.FC<IconProps> = ({ size = 24, className = "" }) => {
    const svgSize = `${size}px`;
    return (
        <svg width={svgSize} height={svgSize} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.8125 0C12.1272 0 15.625 3.49778 15.625 7.8125C15.625 12.1272 12.1272 15.625 7.8125 15.625C3.49778 15.625 0 12.1272 0 7.8125C0 3.49778 3.49778 0 7.8125 0ZM4.19238 6.87109C3.6723 6.87109 3.25098 7.29242 3.25098 7.8125C3.25098 8.33257 3.67231 8.75391 4.19238 8.75391H11.8145C12.3344 8.75372 12.7559 8.33246 12.7559 7.8125C12.7559 7.29254 12.3344 6.87128 11.8145 6.87109H4.19238Z" fill="white"/>
        </svg>
    );
};

export default Minus;
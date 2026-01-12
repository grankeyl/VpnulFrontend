import { IconProps } from "../utils/types";

const Done: React.FC<IconProps> = ({ size = 24, className = "" }) => {
    const svgSize = `${size}px`;
    return (
        <svg width={svgSize} height={svgSize} className={className} viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.00098 10.0012L5.64415 15.0613C6.08126 15.547 6.85894 15.4905 7.22139 14.9469L16.5185 1.00122" stroke="white" stroke-width="2.00242" stroke-linecap="round"/>
        </svg>
    );
};

export default Done;
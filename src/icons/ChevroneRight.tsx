import { IconProps } from "../utils/types";

const ChevroneRight: React.FC<IconProps> = ({ size = 24, className = "" }) => {
    const svgSize = `${size}px`;
    return (
        <svg width={svgSize} height={svgSize} viewBox="0 0 20 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.21582 17.7933C8.92806 17.5176 8.92806 17.0706 9.21582 16.795L14.2211 12L9.21582 7.20502C8.92806 6.92935 8.92806 6.48241 9.21582 6.20675C9.50357 5.93108 9.97011 5.93108 10.2579 6.20675L15.7842 11.5009C16.0719 11.7765 16.0719 12.2235 15.7842 12.4991L10.2579 17.7933C9.97011 18.0689 9.50357 18.0689 9.21582 17.7933Z" fill="white"/>
        </svg>
    );
};

export default ChevroneRight;
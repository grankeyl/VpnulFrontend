import { IconProps } from "../utils/types";

const Device: React.FC<IconProps> = ({ size = 24, className = "" }) => {
    const svgSize = `${size}px`;
    return (
        <svg width={svgSize} height={svgSize} className={className} viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8401 9.37131L11.7 7.5625V1.375C11.7 0.617375 11.115 0 10.4 0H2.6C1.88435 0 1.3 0.617375 1.3 1.375V7.5625L0.1599 9.37131C0 9.625 0 9.77144 0 9.96875V10.3125C0 10.6563 0.325 11 0.64935 11H12.3506C12.675 11 13 10.6563 13 10.3125V9.96875C13 9.77144 13 9.625 12.8401 9.37131ZM4.55 9.625L4.94 8.9375H8.06L8.45 9.625H4.55ZM10.4 6.875H2.6V1.375H10.4V6.875Z" fill="#0394FF"/>
        </svg>
    );
};

export default Device;
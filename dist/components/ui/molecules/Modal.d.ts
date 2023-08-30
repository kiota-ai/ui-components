import { FC } from 'react';
interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    showCloseModal?: boolean;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    width?: string;
    height?: string;
    paddingBottom?: string;
    paddingTop?: string;
    px?: string;
    fixedWidth?: boolean;
    closeOnClickOutside?: boolean;
}
export default ModalProps;
export declare const Modal: FC<ModalProps>;
interface ModalSwalProps {
    title: string;
    titleColor?: string;
    text: string;
    textMargin?: string;
    textWidth?: string;
    onClick: () => void;
    img?: string;
    bgColor?: string;
    textColor?: string;
    width?: string;
    widtMovile?: string;
    height?: string;
    heightMovile?: string;
    padding?: string;
    exit?: boolean;
    link?: string | null;
    showIcon?: boolean;
    action?: any;
    actionText?: string;
}
export declare const ModalSwal: FC<ModalSwalProps>;

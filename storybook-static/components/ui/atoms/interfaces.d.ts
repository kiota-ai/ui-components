export type TextAlign = 'center' | 'left' | 'right';
export interface ButtonInterface {
    onClick: () => void;
    type: "button" | "submit" | "reset" | undefined;
    width: string;
    verticalMargin: string;
    vertical: string;
    horizontal: string;
    marginRight: string;
    marginLeft: string;
    bgColor: string;
    textColor: string;
    bgHoverColor: string;
    borderColor: string;
    textColorHover: string;
    icon: string;
    iconComponent: string;
    text: string;
    disabled: boolean;
    textSize: string;
    weight: string;
    shadow: string;
    iconWidth: string;
    textAlign: TextAlign;
    className: string;
}
export interface ClassesOptions {
    textAlign: TextAlign;
    width: string;
    verticalMargin: string;
    marginRight: string;
    marginLeft: string;
    vertical: string;
    horizontal: string;
    textSize: string;
    weight: string;
    textColor: string;
    textColorHover: string;
    bgColor: string;
    bgHoverColor: string;
    borderColor?: string;
    shadow: string;
    className: string;
}

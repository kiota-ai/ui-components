import { FC } from 'react';
export interface Errors {
    password_register?: {
        types?: {
            matches?: string;
            min?: string;
        };
    };
    new_password?: {
        types?: {
            matches?: string;
            min?: string;
        };
    };
}
export interface PasswordRequirementsProps {
    errors: Errors;
}
export declare const PasswordRequirements: FC<PasswordRequirementsProps>;

import { FC } from 'react';
interface Errors {
    password_register?: {
        types?: {
            matches?: string;
            min?: string;
        };
    };
    new_password?: {
        types?: {
            matches?: boolean;
            min?: string;
        };
    };
}
interface PasswordRequirementsProps {
    errors: Errors;
}
export declare const PasswordRequirements: FC<PasswordRequirementsProps>;
export {};

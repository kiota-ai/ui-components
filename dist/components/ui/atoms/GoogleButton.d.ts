import { FC } from 'react';
interface GoogleLoginProps {
    clientId: string;
    onSuccess: () => void;
    onFailure: (error: any) => void;
    cookiePolicy?: 'none' | 'single_host_origin' | 'single_host_origin_with_path';
    text?: string;
    loadingGoogleLogin?: boolean;
    disabled?: boolean;
}
export declare const GoogleButton: FC<GoogleLoginProps>;
export {};

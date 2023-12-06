import { FC } from 'react';
export interface TeammateCardProps {
    teammate: {
        user?: {
            image?: string;
            name: string;
            last_name: string;
            email: string;
        };
        name: string;
        last_name: string;
        email: string;
        invited: string | null;
        activation_date: string | null;
    };
    editTeammate: (teammate: any) => void;
}
export declare const TeammateCard: FC<TeammateCardProps>;

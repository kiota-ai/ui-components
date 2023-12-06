import { FC } from 'react';
export interface SectionHeaderProps {
    sectionTitles?: string[];
    sectionKeys?: string[];
    sortItems?: any[];
    setShowFilters: (show: boolean) => void;
    setShowAdd: (show: boolean) => void;
    setShowUpload: (show: boolean) => void;
    section: string;
    sort: string;
    setSection?: (section: string) => void | null;
    setSort: (sort: string) => void;
    showFilters?: boolean;
    showAdd?: boolean;
    showSort?: boolean;
    showUpload?: boolean;
    className?: string;
}
export declare const SectionHeader: FC<SectionHeaderProps>;

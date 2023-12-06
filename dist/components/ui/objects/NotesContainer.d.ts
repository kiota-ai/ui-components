import { FC } from 'react';
export interface NoteListProps {
    editable: boolean;
    zIndex: string;
    setShowModal: (showModal: boolean) => void;
    notes: any[];
    createNote: any;
    deleteNote: any;
    getNote: any;
    selectedNote: any;
    setSelectedNote: any;
    updateNote: any;
    listTitle: string;
    onClose: () => void;
}
export declare const NotesContainer: FC<NoteListProps>;

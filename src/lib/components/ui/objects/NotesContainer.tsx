/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Voice from '../../../../assets/images/voice_icon.svg'
import Text from '../../../../assets/images/text_icon.svg'
import { BasicCardNotes } from '../molecules/BasicCardNotes'
import { VoiceNotes } from '../../project/components/general-information/components/voice-notes'
import { TextNotes } from '../../project/components/general-information/components/text-notes'
import { DrawNotes } from '../../project/components/general-information/components/draw-notes'
import { SidePanel } from './SidePanel'
import { ButtonSecondary } from '../atoms/ButtonSecondary'

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

export const NotesContainer:FC<NoteListProps> = ({
  editable = true,
  notes,
  createNote,
  deleteNote,
  getNote,
  selectedNote,
  setSelectedNote,
  updateNote,
  listTitle,
  onClose
}) => {
  const { t } = useTranslation()

  const [showVoiceModal, setShowVoiceModal] = useState(false)
  const [showTextModal, setShowTextModal] = useState(false)
  const [showDraweModal, setShowDrawerModal] = useState(false)
  const getNoteWrapper = (id:any) => {
    getNote(id)
  }

  useEffect(() => {
    if (selectedNote) {
      if (selectedNote.type === 'draw') {
        setShowDrawerModal(true)
      } else if (selectedNote.type === 'text') {
        setShowTextModal(true)
      } else if (selectedNote.type === 'audio') {
        setShowVoiceModal(true)
      }
    }
  }, [selectedNote])

  console.log({selectedNote})

  const handleCloseTextModal = () => {
    setShowTextModal(false)
    setSelectedNote(null)
  }

  const handleCloseDrawerModal = () => {
    setShowDrawerModal(false)
    setSelectedNote(null)
  }

  const handleCloseVoiceModal = () => {
    setShowVoiceModal(false)
    setSelectedNote(null)
  }

  return (
    <>
      {showVoiceModal && (
        <VoiceNotes
          showModal={showVoiceModal}
          onSubmit={(title:any, type:any, content:any) => {
            setShowVoiceModal(false)
            createNote(title, type, content)
          }}
          initialValues={selectedNote}
          handleClose={handleCloseVoiceModal}
        />
      )}
      {showTextModal && (
        <TextNotes
          editable={editable}
          showModal={showTextModal}
          onSubmit={(values:any) => {
            setShowTextModal(false)
            if (selectedNote) {
              updateNote(values.title, values.content)
            } else {
              createNote(values.title, 'text', values.content)
            }
          }}
          initialValues={{
            title: selectedNote ? selectedNote.title : '',
            content: selectedNote ? selectedNote.content : ''
          }}
          handleClose={handleCloseTextModal}
        />
      )}
      {showDraweModal && (
        <DrawNotes
          editable={editable}
          showModal={showDraweModal}
          onSubmit={(title:any, content:any) => {
            setShowDrawerModal(false)
            if (selectedNote) {
              updateNote(title, content)
            } else {
              createNote(title, 'draw', content)
            }
          }}
          handleClose={handleCloseDrawerModal}
          initialValues={{
            title: selectedNote ? selectedNote.title : '',
            content: selectedNote ? selectedNote.content : ''
          }}
        />
      )}


      <SidePanel
        onClose={onClose}
        title={t('notes')}
        width='2/3 sm:w-1/2 md:w-1/3 lg:w-1/4'
      >
        <p className={`font-medium mb-6 text-base text-main`}>
          {t('select_type_of_note')}
        </p>
        <div className="my-6">
          {editable && (
            <div className='mb-6'>
              <div>
                <ButtonSecondary
                  width={'full'}
                  onClick={() => setShowTextModal(true)}
                  text={t('add_text_note')}
                  icon={Text}
                />
                <ButtonSecondary
                  marginTop="2"
                  width={'full'}
                  onClick={() => setShowVoiceModal(true)}
                  text={t('add_voice_note')}
                  icon={Voice}
                />
              </div>
            </div>
          )}
          <div className="pb-20 border-t border-gray-lines">
            <p className={`font-medium mt-6 text-base text-main`}>
              {listTitle || t('my_annotations')}
            </p>
            <div>
              {notes.length > 0 && (
                <div className="overflow-auto mt-4">
                  {notes.map((note, index) => {
                    return (
                      <div className='my-4'>
                        <BasicCardNotes
                          key={index}
                          note={note}
                          deleteNote={editable ? deleteNote : null}
                          getNote={getNoteWrapper}
                        />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            {notes.length === 0 && (
              <div className="text-xs text-center my-2">
                <span>
                  {t(editable ? 'no_notes_added' : 'no_notes_added_not_editable')}
                </span>
              </div>
            )}
          </div>
        </div>
      </SidePanel>
    </>
  )
}


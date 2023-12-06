/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Modal } from '../../../../../ui/molecules/Modal'
import useRecorder from '../../../../../ui/atoms/useRecorder'

import RecordIcon from '../../../../../../../assets/images/record.svg'
import StopRecording from '../../../../../../../assets/images/stoprecord.svg'
import Repeat from '../../../../../../../assets/images/repeatrecord.svg'

import { Input } from '../../../../../ui/atoms/Input'
import { ButtonMain } from '../../../../../ui/atoms/ButtonMain';

interface VoiceNotesProps {
  showModal: any;
  onSubmit: any;
  handleClose: any;
  initialValues: any;
}

export const VoiceNotes:FC<VoiceNotesProps> = ({ showModal, onSubmit, handleClose, initialValues }) => {
  const { t } = useTranslation()
  const [audioURL, isRecording, startRecording, stopRecording]:any = useRecorder()

  const [title, setTitle]:any = useState(initialValues ? initialValues.title : '')
  const [errorTitle, setErrorTitle]:any = useState(null)

  return (
    <>
      <Modal showModal={showModal} showCloseModal={true} onClose={handleClose} paddingBottom="4">
        <h3 className={`font-medium mr-4 text-main my-4`}>
          {initialValues ? t('voice_note') : t('add_voice_note')}
        </h3>
        <div>
          <div className="w-full flex justify-center my-6">
            {!isRecording && !audioURL && !initialValues && (
              <div className="flex flex-col justify-center items-center">
                <button onClick={startRecording} disabled={isRecording}>
                  <img src={RecordIcon} alt="Recor icon" className="w-28" />
                </button>
                <span>{t('start_recording')}</span>
              </div>
            )}
            {isRecording && (
              <div className="flex flex-col justify-center items-center">
                <button onClick={stopRecording} disabled={!isRecording}>
                  <img
                    src={StopRecording}
                    alt="Recor icon"
                    className="w-28 animate-pulse"
                  />
                </button>
                <span className=" animate-pulse">{t('recording')}</span>
              </div>
            )}
            {!isRecording && audioURL && (
              <button onClick={stopRecording} disabled={!isRecording}>
                <img src={Repeat} alt="Recor icon" className="w-28" />
              </button>
            )}
          </div>
          {(audioURL || initialValues) && (
            <>
              <div>
                <Input
                  reference={initialValues}
                  disabled={initialValues}
                  error={errorTitle}
                  value={title}
                  id="title"
                  type="text"
                  name="title"
                  label={t('title_note')}
                  maxLength={30}
                  onChange={(e) => {
                    if (e.target.value) {
                      setErrorTitle(null)
                    } else {
                      setErrorTitle({ message: t('required_field') })
                    }
                    setTitle(e.target.value)
                  }}
                />
              </div>
              <div className="flex justify-center my-6">
                <audio
                  src={initialValues ? initialValues.content : audioURL}
                  controls
                />
              </div>

              {!initialValues && (
          <div className={`flex justify-end mt-4 border-t pt-2 border-separator`}>
                  <ButtonMain
                      text={t('save')}
                    onClick={() => {
                      if (!title) {
                        setErrorTitle({ message: t('required_field') })
                      } else {
                        setErrorTitle(null)
                        onSubmit(title, 'audio', audioURL)
                      }
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  )
}


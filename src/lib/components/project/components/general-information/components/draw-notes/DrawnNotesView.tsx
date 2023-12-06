/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '../../../../../ui/molecules/Modal'

import { CanvaTestTwo } from '../../../../../ui/atoms/CanvaTestTwo'
import { useToasts } from 'react-toast-notifications'

import { Input } from '../../../../../ui/atoms/Input'
import { isEmpty } from 'lodash'

import { ButtonMain } from '../../../../../ui/atoms/ButtonMain'

interface DrawNotesProps {
  showModal:any,
  handleClose:any,
  onSubmit:any,
  initialValues:any,
  editable:any
}

export const DrawNotes:FC<DrawNotesProps> = ({
  showModal,
  handleClose,
  onSubmit,
  initialValues,
  editable
}) => {
  const { t } = useTranslation()

  const canvasRef:any = useRef(null)
  const input = useRef(null)
  const { addToast } = useToasts()

  const [title, setTitle] = useState(
    isEmpty(initialValues) ? '' : initialValues.title
  )

  const [errorTitle, setErrorTitle]:any = useState(null)

  return (
    <>
      <Modal
        showModal={showModal}
        showCloseModal={true}
        onClose={handleClose}
        paddingBottom="4"
      >
        <h3 className={`font-medium mr-4 text-main`}>{t('add_draw_note')}</h3>

        <Input
          reference={input}
          disabled={!editable}
          value={title}
          id="title"
          type="text"
          name="title"
          placeholder={t('introduce_note_title')}
          label={`${t('note_title')} :`}
          error={errorTitle}
          onChange={(e) => {
            if (e.target.value) {
              setErrorTitle(null)
            } else {
              setErrorTitle({ message: t('required_field') })
            }
            setTitle(e.target.value)
          }}
        />

        <div className="w-full">
          <CanvaTestTwo
            canvasRef={canvasRef}
            content={initialValues.content}
          />
        </div>

        {editable && (
          <div className={`flex justify-end mt-4 border-t pt-2 border-separator`}>
            <ButtonMain
              onClick={() => {
                if (!title) {
                  setErrorTitle({ message: t('required_field') })
                } else {
                  setErrorTitle(null)
                  canvasRef.current
                    .exportPaths()
                    .then((data:any) => {
                      onSubmit(title, JSON.stringify(data))
                    })
                    .catch(() => {
                      addToast(t('error_occurred_exporting_draw_note'), {
                        appearance: 'error',
                        autoDismiss: true
                      })
                    })
                }
              }}
              text={t('save')}
            />
          </div>
        )}
      </Modal>
    </>
  )
}

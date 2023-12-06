import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '../../../../../../../ui/molecules/Modal'
import Cross from 'styles/images/cross_gray.svg'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Input } from 'components/ui/atoms/Input'
import { CanvaTestTwo } from 'components/ui/atoms/CanvaTestTwo'

const DrawnotesForm = ({ note_title, showModal, onSubmit }) => {
  const { t } = useTranslation()

  const DrawNoteSchema = Yup.object().shape({
    note_title: Yup.string().required(t('required_field'))
  })

  const { register, handleSubmit, errors, setValue } = useForm({
    criteriaMode: 'all',
    reValidateMode: 'all',
    mode: 'onChange',
    resolver: yupResolver(DrawNoteSchema)
  })

  useEffect(() => {
    setValue('Title', note_title)
  }, [note_title])

  return (
    <>
      <Modal
        showModal={showModal}
        showCloseModal={true}
        paddingTop="6" paddingBottom="0"
      >
        <h2 className="font-semibold mr-4">{t('add_draw_note')}</h2>

        <form className="w-full mt-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            reference={register}
            id="note_title"
            type="text"
            name="note_title"
            placeholder={t('introduce_note_title')}
            label={t('note_title') + ':'}
            error={errors.note_title}
          />
        </form>

        <div className="w-full my-2">
          <CanvaTestTwo onSubmit={onSubmit} />
        </div>
      </Modal>
    </>
  )
}

export default DrawnotesForm

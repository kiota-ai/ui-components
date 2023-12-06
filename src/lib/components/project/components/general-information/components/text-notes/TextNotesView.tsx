/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '../../../../../ui/molecules/Modal'

import { RichEditor } from '../../../../../ui/objects/RichEditor'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Input } from '../../../../../ui/atoms/Input'
import { isEmpty } from 'lodash'
import { ButtonMain } from '../../../../../ui/atoms/ButtonMain'

interface TextNotesProps {
  showModal: any;
  handleClose: any;
  onSubmit: any;
  initialValues: any;
  editable: any;
}


export const TextNotes:FC<TextNotesProps> = ({
  showModal,
  handleClose,
  onSubmit,
  initialValues,
  editable
}) => {
  //console.log(initialValues)
  const { t } = useTranslation()

  const TextNoteSchema = Yup.object().shape({
    title: Yup.string().required(t('required_field')),
    content: Yup.string().required(t('required_field')),
  })

  
  const { register, handleSubmit, formState:{errors}, setValue, getValues, trigger }:any = useForm({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(TextNoteSchema)
  })

  const [watchContent,setWatchContent]:any = useState()

  const _setValue = (name:any, value:any) => {
    setValue(name, value, { shouldValidate: true })
    trigger(name)
  }

  useEffect(() => {
    register('content')
  }, [])

  useEffect(() => {
    if (!isEmpty(initialValues)) {
      setValue('title', initialValues.title)
      setValue('content', initialValues.content || '')
    }
    setWatchContent(true)
  }, [initialValues])



  return (
    <>
      <Modal
        showModal={showModal}
        showCloseModal={true}
        onClose={handleClose}
        paddingTop="6"
        paddingBottom="4"
      >
        <h3 className={`font-medium mr-4 text-main`}>{t('add_text_note')}</h3>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6">
            <Input
              disabled={!editable}
              reference={register('title')}
              id="title"
              type="text"
              name="title"
              placeholder={t('introduce_note_title')}
              label={t('note_title') + ':'}
              error={errors.title}
            />
          </div>
          <div className="mt-6">
            {watchContent && <RichEditor
              id={'content'}
              reference={register('content')}
              name='content'
              label={t('note_content') + ':'}
              placeholder={`${t('write_note')}`}
              onChange={(value:any) => _setValue('content', value === '<p><br></p>' ? '' : value)}
              toolbarClassName="content"
              value={getValues().content || ''}
              error={errors.content}
            />}
          </div>
          {editable && (
          <div className={`flex justify-end mt-4 border-t pt-2 border-separator`}>
              <ButtonMain
                type="submit"
                text={t('save')}
              />
            </div>
          )}
        </form>
      </Modal>
    </>
  )
}



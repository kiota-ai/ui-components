/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment'
import { FaCalendar, FaEye, FaTrash, FaUser } from 'react-icons/fa'
import { TbWriting } from 'react-icons/tb'
import { MdKeyboardVoice,MdTextFields } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

import { ButtonDanger } from '../atoms/ButtonDanger';
import { ButtonCardMain } from '../atoms/ButtonCardMain';
import { Card } from '../atoms/Card';
import { FC } from 'react';

export interface BasicCardNotesProps {
  deleteNote:any;
  note:any;
  getNote:any;
}

export const BasicCardNotes:FC<BasicCardNotesProps> = ({ deleteNote, note, getNote }) => {
  const { t } = useTranslation()
  return (
    <Card title=''>
        <div className="flex flex-col justify-between items-between p-2">
          <div className="text-left leading-none flex flex-col justify-center items-start h-full px-1">
            <div className="text-lg h-auto break-all mb-1">
              {note.type === 'audio' && (
                <MdKeyboardVoice className={`inline mb-1 text-lg text-main mr-1`} />
              )}
              {note.type === 'text' && (
                <MdTextFields className={`inline mb-1 text-lg text-main mr-1`} />
              )}
              {note.type === 'draw' && (
                <TbWriting className={`inline mb-1 text-lg text-main mr-1`} />
              )}
              {note.title}
            </div>
          </div>
          {note.type === 'text' && note.content.length > 2 && (
            <div
              className='text-sm ml-1 mb-2 line-clamp-2 w-full'
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
          )}
          <div className="flex w-full justify-between items-center border-t border-gray-lines px-1 pt-1">
            <span className="text-xxxs text-gray">
              <FaCalendar className="inline-block mr-1" />
              {moment(note.createdAt).format('YYYY-MM-DD')}
            </span>
          </div>
          <div className="flex w-full border-t border-gray-lines px-1 pt-1">
            <span className="text-xxxs text-gray">
              <FaUser className="inline-block mr-1" />
              {note.user?.name || note?.shared_deal_person_name || t('no_data')}
            </span>
          </div>
          <div className={`flex justify-end border-t border-separator pt-2 mt-4`}>
            {deleteNote && <ButtonDanger
            type="button"
            onClick={() => deleteNote(note._id)}
            iconComponent={<FaTrash className="inline-block w-5 h-4 mr-1" />}
            marginRight="2"
            text={t('delete')}
            />}
            <ButtonCardMain
              type="button"
              text={t('see')}
              onClick={() => getNote(note._id)}
              iconComponent={<FaEye className="inline-block w-5 h-4 mr-1" />}
            />
          </div>
        </div>
    </Card>
  )
}

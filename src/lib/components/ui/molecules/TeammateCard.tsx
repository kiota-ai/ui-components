/* eslint-disable @typescript-eslint/no-explicit-any */
import Person from '../../../../assets/images/person.png'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { ButtonCardMain } from '../atoms/ButtonCardMain'
import { Card } from '../atoms/Card'
import { FC } from 'react'

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

export const TeammateCard: FC<TeammateCardProps> = (props)  => {
  const { t } = useTranslation()

  return (
    <Card title="">
      <div className="flex flex-col w-full pr-4">
        <div className="text-xs flex">
          <div>
            <img
              src={
                props.teammate.user
                  ? props.teammate.user.image
                    ? props.teammate.user.image
                    : Person
                  : Person
              }
              alt={`${props.teammate.name} ${props.teammate.last_name}`}
              className={'w-16 h-16 mx-1 object-contain | rounded-full | flex justify-center items-center'}
            />
          </div>

          <div className={'flex flex-col ml-4'}>
            <div className="text-xs  mt-2 font-semibold text-left px-2">
              {props.teammate.user
                ? `${props.teammate.user.name} ${props.teammate.user.last_name}`
                : `${props.teammate.name} ${props.teammate.last_name}`}
            </div>
            <div className="text-xs  mt-2 text-left px-2">
              {props.teammate.user
                ? props.teammate.user.email
                : props.teammate.email}
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4 px-2">
                <div>
                  <div className="w-full text-xs font-semibold mt-4">
                    {t('invited')}
                  </div>
                  <div className="w-full text-xs">
                    {props.teammate.invited
                      ? moment(props.teammate.invited).format(
                        'YYYY-MM-DD HH:MM'
                      )
                      : '-'}
                  </div>
                </div>
                <div>
                  <div className="w-full  text-xs font-semibold mt-4">
                    {t('registered')}
                  </div>
                  <div className="w-fulltext-xs">
                    {props.teammate.activation_date
                      ? moment(props.teammate.activation_date).format(
                        'YYYY-MM-DD HH:MM'
                      )
                      : '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`flex justify-end mt-2 pt-2 border-t border-separator`}>
        <ButtonCardMain
          type="button"
          text={t('see_details')}
          onClick={() => props.editTeammate(props.teammate)}
        />
      </div>
    </Card>
  )
}

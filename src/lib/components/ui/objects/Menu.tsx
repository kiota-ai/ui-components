/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next'
import { UiList } from './UiList'
import { FC } from 'react'

interface MenuProps {
  sections: any[],
  onClick: any;
  activePath: any;
  logoUrl: string;
  logoAltUrl:string
}
 
export const Menu:FC<MenuProps> = ({sections,onClick, activePath,logoUrl,logoAltUrl}) => {
  const { t } = useTranslation()

  const logo = logoUrl ? logoUrl : 'https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg'
  const logoAlt = logoAltUrl ? logoAltUrl : 'https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg'
  const onItemClick = (item:any) => {
    onClick(item.url)
  }

  const activeLink = (route:any) => {
    if (activePath === route) {
      return true;
    }

    // Verificar si el path comienza con una ruta y tiene hijos anidados
    if (activePath.startsWith(route + '/')) {
      return true;
    }
  }

  const getMenuItems = () => {

    return sections.map((item, index) => {
      return (
        <div id={`sidebar-menu-item-${index + 1}`} key={index} className="flex justify-center text-right w-full">
          <div
            onClick={() => onItemClick(item)}
            className={`flex items-center w-full  
              h-9 my-2 ml-6 lg:ml-2 px-2 
              rounded-l-2xl cursor-pointer text-center 
              hover:bg-white hover:text-main hover:shadow-none ${activeLink(item.url) ? 'bg-white text-main' : 'text-white'}
              `}
          >
            <div className="w-8 flex justify-between text-center">
              {item.icon}
            </div>

            <div className="text-sm font-medium hidden lg:block">{t(item.title)}</div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className={`fixed top-0 bg-main h-screen w-20 lg:w-52 z-20`}>
      <div className="menu-logo-container">
        <div className="mt-4 px-4 flex justify-center items-center hidden lg:flex">
          <img src={logo} alt="Kiota Logo" className="object-cover w-full h-full" />
        </div>
        <div className="h-12 mt-2 px-2 flex justify-center items-center block lg:hidden">
          <img src={logoAlt} alt="kiota" className="object-cover w-full h-full" />
        </div>
      </div>
      <UiList className="mt-4 lg:mt-8">{getMenuItems()}</UiList>
      <div className="mt-8 fixed bottom-3 w-20 lg:w-52">
        <div className="text-xxs lg:text-xxs px-4 text-center text-white">
          {t('powered_by_kiota')}
        </div>
      </div>
    </div>
  )
}


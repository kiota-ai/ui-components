/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next'
import { UiList } from './UiList'
import { FC } from 'react'
import { TiTimes } from 'react-icons/ti'
import { TbLogout } from 'react-icons/tb';
export interface MenuProps {
  sections: any[],
  onClick: any;
  onClickOpenMenu?:any;
  activePath: any;
  logoUrl: string;
  logoAltUrl:string
  activeMenu?: boolean;
}
 
export const Menu:FC<MenuProps> = ({sections,onClick, activePath,logoUrl,logoAltUrl,activeMenu,onClickOpenMenu}) => {
  const { t } = useTranslation()

  const logo = logoUrl ? logoUrl : 'https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg'
  const logoAlt = logoAltUrl ? logoAltUrl : 'https://prod-platforms-resources.s3.eu-west-1.amazonaws.com/65135f4568465b647b01a9e2/f5cb8211-934c-44c2-aed8-e507e6ceec56.png'
  
  const onItemClick = (item:any) => {
    onClick(item.url)
  }

  const activeLink = (route:any) => {
    const currentSegments = route.split('/');
    const compareSegments = activePath.split('/');

    // Verifica que ambos caminos tengan al menos un segmento
    if (currentSegments.length < 2 || compareSegments.length < 2) {
      return false;
    }

    if (activePath === route) {
      return true;
    }

    // Verificar si el path comienza con una ruta y tiene hijos anidados
    if (activePath.startsWith(route + '/')) {
      return true;
    }
    
    // Compara el segundo segmento de ambos caminos
    return currentSegments[1] === compareSegments[1];
  }

  const handleLogout = () => {
    localStorage.clear()
    onClick('/')
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
    <div className={`fixed top-0 bg-main h-screen w-20 lg:w-52 z-20 ${activeMenu ? 'block' : 'hidden sm:block'}`}>
      <div className="menu-logo-container">
        <div className="mt-4 px-4 flex justify-center items-center hidden lg:flex">
          <img src={logo} alt="Kiota Logo" className="object-cover w-full h-full" />
        </div>
        <div className='h-12 mt-5 p-2 flex justify-center items-center block sm:hidden'>
          <TiTimes onClick={() => onClickOpenMenu ? onClickOpenMenu(): {}} className='cursor-pointer w-8 h-8 text-white'></TiTimes>
        </div>
        <div className="h-12 mt-5 p-2 flex justify-center items-center hidden sm:flex lg:hidden">
          <img src={logoAlt} alt="kiota" className="object-cover w-full" />
        </div>
      </div>
      <div className='h-full-menu flex flex-col justify-between'>
        <UiList className="mt-4 lg:mt-8">{getMenuItems()}</UiList>
        <div className='block sm:hidden  flex items-center w-full h-9 my-2 ml-6 lg:ml-2 px-2 rounded-l-2xl cursor-pointer text-center hover:bg-white hover:text-main hover:shadow-none text-white'>
          <TbLogout onClick={()=>handleLogout()} className='cursor-pointer w-6 h-5'></TbLogout>
        </div>
      </div>

    </div>
  )
}


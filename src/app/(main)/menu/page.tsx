import React from 'react'
import MenuHuongTre from './_components/menu'
import { LINKS } from '~/constants/links'
import http from '~/utils/http'

export default async function MenuPage() {
      const {
       data
      } = await http.get<any>(LINKS.menu, {
        
      })
      console.log(data);
      
  return (
      <div className='min-h-screen'>

        <MenuHuongTre/>
      </div>
  )
}

import React from 'react'
import MenuHuongTre from './_components/menu'
import { LINKS } from '~/constants/links'
import http from '~/utils/http'
import { CategoryResponse } from '#/category'


export default async function MenuPage() {
  const {
    data
  } = await http.get<CategoryResponse[]>(LINKS.menu, {

  })

  return (
    <div className='min-h-screen'>
      <MenuHuongTre data={data as CategoryResponse[]}/>
    </div>
  )
}

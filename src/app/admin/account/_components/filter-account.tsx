import { Button, Input, Select } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
const { Option } = Select
export default function FilterOption() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [status, setStatus] = useState(searchParams.get('status') || '')
  const [active, setActive] = useState(searchParams.get('isActive') || '')
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }
  const handleReset = () => {
    setSearch('')

    setStatus('')
    setActive('')

    router.replace(window.location.pathname)
  }
  return (
    <div className='mb-6 flex flex-wrap items-center gap-3'>
      <Input
        placeholder='Find account...'
        className='!h-10 !w-60 rounded-md shadow-sm'
        allowClear
        value={search}
        onChange={e => setSearch(e.target.value)}
        onPressEnter={() => handleFilterChange('search', search)}
        suffix={
          <SearchOutlined
            className='hover:text-primary cursor-pointer text-gray-400 transition'
            onClick={() => handleFilterChange('search', search)}
          />
        }
      />
      <Select
        placeholder='View permission'
        className='!h-10 !w-48'
        allowClear
        value={status || undefined}
        onChange={value => {
          setStatus(value)
          handleFilterChange('status', value)
        }}
      >
        <Option value='1'>Accepted</Option>
        <Option value='0'>Banned</Option>
      </Select>
      <Select
        placeholder='Choose active'
        className='!h-10 !w-48'
        allowClear
        value={active || undefined}
        onChange={value => {
          setActive(value)
          handleFilterChange('isActive', value)
        }}
      >
        <Option value='1'>Active</Option>
        <Option value='0'>Inactive</Option>
      </Select>
      <Button
        onClick={handleReset}
        className='filter-table flex items-center justify-center'
        icon={<ReloadOutlined />}
        shape='circle'
        title='Reset bộ lọc'
      />
    </div>
  )
}

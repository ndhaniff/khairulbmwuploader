import ProTable, { ProColumns } from '@ant-design/pro-table'
import React from 'react'
import { supabase } from '../../services/supabase'
import Locale from './locale'

export type Media = {
  filename: String,
  url: String,
}

const mediaListDataSource: Media[] = []

const columns: ProColumns<Media> = [
  {
    dataIndex: 'filename',
    title: 'Filename'
  },
  {
    dataIndex: 'url',
    title: 'Url'
  }
]

function MediaList() {
  return (
    <Locale>
      <ProTable<Media>
        columns={columns}
        request={(params, sorter, filter) => {
          console.log(params, sorter, filter)
          return supabase.from('car_medias')
            .select(`
              filename,
              url
            `).order('id', { ascending: false })
        }}
        rowKey="filename"
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={false}
        search={false}
      >

      </ProTable>
    </Locale>
  )
}

export default MediaList

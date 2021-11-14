import MediaList from '@/components/medialist'
import MemberList from '@/components/mediatable'
import ProForm, { ProFormUploadButton } from '@ant-design/pro-form'
import React from 'react'
import { IntlProvider, enUSIntl } from '@ant-design/pro-table'
import { supabase } from '../../services/supabase'
import { message } from 'antd'
import BreadCrumb from '@/components/toobar'

function Media() {
  async function uploadImage({ image }) {
    console.log(image[0])
    const { data, error } = await supabase
      .storage
      .from('cars')
      .upload(
        image[0]['name'],
        image[0]['originFileObj'],
        {
          cacheControl: '3600',
          upsert: false
        })

    if (error) {
      message.error(error.message)
    } else {
      const { publicURL, error } = supabase
        .storage
        .from('cars')
        .getPublicUrl(data.Key)

      const { data: media, error: err } = await supabase
        .from('car_medias')
        .insert({
          filename: image[0]['name'],
          url: publicURL
        })
      if (err) {
        message.error(err.message)
      }
    }
  }

  return (
    <div className="h-screen p-10 space-y-4 bg-gray-50">
      <div className="container p-4 mx-auto bg-white rounded shadow">
        <h1>Media</h1>
        <BreadCrumb />
        <ProForm
          onFinish={(values) => uploadImage(values)}
          submitter={{
            searchConfig: {
              resetText: 'Reset',
              submitText: 'Submit',
            },
          }}
        >
          <ProFormUploadButton
            extra=".jpg .png"
            label="Image"
            name="image"
            title="Upload"
          />
        </ProForm>
      </div>
      <div className="container p-4 mx-auto bg-white rounded shadow">
        <h1>Media List</h1>
        <IntlProvider value={enUSIntl}>
          <MediaList></MediaList>
        </IntlProvider>
      </div>
    </div>
  )
}

export default Media

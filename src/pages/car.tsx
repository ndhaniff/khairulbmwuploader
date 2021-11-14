import React, { useEffect, useState, useRef } from 'react'
import ProForm, { ProFormMoney, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-form'
import { supabase } from '../../services/supabase'
import { message } from 'antd'
import BreadCrumb from '@/components/toobar'

function Car() {
  const [medias, setMedias] = useState([])
  const [pdfs, setPdfs] = useState([])
  const formRef = useRef()

  async function fetchMedias() {

    const { data, error } = await supabase.from('car_medias')
      .select(`
        id,
        filename,
        url
      `)
      .or('filename.like.%png,filename.like.%jpg,filename.like.%jpeg')
      .order('id', { ascending: false })
    if (error) {
      message.error(error.message)
    } else {
      setMedias(data)
    }
  }

  async function fetchPdfs() {
    const { data, error } = await supabase.from('car_medias')
      .select(`
        id,
        filename,
        url
      `).like('filename', '%.pdf').order('id', { ascending: false })
    if (error) {
      message.error(error.message)
    } else {
      setPdfs(data)
    }
  }

  useEffect(() => {
    fetchMedias()
    fetchPdfs()
    return () => setMedias([])
  }, [])

  async function submit(values) {
    const { data, error } = await supabase.from('cars').insert({
      ...values,
      model_brand: 'BMW'
    })

    if (error) {
      message.error(error.message)
    } else {
      message.success('Uploaded')
      formRef.resetFields()
    }
  }

  return (
    <div className="h-screen p-10 bg-gray-50">
      <div className="container p-4 mx-auto bg-white rounded shadow">
        <h1>Add Car</h1>
        <BreadCrumb />
        <ProForm
          formRef={formRef}
          onFinish={submit}
          submitter={{
            searchConfig: {
              resetText: 'Reset',
              submitText: 'Submit',
            },
          }}
          initialValues={{
            model_brand: 'BMW'
          }}>
          <ProForm.Group>
            <ProFormText
              width="lg"
              name="model_name"
              required
              label="Car Model"
              tooltip="Car model name e.g. Proton Wira"
              placeholder="BMW 3 Series"
              rules={[{ required: true, message: '这是必填项' }]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormMoney
              label="Price From"
              width="md"
              name="price_from"
              locale="ms-MY"
              placeholder="RM 200000"
              rules={[{ required: true, message: 'Price from is required' }]}
              min={0}
            />
            <ProFormMoney
              label="Price To"
              width="md"
              name="price_to"
              locale="ms-MY"
              placeholder="RM 200000"
              rules={[{ required: true, message: 'Price to is required' }]}
              min={0}
            />
            <ProFormMoney
              label="Monthly"
              width="md"
              name="monthly_price"
              locale="ms-MY"
              placeholder="RM 200000"
              rules={[{ required: true, message: 'Price to is required' }]}
              min={0}
            />
          </ProForm.Group>
          <ProForm.Group>
            {medias && medias.length > 0 && <ProFormSelect
              options={medias.map(media => ({
                value: media.id,
                label: media.filename
              }))}
              width="lg"
              name="banner_id"
              placeholder="Banner"
              label="Banner"
            />}
            {medias && medias.length > 0 && <ProFormSelect
              options={medias.map(media => ({
                value: media.id,
                label: media.filename
              }))}
              width="lg"
              name="thumbnail"
              placeholder="Thumbnail"
              label="Thumbnail"
            />}
            {pdfs && pdfs.length > 0 && <ProFormSelect
              options={pdfs.map(media => ({
                value: media.id,
                label: media.filename
              }))}
              width="lg"
              placeholder="Attachment"
              name="attachment_id"
              label="Attachment (PDF)"
            />}
          </ProForm.Group>
          <ProFormTextArea placeholder="Specs" width="xl" label="Technical Data" name="technical_data" />
        </ProForm>
      </div>
    </div>
  )
}

export default Car

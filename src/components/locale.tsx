import React from 'react'
import { ConfigProvider } from 'antd'
import enUs from 'antd/lib/locale-provider/en_US'

function Locale({ children }) {
  return (
    <ConfigProvider locale={enUs}>
      {children}
    </ConfigProvider>
  )
}

export default Locale

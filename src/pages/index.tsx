import BreadCrumb from '@/components/toobar'
import Car from './car'
import styles from './index.less'

export default function IndexPage() {
  return (
    <div className="h-screen p-10 bg-gray-50">
      <div className="container p-4 mx-auto bg-white rounded shadow">
        <h1>Add Car</h1>
        <BreadCrumb />
      </div>
    </div>
  )
}

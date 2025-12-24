// Component Imports
import OrderRequestDetails from '@/views/apps/ecommerce/orders/requests/OrderRequestDetails'

const OrderRequestDetailsPage = ({ params }: { params: { id: string } }) => {
  return <OrderRequestDetails requestId={params.id} />
}

export default OrderRequestDetailsPage


// Component Imports
import OrderRequestDetails from '@/views/apps/ecommerce/orders/requests/OrderRequestDetails'

const OrderRequestDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  
  return <OrderRequestDetails requestId={id} />
}

export default OrderRequestDetailsPage


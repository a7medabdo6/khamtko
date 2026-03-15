import ReturnDetails from '@views/apps/ecommerce/returns/ReturnDetails'

const ReturnDetailsPage = ({ params }: { params: { id: string } }) => {
  return <ReturnDetails id={params.id} />
}

export default ReturnDetailsPage

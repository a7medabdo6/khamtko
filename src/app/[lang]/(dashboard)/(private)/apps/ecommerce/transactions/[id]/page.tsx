import TransactionDetails from '@views/apps/ecommerce/transactions/TransactionDetails'

const TransactionDetailsPage = ({ params }: { params: { id: string } }) => {
  return <TransactionDetails id={params.id} />
}

export default TransactionDetailsPage

// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import ShipmentDetails from '@views/apps/ecommerce/shipments/ShipmentDetails'

// Util Imports
import { getDictionary } from '@/utils/getDictionary'

const ShipmentDetailsPage = async ({ params }: { params: Promise<{ lang: Locale; id: string }> }) => {
  const { lang, id } = await params
  const dictionary = await getDictionary(lang)

  return <ShipmentDetails shipmentId={id} dictionary={dictionary} />
}

export default ShipmentDetailsPage


// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import ShipmentManagement from '@views/apps/ecommerce/shipments/ShipmentManagement'

// Util Imports
import { getDictionary } from '@/utils/getDictionary'

const ShipmentManagementPage = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return <ShipmentManagement dictionary={dictionary} />
}

export default ShipmentManagementPage


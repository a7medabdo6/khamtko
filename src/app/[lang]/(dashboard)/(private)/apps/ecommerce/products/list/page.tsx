// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import ProductListManagement from '@views/apps/ecommerce/products/list/ProductListManagement'

// Util Imports
import { getDictionary } from '@/utils/getDictionary'

const eCommerceProductsList = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return <ProductListManagement dictionary={dictionary} />
}

export default eCommerceProductsList

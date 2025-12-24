// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import ProductCatalog from '@views/apps/ecommerce/products/catalog/ProductCatalog'

// Util Imports
import { getDictionary } from '@/utils/getDictionary'

const ProductCatalogPage = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return <ProductCatalog dictionary={dictionary} />
}

export default ProductCatalogPage


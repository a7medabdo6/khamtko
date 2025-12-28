import SellerProfile from '@/views/apps/seller/profile/SellerProfile'
import { getDictionary } from '@/utils/getDictionary'

export default async function SellerProfilePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = await getDictionary(lang as 'en' | 'ar' | 'fr')

  return <SellerProfile dictionary={dictionary} />
}

 
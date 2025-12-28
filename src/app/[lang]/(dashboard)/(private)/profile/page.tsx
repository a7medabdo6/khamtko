import SellerProfile from '@/views/apps/seller/profile/SellerProfile'
import { getDictionary } from '@/utils/getDictionary'

export default async function SellerProfilePage({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionary(params.lang)

  return <SellerProfile dictionary={dictionary} />
}

 
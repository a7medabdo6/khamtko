/**
 * Seller type — stored on User at registration and used by:
 * - orders: routing, fulfillment flow
 * - warehouse: drop vs store logic
 * - commission: selling-only vs storing + selling
 */
export const SELLER_TYPE = {
  SUB_COMPANY: 'sub_company',
  SELLER_A: 'seller_a',
  SELLER_B: 'seller_b'
} as const

export type SellerTypeValue = (typeof SELLER_TYPE)[keyof typeof SELLER_TYPE]

export const SELLER_TYPE_LABELS: Record<SellerTypeValue, string> = {
  [SELLER_TYPE.SUB_COMPANY]: 'My sub company',
  [SELLER_TYPE.SELLER_A]:
    'Seller A: drops order to Khamatko warehouse after confirmation; commission on selling only',
  [SELLER_TYPE.SELLER_B]:
    'Seller B: stores items in Khamatko store; commission on storing + selling'
}

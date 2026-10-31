import { t } from '../i18n/locale'
import { authApiBase } from './auth'
export interface ActivatedQuest {questId:string;redeemedAt:number}
export async function loadActivatedQuests(): Promise<ActivatedQuest[]> {
  const response=await fetch(`${authApiBase()}/quest-codes`,{credentials:'include'})
  const data=await response.json()
  if(!response.ok) throw new Error(data.message||t("Chưa đọc được quest đã kích hoạt."))
  if(!Array.isArray(data.items)) throw new Error(t("Phản hồi danh sách quest đã kích hoạt không hợp lệ."))
  return data.items
}
export async function redeemQuestCode(code:string): Promise<ActivatedQuest> {
  const csrf=decodeURIComponent(document.cookie.split('; ').find(row=>row.startsWith('csrftoken='))?.slice(10)??'')
  const response=await fetch(`${authApiBase()}/quest-codes/redeem`,{method:'POST',credentials:'include',headers:{'Content-Type':'application/json','X-CSRFToken':csrf},body:JSON.stringify({code})})
  const data=await response.json()
  if(!response.ok) throw new Error(data.message||t("Chưa kích hoạt được mã. Hãy thử lại."))
  return data
}

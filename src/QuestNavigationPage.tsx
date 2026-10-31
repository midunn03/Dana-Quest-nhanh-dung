import { t } from './i18n/locale'
import DueStartPage from './DueStartPage'
import {getQuest} from './data/quests'
export default function QuestNavigationPage({id}:{id:string}){return getQuest(id)?<DueStartPage key={id} id={id}/>:<main className="screen-page"><h1>{t("Không tìm thấy quest")}</h1><a href="#/kham-pha">{t("Về Khám phá")}</a></main>}

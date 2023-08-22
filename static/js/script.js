import Textarea from './form.js'
import { HistoryManagement } from './history.js'
import { MenuSettingManagement } from './menu-settings.js'
import MessageManagement from './message.js'


HistoryManagement.initHistory();
MenuSettingManagement.initMenuSetting();
MessageManagement.init();
Textarea.init();



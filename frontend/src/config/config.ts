import { library } from '@fortawesome/fontawesome-svg-core';


import { faAsterisk } from '@fortawesome/free-solid-svg-icons/faAsterisk';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { faCloud } from '@fortawesome/free-solid-svg-icons/faCloud';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faDatabase } from '@fortawesome/free-solid-svg-icons/faDatabase';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faRoad } from '@fortawesome/free-solid-svg-icons/faRoad';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons/faTachometerAlt';
import { faTasks } from '@fortawesome/free-solid-svg-icons/faTasks';
import { faThList } from '@fortawesome/free-solid-svg-icons/faThList';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons/faUsersCog';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faShield} from '@fortawesome/free-solid-svg-icons/faShield';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import{faRefresh} from "@fortawesome/free-solid-svg-icons/faRefresh";
import {
  faArrowLeft, faArrowRight,
  faCashRegister,
  faCreditCard,
  faExchange,
  faMoneyBill,
  faMoneyBills
} from "@fortawesome/free-solid-svg-icons";
import {App} from "vue";
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons
import MultiSelect from "primevue/multiselect";
import Dropdown from "primevue/dropdown";
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';

import RadioButton from 'primevue/radiobutton';
import Checkbox from 'primevue/checkbox';
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Message from "primevue/message";
import InlineMessage from "primevue/inlinemessage";
import ProgressSpinner from "primevue/progressspinner";
import AutoComplete from "primevue/autocomplete";
import Fieldset from "primevue/fieldset";
import Card from "primevue/card";
import Panel from "primevue/panel";
import PrimeVue from 'primevue/config';



export function initFortAwesome() {
  library.add(
    faArrowLeft,
    faArrowRight,
    faAsterisk,
    faBan,
    faBars,
    faBell,
    faBook,
    faCloud,
    faCogs,
    faDatabase,
    faEye,
    faFlag,
    faHeart,
    faHome,
    faList,
    faLock,
    faPencilAlt,
    faPlus,
    faRoad,
    faSave,
    faSearch,
    faSignInAlt,
    faSignOutAlt,
    faSort,
    faSortDown,
    faSortUp,
    faSync,
    faTachometerAlt,
    faTasks,
    faThList,
    faTimes,
    faTimesCircle,
    faTrash,
    faUser,
    faUserPlus,
    faUsers,
    faUsersCog,
    faWrench,
    faPlay,
  );
}

export function initPrimeVue(app: App) {

  // app.component('Textarea', Textarea);
  // app.component('Dialog', Dialog);
  app.use(PrimeVue
    , {
      locale: {
        "accept": "Да",
        "reject": "Не",
        "choose": "Избор",
        "upload": "Качване",
        "cancel": "Отказ",
        "dayNames": ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"],
        "dayNamesShort": ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб"],
        "dayNamesMin": ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        "monthNames": ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
        "monthNamesShort": ["Яну", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"],
        "today": "Днес",
        "clear": "Изчистване",
        "weekHeader": "Сд",
        "firstDayOfWeek": 1,
        "dateFormat": "dd.mm.yy",
        "hourFormat": 24,
        "weak": "Слаба",
        "medium": "Средна",
        "strong": "Добра",
        "passwordPrompt": "Въведете парола",
        "startsWith": "Започва с",
        "contains": "Съдържа",
        "notContains": "Не съдържа",
        "endsWith": "Завършва на",
        "equals": "Равно е на",
        "notEquals": "Не е равно на",
        "noFilter": "Без филтър",
        "lt": "По-малко от",
        "lte": "По-малко или равно на",
        "gt": "По-голямо от",
        "gte": "По-голямо или равно на",
        "dateIs": "Датата е",
        "dateIsNot": "Дататата не е",
        "dateBefore": "Датата е преди",
        "dateAfter": "Датата е след",
        "custom": "Персонализиран",
        "apply": "Приложи",
        "matchAll": "Съвпадение на всички",
        "matchAny": "Съвпадение на някое ",
        "addRule": "Добавяне на условие",
        "removeRule": "Премахване на условие",
        "emptyFilterMessage": "Няма налична информация",
        "emptyMessage": "Не са открити резултати"
      }
    })
  app.component('MultiSelect', MultiSelect);
  app.component('Dropdown', Dropdown);

  app.component('MultiSelect', MultiSelect);
  app.component('Calendar', Calendar);
  app.component('PTextarea', Textarea);
  app.component('PDialog', Dialog);
  app.component('Dropdown', Dropdown);
  app.component('RadioButton', RadioButton);
  app.component('Checkbox', Checkbox);
  app.component('PButton', Button);
  app.component('DataTable', DataTable);
  app.component('Column', Column);
  app.component('Message', Message);
  app.component('InlineMessage', InlineMessage);
  app.component('ProgressSpinner', ProgressSpinner);
  app.component('AutoComplete', AutoComplete);
  app.component('Fieldset', Fieldset);
  app.component('Card', Card)
  app.component('Panel', Panel)
}

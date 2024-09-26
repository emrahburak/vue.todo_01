import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDown,
  faMagnifyingGlass,
  faTrashCan,
  faCirclePlus
} from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass, faAngleDown, faTrashCan, faCirclePlus)

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')

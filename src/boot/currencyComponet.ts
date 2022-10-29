import { boot } from 'quasar/wrappers'
import CurrencyComponent from 'components/globalComponents/CurrencyFormat.vue'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({app}) => {
  app.component('CurrencyComponent', CurrencyComponent)
})

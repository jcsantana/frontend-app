<template>
  <div>
    <div :class="`row ${props.color}`">
      <div class="colMenu col flex justify-center">
        <q-list>
          <q-item>
            <q-item-section>{{ message }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <q-list>
      <q-item to="/" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="home" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ $t('menu.home') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-expansion-item v-for="item in Menu.links" v-bind:key="item.title" v-show="item.expanded" :expand-icon-class="item.color" :icon="item.icon" :label="$t(item.title)">
        <q-card :class="$q.dark.isActive ? 'bg-dark text-white' : 'bg-grey-2 text-black'">
          <q-item v-for="item2 in item.subMenu" v-bind:key="item2.title" :to="item2.to" active-class="my-menu-link" clickable>
            <q-item-section avatar>
              <q-avatar>
                <q-icon :class="item2.color" :name="item2.icon" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{ $t(item2.title) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </q-expansion-item>
      <q-item v-for="item in Menu.links" v-bind:key="item.title" :to="item.to" v-show="!item.expanded" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <q-icon :name="item.icon" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ $t(item.title) }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-select filled v-model="locale" :options="localeOptions" label="Selecione outra lingua" emit-value map-options options-dense style="min-width: 150px" />
    </q-list>
  </div>
</template>

<script>
import { Menu } from './menu'
import { useI18n } from 'vue-i18n'
export default {
  name: 'menuComponent',
  props: {
    color: null,
  },
  setup(props) {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      message: 'MENU APP',
      Menu,
      props,
      locale,
      localeOptions: [
        { value: 'en-US', label: 'Ingles EUA' },
        { value: 'pt-BR', label: 'Portugues do Brasil' },
      ],
    }
  },
}
</script>
<style scoped>
.colMenu {
  padding-top: 0.1rem;
}
.q-icon {
  padding-right: 15px;
}
</style>

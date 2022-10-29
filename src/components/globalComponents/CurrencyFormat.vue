<template>
  <q-input
    ref="inputRef"
    :rules="[(val) => !!val || 'Campo obrigatorio']"
    v-model="formattedValue"
    dense
    rounded
    outlined
    label="* PREÇO"
  />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
import { watch } from 'vue'

export default {
  name: 'QCurrencyInput',
  props: {
    modelValue: null,
    value: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef, formattedValue, setValue } = useCurrencyInput(props.options)
    watch(
      () => props.modelValue,
      (value) => {
        setValue(value)
      }
    )
    return { inputRef, formattedValue }
  },
}
</script>

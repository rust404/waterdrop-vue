<template>
  <layout>
    <template v-slot:header>
      <top-bar>
        <radio-group v-model="radio1">
          <radio-button label="收入"></radio-button>
          <radio-button label="支出"></radio-button>
        </radio-group>
      </top-bar>
    </template>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import NavBar from "@/components/NavBar.vue";
import Icon from "@/components/Icon.vue";
import TopBar from "@/components/TopBar.vue";
import RadioButton from "@/components/Radio/RadioButton.vue";
import RadioGroup from "@/components/Radio/RadioGroup.vue";

@Component({
  components: {
    Layout,
    NavBar,
    Icon,
    TopBar,
    RadioButton,
    RadioGroup,
  }
})
export default class RecordAdd extends Vue {
  radio1 = '收入'

  onChange(val: string) {
    console.log('change', val)
  }
}
</script>

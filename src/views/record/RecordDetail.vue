  <template>
  <layout>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
    <div>record detail</div>
    <div @click="toggle" style="height: 200px; background: blue"></div>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import NavBar from "@/components/NavBar.vue";

@Component({
  components: {
    Layout,
    NavBar,
  }
})
export default class RecordDetail extends Vue {
  show = false
  toggle() {
    this.$message({
      type: 'danger',
      message: "请填入分类"
    })
  }
}

</script>

<template>
  <el-menu
    :default-active="this.$route.path"
    class="d-flex"
    mode="horizontal"
    @select="handleSelect"
    :class="width < 900 ? ' justify-content-between' : ''"
    router
  >
    <el-menu-item @click="setMenu()" v-show="width < 900">
      <i v-show="!getMenuVisible" class="bi bi-list h2"></i>
      <i v-show="getMenuVisible" class="bi bi-x-lg h2"></i>
    </el-menu-item>

    <el-menu-item index="/" class="active-iptal" :class="width < 900 ? 'w-100 text-center' : ''">
      <div class="d-flex h-100 align-items-center">
        <img src="/icon/is_black3.png" class="m-0" style="max-height: 30px" alt="" />
        <h5 class="m-0">&nbsp;- Blog</h5>
      </div>
    </el-menu-item>
    <el-menu-item v-if="width >= 900" class="w-100 active-iptal"></el-menu-item>
    <template v-if="this.$auth.$storage.getUniversal('token')">
      <el-menu-item class="">Profil </el-menu-item>
    </template>
    <template v-else>
      <el-menu-item index="/uye-ol">Üye Ol</el-menu-item>

      <el-menu-item index="/giris-yap">Giriş Yap</el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      width: 0,
    };
  },
  methods: {
    setMenu() {
      console.log(this.getMenuVisible);
      if (this.getMenuVisible) {
        this.$store.commit("setMenuVisible", false);
      } else {
        this.$store.commit("setMenuVisible", true);
      }
    },
  },
  mounted() {
    this.width = window.innerWidth;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
    });
  },
  computed: {
    ...mapGetters(["getMenuVisible"]),
  },
};
</script>

<style>
.active-iptal {
  border-bottom: none !important;
}
</style>

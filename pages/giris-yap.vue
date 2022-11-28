<template>
  <div>
    <Header></Header>
    <div class="d-flex">
      <Aside></Aside>
      <div style="height: calc(100vh - 61px - 64px)" class="overflow-auto w-100 py-4 px-2">
        <div class="container">
          <el-card class="w-100 mb-3">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }"> Anasayfa </el-breadcrumb-item>
              <el-breadcrumb-item> Üye Ol </el-breadcrumb-item>
            </el-breadcrumb>
          </el-card>
          <div class="row justify-content-center">
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <el-card>
                <div class="d-flex flex-column">
                  <label class="mt-2">Eposta:</label>
                  <el-input v-model="uye.email" @change="validateEmail" placeholder=""></el-input>
                  <span v-if="email_error" class="text-danger"> Epostanızı kontrol ediniz!</span>

                  <label class="mt-2">Şifre:</label>
                  <el-input v-model="uye.password" show-password placeholder=""></el-input>

                  <div class="d-flex mt-2 justify-content-end">
                    <el-button type="primary" @click="giris">Giriş Yap</el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uye: {
        email: "",
        password: "",
      },
      email_error: false,
    };
  },
  methods: {
    giris() {
      this.$axios.$post("login", this.uye).then((res) => {
        if (res.status == "success") {
          this.$auth.$storage.setUniversal("token", res.data.token);
          this.$axios.$post(res.data.token + "/getLoggedInUserInfo", this.uye).then((res2) => {
            this.$auth.$storage.setUniversal("user", res2.data);
            this.$message({
              message: "Giriş Başarılı.",
              type: "success",
            });
            this.$router.push("/");
          });
        }
      });
    },
    validateEmail() {
      if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.uye.email)) {
        this.email_error = true;
      } else {
        this.email_error = false;
      }
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>

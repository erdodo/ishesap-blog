<template>
  <div>
    <Header></Header>
    <div class="d-flex">
      <Aside :ktg_visible="true"></Aside>
      <div style="height: calc(100vh - 61px - 64px)" class="overflow-auto w-100 py-4 px-2">
        <div class="container">
          <el-card class="w-100 mb-3">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }"> Anasayfa </el-breadcrumb-item>
              <el-breadcrumb-item> Profil </el-breadcrumb-item>
            </el-breadcrumb>
          </el-card>
          <div class="row justify-content-center">
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <el-card>
                <div class="d-flex flex-column">
                  <div v-if="getBlogImage(uye.profile_picture)" class="d-flex justify-content-between">
                    <img :src="getBlogImage(uye.profile_picture)" class="rounded" width="200px" />
                    <div>
                      <el-button type="danger" @click="uye.profile_picture = null" plain>Kaldır</el-button>
                    </div>
                  </div>
                  <div v-else>
                    <img v-if="base64 != ''" :src="base64" class="rounded" width="200px" />
                    <label v-else for="file-upload" class="avatar cursor-pointer avatar-uploader">
                      <label for="file-upload" class="avatar-uploader-icon cursor-pointer">+</label>
                    </label>
                    <input id="file-upload" @change="fileUpload()" type="file" class="d-none" />
                  </div>
                  <label class="mt-2">İsim:</label>
                  <el-input v-model="uye.name_basic" placeholder=""></el-input>

                  <label class="mt-2">Soyisim:</label>
                  <el-input v-model="uye.surname" placeholder=""></el-input>

                  <label class="mt-2">Telefon:</label>
                  <el-input v-model="uye.phone" v-mask="'(5##) ### ## ##'" placeholder=""></el-input>

                  <label class="mt-2">Eposta:</label>
                  <el-input v-model="uye.email" @change="validateEmail" placeholder=""></el-input>
                  <span v-if="email_error" class="text-danger"> Epostanızı kontrol ediniz!</span>

                  <div class="d-flex mt-2 justify-content-end">
                    <el-button type="primary" @click="uyeol">Güncelle</el-button>
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
      blogImgUrl: "https://blog.siberhesap.com/uploads/",
      uye: {
        profile_picture: "[]",
        name_basic: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
        column_set_id: "0",
        password2: "",
        language_id: 1,
        tc: new Date().getTime(),
        state: 1,
      },
      file: {},
      base64: "",
      email_error: false,
    };
  },
  mounted() {
    this.uye = this.$auth.$storage.getUniversal("user")?.user;
    this.uye.column_set_id = "0";
    delete this.uye.department_id;
    delete this.uye.srid;
  },
  methods: {
    getBlogImage(img) {
      console.log(img);
      if (img == undefined || img == null || img == "[]") return;
      return this.blogImgUrl + JSON.parse(img)?.[0]?.destination_path + "s_" + JSON.parse(img)?.[0]?.file_name;
    },
    uyeol() {
      if (this.uye.password != this.uye.password2) {
        this.$message({
          message: "Şifrenizi Kontrol ediniz.",
          type: "warning",
        });
      } else if (
        this.uye.name_basic == "" ||
        this.uye.surname == "" ||
        this.uye.email == "" ||
        this.uye.password == "" ||
        this.uye.phone == ""
      ) {
        this.$message({
          message: "Lütfen boş alanları doldurunuz.",
          type: "warning",
        });
      } else {
        const form_data = new FormData();

        for (const [key, val] of Object.entries(this.uye)) {
          form_data.append(key, val);
        }
        form_data.append("profile_picture_old", this.uye.profile_picture);

        if (this.base64 != "") {
          form_data.append("profile_picture[0]", this.file);
        }

        this.$axios
          .$post(this.$auth.$storage.getUniversal("token") + "/tables/users/" + this.uye.id + "/update", form_data)
          .then((res) => {
            console.log(res);
            if (res.data.message == "success") {
              this.$axios.$post(this.$auth.$storage.getUniversal("token") + "/getLoggedInUserInfo").then((res2) => {
                this.$auth.$storage.setUniversal("user", res2.data);
                this.$message({
                  message: "Güncelleme Başarılı.",
                  type: "success",
                });
                this.$router.push("/");
              });
            } else {
              this.$message({
                message: "Bir hata ile karşılaşıldı.",
                type: "error",
              });
            }
          })
          .catch(() => {
            this.$message({
              message: "Bir hata ile karşılaşıldı.",
              type: "error",
            });
          });
      }
    },
    fileUpload() {
      const fileinput = document.getElementById("file-upload");
      this.file = fileinput.files[0];
      this.getBase(fileinput.files[0]);
      //console.log(await this.getBase(fileinput.files[0]).result);
      this.getBase(fileinput.files[0]).then((res) => {
        var baseset = setInterval(() => {
          if (res.result != null) {
            this.base64 = res.result;
            clearInterval(baseset);
          }
        }, 10);
      });
    },
    async getBase(file) {
      var reader = new FileReader();
      await reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      return await reader;
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

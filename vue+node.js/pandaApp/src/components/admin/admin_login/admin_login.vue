<template>
    <div>
        <div class="form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="inputEmail3" placeholder="Email" v-model="data.username">
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="data.password">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <div class="checkbox">
                <label>
                  <input type="checkbox"> Remember me
                </label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="submit" class="btn btn-default" @click="admin_login">Sign in</button>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
    import http from '../../../router/httpclient'
    export default {
        data(){
            return {
                data:{
                  username:'',
                  password:''
                }
            }
        },
        methods: {
            admin_login(){
                http.post('admin_login',this.data).then((res) => {
                    if(res.status){
                        window.localStorage.setItem('token',res.data);
                        this.$router.push({name:'administrator'});
                    }
                })
            }
        }
    }
</script>



<template>
  <div class="navigation">
    <button class="btn" @click="goNext('leftScreen')">左屏</button>
    <button class="btn" @click="goNext('mapChart')">车辆探知来源地色差分布</button>
    <button class="btn" @click="goNext('rightScreen')">右屏</button>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
    }
  },
  methods: {
    goNext (toWhere) {
      this.$router.push({
        name: toWhere
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .navigation{
    width: 100%;
    height: 100%;
    padding: 100px;
    background-color: #011D35;
    box-sizing: border-box;
    display: flex;
    .btn{
      flex: 1;
      font-size: 100px;
      border: 0;
      cursor: pointer;
      background-color: #011D35;
      color: honeydew;
      transition: all .8s ease-in-out;
      &:nth-child(1){
        transition: all 0.4s linear;
        -moz-transition: all 0.4s linear;
        -webkit-transition: all 0.4s linear;
        -o-transition: all 0.4s linear;
      }
      &:nth-child(2){
        transition: all 0.4s linear;
        -moz-transition: all 0.4s linear;
        -webkit-transition: all 0.4s linear;
        -o-transition: all 0.4s linear;
      }
      &:nth-child(3){
        transition: all 0.4s linear;
        -moz-transition: all 0.4s linear;
        -webkit-transition: all 0.4s linear;
        -o-transition: all 0.4s linear;
      }
      &:hover{
        background-color: lightcyan;
        color: #011D35;
        border-radius: 4%;
        -webkit-box-shadow:0 0 100px #202020;
        -moz-box-shadow:0 0 100px #202020;
        box-shadow:0 0 100px #202020;
      }
    }
  }
</style>

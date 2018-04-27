<template>
  <div id="app" :style="{height: height}">
    <transition :name="transitionName">
      <router-view :height="height" class="child-view" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      height: '',
      transitionName: 'slide-left'
    }
  },
  created () {
    this.height = this.getClientHeight() + 'px'
  },
  methods: {
    getClientHeight () {
      let clientHeight = 0
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
      } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
      }
      return clientHeight
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/') {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  }
}
</script>

<style lang="scss">
html{
  font-size: 14Px;
  body{
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #04455C;
  }
}

@media (max-width: 1100px) {
  html{
    font-size: 12Px;
  }
}

@media (max-width: 1000px),(max-height: 742px) {
  html{
    font-size: 10Px;
  }
}

@media (max-width: 900px),(max-height: 600px) {
  html{
    font-size: 8Px;
  }
}

@media (max-width: 800px),(max-height: 500px) {
  html{
    font-size: 6Px;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.child-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all .8s ease-in-out;
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 1;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 1;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
</style>

<template>
<pre>
  GET
  학생({{$route.params.user}}) 정보 페이지

  PUT/POST
  정보를 변경한다 (본인만 가능하다).
  선생님/학원 관리자 등으로 역할 변경을 요청한다.
  --> 변경에 대한 승인은 운영자가 한다.
</pre>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  // async asyncData({ $axios }) {
  //    const profile = await $axios.$get('/api/user/')
  //    return {
  //      profile
  //    }
  //  }

}
</script>

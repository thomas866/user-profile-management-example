<template>
<pre>
  GET
  운영자({{$route.params.user}}) 마이 페이지(본인이 아니면 about으로 라우팅 된다) (시스템 현황)

  PUT/POST
  사용자의 역할 조정을 승인한다.
</pre>
</template>

<script>
export default {
  middleware: [
    'about',    // makes route to '/about' if user is not the owner
    'auth',
  ],
}
</script>

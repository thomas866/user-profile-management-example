<template>
<pre>
  GET
  개발자({{$route.params.id}}) 마이 페이지(본인이 아니면 about으로 라우팅 된다) (개발자 전용)
</pre>
</template>

<script>
export default {
  middleware: [
    'about',    // makes route to '/about' if user is not the owner
    'auth'
  ],
}
</script>

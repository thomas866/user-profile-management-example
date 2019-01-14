<template>
<pre>
  메인 페이지 입니다.
  이미 로그인 된 상태이면, 역할의 home으로 라우팅 됩니다.
  로그인 다이얼로그를 포함하고 있습니다.
</pre>
</template>

<script>
export default {
  middleware: [
    'main',    // makes route to '/about' if user is not the owner
  ],
}
</script>

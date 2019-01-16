<template>
<pre>
  로그인 페이지 입니다.
</pre>
</template>

<script>
export default {
  middleware: [
    'main',    // makes route to '/about' if user is not the owner
  ],
}
</script>

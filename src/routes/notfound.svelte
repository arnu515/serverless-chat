<script lang="ts">
    export let params = {msg: ""}
</script>

<h1 class="w3-jumbo w3-center">404</h1>
<p class="w3-large w3-center">Not found</p>
<p class="w3-center w3-text-gray">{params.msg || "The page you were looking for was not found."}<br> <a href="/">Home</a></p>
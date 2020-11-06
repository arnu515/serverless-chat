<script lang="ts">
    import router from "page";
    import About from "./routes/about.svelte";
    import Auth from "./routes/auth.svelte";        
    import Chat from "./routes/chat.svelte";
    import Index from "./routes/index.svelte";
    import NotFound from "./routes/notfound.svelte";
    import { queryString } from "./services/util"

    let page;
    let params = {};
    let qs = {};

    router("/", () => page = Index)
    router("/about", () => page = About)
    router("/404/:msg", (ctx: {params: {}, querystring: string}, next) => {
        params = ctx.params;
        next();
    }, () => page = NotFound)
    router("/auth", (ctx, next) => {
        qs = queryString(ctx.querystring)
        next();
    }, () => page = Auth)
    router("/login", () => router.redirect("/auth"))
    router("/register", () => router.redirect("/auth"))
    router("/chat", () => page = Chat)

    router("/*", () => page = NotFound)
    router.start();
</script>

<svelte:component this={page} {params} {qs} />

<script lang="ts">
    import {auth, db} from "../services/firebase"
    import router from "page";
    import { onDestroy } from "svelte";
    import Chat from "../components/Chat.svelte";
    import Filter from "bad-words";

    interface User {
        email: string, photoURL: string, uid: string
    }

    interface Message extends User {
        message: string, createdAt: number
    }

    let user: User | null;
    let messages: Message[] = [];
    let cooldown = false;

    auth.onAuthStateChanged(u => user = u);

    $: {
        if (user === null) router.redirect("/auth?action=login&next=%2Fchat");
    }

    const unsubscribe = db.collection("messages").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
                messages = [...messages, change.doc.data() as Message]
                setTimeout(() => {if (document.getElementById("scroll-to")) document.getElementById("scroll-to").scrollIntoView({behavior: "smooth"});}, 500)
            }
        })
    })

    function messageSubmit(e: KeyboardEvent & {
        currentTarget: EventTarget & HTMLInputElement;
    }) {
        if (e.key.toLowerCase() !== "enter") return;
        if (cooldown) return;
        const message = (new Filter()).clean(((document.getElementById("message-input") as HTMLInputElement).value || "").trim());
        if (!message) return;

        (document.getElementById("message-input") as HTMLInputElement).value = ""
        cooldown = true;
        setTimeout(() => cooldown = false, 3000)

        db.collection("messages").add({
            message,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            createdAt: Date.now()
        })
    }

    onDestroy(unsubscribe)

    function logout() {
        if (auth.currentUser) {
            auth.signOut().then(() => {}).catch(e => {
                throw new Error(e)
            });
        }
    }
</script>

{#if typeof user === "undefined"}
    <p class="w3-center w3-section"><i class="fas fa-spinner w3-spin fa-3x"></i> Loading</p>
{:else}
    {#if user}
        <h1 class="w3-jumbo w3-center">Serverless chat</h1>
        <p class="w3-center">Chatroom</p>
        <p class="w3-center"><button class="w3-button w3-blue" on:click={logout}>Logout</button></p>

        <br>
        <div class="w3-container w3-border w3-border-gray" style="margin: 0 auto; width: 60%; height: 600px; overflow-y: auto;">
            <br>
            {#if messages.length > 0}
                {#each messages as m}
                    <Chat {...m} self={user.uid === m.uid} />
                {/each}
            {:else}
                <p class="w3-center w3-text-gray">Looks like nobody's sent a message. Be the first!</p>
            {/if}
            <!-- Dummy element used to scroll chat -->
            <br id="scroll-to">
        </div>
        <input on:keydown={messageSubmit} type="text" style="margin: 0 auto; width: 60%; margin-top: -1px" placeholder={cooldown ? "3 second cooldown" : "Enter message and press enter"} class="w3-input w3-border w3-border-gray {cooldown && "w3-pale-red"}" id="message-input">
        <br>
    {:else}
        <p class="w3-center w3-section">Not logged in!</p>
    {/if}
{/if}

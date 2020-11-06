<script lang="ts">
    import md5 from "md5";

    export let photoURL: string;
    export let createdAt: number;
    export let email: string;
    export let message: string;
    export let uid: string;
    export let self = false;
</script>

<div title={`${email} (${uid}) at ${new Date(createdAt)}`} style="display: flex; margin-bottom: 0.5rem; {self && "flex-direction: row-reverse; "}align-items: center;">
    <img src={photoURL || `https://www.gravatar.com/avatar/${md5(email)}?d=mp&s=32&r=g`} style="width: 32px; height: 32px;" class="w3-circle" alt="avatar">
    <span class="{self ? "w3-blue" : "w3-light-gray"} w3-padding w3-round-xxlarge" style="margin: 0 6px">{message}</span>
</div>

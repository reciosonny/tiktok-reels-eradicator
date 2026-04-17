<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    interface Props extends HTMLInputAttributes {
        value?: string;
    }

    let { value = $bindable(''), class: className, ...rest }: Props = $props();
</script>

<input
    type="text"
    bind:value
    class={`w-full bg-white text-black font-body text-body-lg font-normal border-3 border-black shadow-[3px_3px_0px_black] px-3 py-2 outline-none focus:shadow-[1px_1px_0px_black] focus:translate-x-[2px] focus:translate-y-[2px] transition-all placeholder:text-neutral-400 ${className ?? ''}`}
    {...rest}
/>

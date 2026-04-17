<script lang="ts">
    import type { HTMLTextareaAttributes } from "svelte/elements";

    interface Props extends HTMLTextareaAttributes {
        value?: string;
    }

    let { value = $bindable(''), rows = 4, class: className, ...rest }: Props = $props();
</script>

<textarea
    bind:value
    {rows}
    class={`w-full bg-white text-black font-body text-body-lg font-normal border-3 border-black shadow-[3px_3px_0px_black] px-3 py-2 outline-none resize-vertical focus:shadow-[1px_1px_0px_black] focus:translate-x-[2px] focus:translate-y-[2px] transition-all placeholder:text-neutral-400 ${className ?? ''}`}
    {...rest}
></textarea>

<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import type { Snippet } from "svelte";

    type ButtonVariant = 'default' | 'edit' | 'delete';

    interface Props extends HTMLButtonAttributes {
        variant?: ButtonVariant;
        children?: Snippet;
    }

    const { variant = 'default', children, class: className, ...rest }: Props = $props();

    const variantClasses: Record<ButtonVariant, string> = {
        default: 'bg-black text-white',
        edit: 'bg-accent-200 text-white',
        delete: 'bg-accent-100 text-white',
    };
</script>

<button
    class={`border-3 border-black shadow-[3px_3px_0px_black] font-body text-body-lg font-medium px-4 py-1.5 cursor-pointer transition-all hover:opacity-90 active:shadow-[1px_1px_0px_black] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className ?? ''}`}
    {...rest}
>
    {#if children}
        {@render children()}
    {/if}
</button>

<script lang="ts">
    import { Label, Switch } from "bits-ui";
    import type { HTMLAttributes } from "svelte/elements";

    interface Props extends HTMLAttributes<HTMLElement> {
        id?: string;
        className?: string;
        children?: any;
        onCheckedChange?: (event: boolean) => void;
    }

    const { id, className, children, onCheckedChange = () => {}, ...rest }: Props = $props();
</script>

<div class={`flex items-center space-x-3 ${className}`}>
    <Switch.Root
        id={id}
        style="background: yellow;"
        class={`border focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-foreground data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-foreground peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
        onCheckedChange={onCheckedChange}
        {...rest}
    >
        <Switch.Thumb
            class="bg-background data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[30px] shrink-0 rounded-full transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border" style="background: green;"
        />
    </Switch.Root>
    <Label.Root for={id} class="text-sm font-medium">{@render children?.()}</Label.Root>
</div>

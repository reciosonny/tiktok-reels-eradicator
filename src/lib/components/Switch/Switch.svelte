<script lang="ts">
    import { Label, Switch } from "bits-ui";
    import type { HTMLAttributes } from "svelte/elements";

    import "./switch.scss";

    interface Props extends HTMLAttributes<HTMLElement> {
        id?: string;
        className?: string;
        children?: any;
        checked?: boolean;
        disabled?: boolean;
        onCheckedChange?: (event: boolean) => void;
    }

    const { id, className, checked, disabled, children, onCheckedChange = () => {}, ...rest }: Props = $props();

    let checkedVal = $state(false);

    $effect(() => {
        checkedVal = checked ?? false;
    });

    console.log('checked', checked)
</script>

<div class={`flex items-center space-x-3 ${className}`}>
    <Switch.Root
        id={id}
        class={`border-3 focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-foreground data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-foreground peer inline-flex h-[30px] min-h-[30px] w-[50px] shrink-0 cursor-pointer items-center px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checkedVal ? 'switch--enabled' : 'switch--disabled'}`}
        checked={checkedVal}
        disabled={disabled}
        onCheckedChange={value => {
            checkedVal = value;
            onCheckedChange(value);
        }}
        {...rest}
    >
        <Switch.Thumb
            class="bg-background data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[16px] shrink-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 border-2" style="background: #FFF42B;"
        />
    </Switch.Root>
    <Label.Root for={id} class={`text-sm font-medium ${disabled ? 'opacity-50' : ''}`}>{@render children?.()}</Label.Root>
</div>

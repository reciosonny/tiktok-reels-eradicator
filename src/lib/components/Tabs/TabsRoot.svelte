<script lang="ts">
    import { Tabs } from "bits-ui";
    import type { TabsRootProps } from "bits-ui";

    import "./tabs.scss";

    interface Props extends TabsRootProps {
        defaultValue?: string;
    }

    const {
        defaultValue,
        value,
        onValueChange,
        children,
        ...rest
    }: Props = $props();

    let internalValue = $state(value ?? defaultValue);

    $effect(() => {
        if (value !== undefined) {
            internalValue = value;
        }
    });
</script>

<Tabs.Root
    value={internalValue}
    onValueChange={(v) => {
        internalValue = v;
        onValueChange?.(v);
    }}
    {...rest}
>
    {@render children?.()}
</Tabs.Root>

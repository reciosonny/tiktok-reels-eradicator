<script lang="ts">
    import { Tabs } from "bits-ui";
    import type { TabsTriggerProps } from "bits-ui";

    interface Props extends TabsTriggerProps {}

    const { value, disabled, class: className, children, ...rest }: Props = $props();
</script>

<Tabs.Trigger {value} {disabled} class={`tabs-tab ${className ?? ''}`} {...rest}>
    {@render children?.()}
</Tabs.Trigger>

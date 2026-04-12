<script lang="ts">
    import { Tabs } from "bits-ui";
    import type { TabsListProps } from "bits-ui";

    interface Props extends TabsListProps {}

    const { children, ...rest }: Props = $props();
</script>

<Tabs.List class="tabs-list" {...rest}>
    {@render children?.()}
</Tabs.List>

<script lang="ts">
    import { Tabs } from "bits-ui";
    import type { TabsContentProps } from "bits-ui";

    interface Props extends TabsContentProps {}

    const { value, children, ...rest }: Props = $props();
</script>

<Tabs.Content {value} class="pt-8" {...rest}>
    {@render children?.()}
</Tabs.Content>

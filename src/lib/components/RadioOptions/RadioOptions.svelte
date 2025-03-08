<script lang="ts">
    import { Label, RadioGroup } from "bits-ui";
    import type { HTMLAttributes } from "svelte/elements";

    export interface OptionSelection<T> {
        value: T;
        label: string;
    }

    interface Props<T> extends HTMLAttributes<HTMLElement> {
        value: T;
        onValueChanged: (event: T) => void;
        selections: OptionSelection<T>[];
    }

    const { onValueChanged, value, selections, ...props }: Props<any> = $props();
</script>

<RadioGroup.Root
    class={`flex flex-col gap-4 text-sm font-medium ${props.class}`}
    orientation="vertical"
    value={value}
    onValueChange={onValueChanged}
>
    {#each selections as selection}
        <div
            class={`text-foreground group flex select-none items-center transition-all`}
        >
            <RadioGroup.Item
                id={selection.value}
                value={selection.value}
                class="border-border-input bg-background hover:border-dark-40 data-[state=checked]:border-6 data-[state=checked]:border-foreground size-5 shrink-0 cursor-default rounded-full border transition-all duration-100 ease-in-out"
            />
            <Label.Root for={selection.value} class="pl-3"
                >{selection.label}</Label.Root
            >
        </div>
    {/each}
</RadioGroup.Root>

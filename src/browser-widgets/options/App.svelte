<script lang="ts">
    import toast, { Toaster } from 'svelte-french-toast';
    import Switch from "$lib/components/Switch/Switch.svelte";
    import RadioOptions, { type OptionSelection } from "$lib/components/RadioOptions/RadioOptions.svelte";

    import "./options.scss";
    import { setChromeStorage } from '$lib/chromeStorage';
    import type { DisableReelOptions } from '$lib/types';

    let showQuotes = $state(false);
    let showDisableFor = $state(false);
    let disableReelOptions: DisableReelOptions = $state('');

    const onOptionChanged = (val: DisableReelOptions) => {
        disableReelOptions = val;
        toast.success("Option changed!");
    };

    const reelOptionSelections: OptionSelection<DisableReelOptions>[] = [
        { value: "10 mins.", label: "10 minutes" },
        { value: "30 mins.", label: "30 minutes" },
        { value: "1 hour", label: "1 hour" },
        { value: "2 hours", label: "2 hours" },
        { value: "4 hours", label: "4 hours" },
        { value: "8 hours", label: "8 hours" },
        { value: "forever", label: "forever" },
    ];

    $effect(() => {
        // setChromeStorage('') //TODO: save disableReelOptions to chrome storage
    });
</script>

<main class="px-72 pt-12">
    <h1 class="text-center text-4xl">Tiktok reels eradicator</h1>
    <section class="pt-20">
        <h2 class="text-3xl">Settings</h2>
        <section>
            <Switch
                id="thisIsId"
                className="mt-4"
                onCheckedChange={(val) => (showDisableFor = val)}
            >
                <span>Disable reel block</span>
            </Switch>

            {#if showDisableFor}
                <section class="pt-4">
                    <h3 class="text-lg">Disable for</h3>
                    <RadioOptions
                        class="pl-3.5 pt-2"
                        selections={reelOptionSelections}
                        onValueChanged={onOptionChanged}
                    />
                </section>
            {/if}
        </section>
        <section>
            <Switch
                id="another"
                className="mt-4"
                onCheckedChange={(event) => (showQuotes = event)}
            >
                <span>Show quotes (soon)</span>
            </Switch>

            {#if showQuotes}
                <div class="border-solid border-2 border-black p-4 mt-4">
                    <h3 class="text-2xl">Quotes here</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quia, adipisci! Nobis soluta repudiandae, distinctio
                        quam, labore dolorem reprehenderit modi harum error
                        blanditiis officiis sequi facere iure suscipit mollitia,
                        dignissimos quisquam?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quia, adipisci! Nobis soluta repudiandae, distinctio
                        quam, labore dolorem reprehenderit modi harum error
                        blanditiis officiis sequi facere iure suscipit mollitia,
                        dignissimos quisquam?
                    </p>
                </div>
            {/if}
        </section>
    </section>
</main>

<Toaster />
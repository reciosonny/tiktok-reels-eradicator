<script lang="ts">
    import dayjs from 'dayjs';
    import toast, { Toaster } from 'svelte-french-toast';
    import Switch from "$lib/components/Switch/Switch.svelte";
    import RadioOptions, { type OptionSelection } from "$lib/components/RadioOptions/RadioOptions.svelte";

    import "./options.scss";
    import { getChromeStorage, removeChromeStorage, setChromeStorage } from '$lib/chromeStorage';
    import type { DisableReelOptions } from '$lib/types';

    let showQuotes = $state(false);
    let showDisableFor = $state(false);
    let disableReelOptions: DisableReelOptions = $state('');

    // @ts-ignore
    window.dayjs = dayjs;

    const computeDisableDuration = (val: DisableReelOptions) => {
        let disableDuration: number = 0;

        switch (val) {
            case '10 mins.':
                disableDuration = dayjs().add(10, 'm').valueOf();
                break;
            case '30 mins.':
                disableDuration = dayjs().add(30, 'm').valueOf();                
                break;
            case '1 hour':
                disableDuration = dayjs().add(1, 'h').valueOf();
                break;
            case '2 hours':
                disableDuration = dayjs().add(2, 'h').valueOf();
                break;
            case '4 hours':
                disableDuration = dayjs().add(4, 'h').valueOf();
                break;
            case '8 hours':
                disableDuration = dayjs().add(8, 'h').valueOf();
                break;
            default:
                break;
        }

        return disableDuration;
    }

    const setDisableDuration = async (val: DisableReelOptions) => {
        
        if (val === 'forever') {
            await setChromeStorage('DISABLE_DURATION', 'forever');
        } else {
            const disableDuration = computeDisableDuration(val);
            await setChromeStorage('DISABLE_DURATION', disableDuration);
        }
    }

    const onOptionChanged = async (val: DisableReelOptions) => {
        disableReelOptions = val;
        await setChromeStorage('DISABLE_REEL_OPTIONS', val);
        await setDisableDuration(val);
        
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

    const getLocalStoreValues = async () => {
        disableReelOptions = await getChromeStorage('DISABLE_REEL_OPTIONS') ?? '10 mins.';
    }

    $effect(() => {
        getLocalStoreValues();
    });
    
    const onDisableFor = async (val: boolean) => {
        showDisableFor = val;
        if (!val) {
            await removeChromeStorage('DISABLE_REEL_OPTIONS');
            await removeChromeStorage('DISABLE_DURATION');
        } else {
            const disableDuration = computeDisableDuration('10 mins.'); //default value when enabling
            await setChromeStorage('DISABLE_DURATION', disableDuration);
        }
        toast.success('Option changed!');
    }
</script>

<main class="px-72 pt-12">
    <h1 class="text-center text-4xl">Tiktok reels eradicator</h1>
    <section class="pt-20">
        <h2 class="text-3xl">Settings</h2>
        <section>
            <Switch
                id="thisIsId"
                className="mt-4"
                onCheckedChange={onDisableFor}
            >
                <span>Disable reel block</span>
            </Switch>

            {#if showDisableFor}
                <section class="pt-4">
                    <h3 class="text-lg font-medium">Disable for</h3>
                    <RadioOptions
                        class="pl-3.5 pt-2"
                        value={disableReelOptions}
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
    <div class="pt-12">
        <h2 class="text-lg">By: Sonny Recio</h2>
    </div>
</main>

<Toaster />
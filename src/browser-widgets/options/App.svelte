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
    let disableExplorePage: boolean = $state(false);
    let disableReelOptions: boolean = $state(false);
    let disableReelOptionsDuration: DisableReelOptions = $state('10 mins.');

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

        await setChromeStorage('DISABLE_DURATION_SELECTION', val);
    }

    const onOptionChanged = async (val: DisableReelOptions) => {
        // disableReelOptions = val;
        // await setChromeStorage('DISABLE_REEL_OPTIONS', val);
        await setChromeStorage('DISABLE_DURATION', val);
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

    const initializeLocalStoreValues = async () => { //TODO: How about we move the initialization to a global store instead? What if?
        const storeReelOptions = await getChromeStorage('DISABLE_REEL_OPTIONS');
        disableReelOptions = storeReelOptions;
        showDisableFor = disableReelOptions;

        const storeOptionsDuration = await getChromeStorage('DISABLE_DURATION_SELECTION');
        if (storeOptionsDuration) {
            disableReelOptionsDuration = storeOptionsDuration;
        }

        const storeDisableExplorePage = await getChromeStorage('DISABLE_EXPLORE_PAGE');
        disableExplorePage = storeDisableExplorePage ?? false;
    }

    $effect(() => {
        initializeLocalStoreValues();
    });
    
    const onDisableFor = async (val: boolean) => {
        showDisableFor = val;
        if (!val) {
            await removeChromeStorage('DISABLE_REEL_OPTIONS');
            await removeChromeStorage('DISABLE_DURATION');
            await removeChromeStorage('DISABLE_DURATION_SELECTION');
        } else {
            const disableDuration = computeDisableDuration('10 mins.'); //default value when enabling
            await setChromeStorage('DISABLE_DURATION', disableDuration);
            await setChromeStorage('DISABLE_REEL_OPTIONS', val);
        }
        toast.success('Option changed!');
    }

    const onToggleDisableExplorePage = async (val: boolean) => {
        disableExplorePage = val;
        await setChromeStorage('DISABLE_EXPLORE_PAGE', val);
        toast.success('Option changed!');
    }

    const txtFooter = `Made with <3 by Sonny`;
</script>

<main class="px-[250px] pt-12">
    <section class="flex items-center justify-center">
        <h1 class="option-header text-center text-[47px] font-heading font-medium px-[30px] py-[15px] bg-black text-white inline relative">Tiktok eradicator</h1>
    </section>
    <section class="mt-20 box-border py-[30px] px-10 bg-primary-100">
        <h2 class="font-heading text-4xl font-medium text-white">Settings</h2>
        <div class="pt-[50px]">
            <section>
                <Switch
                    id="thisIsId"
                    className="mt-4"
                    onCheckedChange={onDisableFor}
                    checked={showDisableFor}
                >
                    <span class="text-base font-body font-normal text-white">Disable "For You" blocking</span>
                </Switch>
    
                {#if showDisableFor}
                    <section class="pt-4">
                        <h3 class="text-base font-body text-white">Disable for</h3>
                        <RadioOptions
                            class="pl-3.5 pt-2"
                            value={disableReelOptionsDuration}
                            selections={reelOptionSelections}
                            onValueChanged={onOptionChanged}
                        />
                    </section>
                {/if}
            </section>
            <section>
                <Switch
                    className="mt-4"
                    onCheckedChange={onToggleDisableExplorePage}
                    checked={disableExplorePage}
                >
                    <span class="text-base font-body font-normal text-white">Include rest of the pages in blocking</span>
                </Switch>
            </section>
            <section>
                <Switch
                    id="another"
                    className="mt-4"
                    disabled={true}
                    onCheckedChange={(event) => (showQuotes = event)}
                >
                    <span class="font-body font-normal text-[16px] text-white">Show quotes (soon)</span>
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
            <span class="font-body text-[16px] pt-[240px] block text-center text-white">{txtFooter}</span>
        </div>
    </section>
</main>

<Toaster containerClassName="font-body font-medium" />
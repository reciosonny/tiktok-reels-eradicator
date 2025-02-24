<script lang="ts">
    import Switch from "$lib/components/Switch/Switch.svelte";
    import { Label, RadioGroup } from "bits-ui";
    import "./options.scss";

    let showQuotes = $state(false);
    let showDisableFor = $state(false);
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
                <section>
                    <h3>Disable for</h3>
                    <div>
                        <p>30 mins.</p>
                        <p>1 hour</p>
                        <p>2 hours</p>
                    </div>
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
        <section class="pt-10">
            <h3>Choices</h3>

            <RadioGroup.Root class="flex flex-col gap-4 text-sm font-medium">
                <div
                    class="text-foreground group flex select-none items-center transition-all"
                >
                    <RadioGroup.Item
                        id="amazing"
                        value="amazing"
                        class="border-border-input bg-background hover:border-dark-40 data-[state=checked]:border-6 data-[state=checked]:border-foreground size-5 shrink-0 cursor-default rounded-full border transition-all duration-100 ease-in-out"
                    />
                    <Label.Root for="amazing" class="pl-3">Amazing</Label.Root>
                </div>
                <div
                    class="text-foreground group flex select-none items-center transition-all"
                >
                    <RadioGroup.Item
                        id="average"
                        value="average"
                        class="border-border-input bg-background hover:border-dark-40 data-[state=checked]:border-6 data-[state=checked]:border-foreground size-5 shrink-0 cursor-default rounded-full border transition-all duration-100 ease-in-out"
                    />
                    <Label.Root for="average" class="pl-3">Average</Label.Root>
                </div>
                <div
                    class="text-foreground group flex select-none items-center transition-all"
                >
                    <RadioGroup.Item
                        id="terrible"
                        value="terrible"
                        class="border-border-input bg-background hover:border-dark-40 data-[state=checked]:border-6 data-[state=checked]:border-foreground size-5 shrink-0 cursor-default rounded-full border transition-all duration-100 ease-in-out"
                    />
                    <Label.Root for="terrible" class="pl-3">Terrible</Label.Root
                    >
                </div>
            </RadioGroup.Root>
        </section>
    </section>
</main>

<script lang="ts">
    import './options.scss';
    import { Accordion, Switch, Label } from 'bits-ui';
    let showUIDisplay = $state(true);
    
    let savedTimeInSeconds = $state(0);
    let formattedTime = $state("");
</script>

<main>
    <h1>Tiktok reels eradicator</h1>
    <section>
        <h2>Options</h2>
        <div>
            <span>**list of options here**</span>
        </div>
        <div>
            <Accordion.Root>
                <Accordion.Item>
                    <Accordion.Header>
                        <Accordion.Trigger>First</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>First accordion content</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <Accordion.Trigger>Second</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>Second accordion content</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <Accordion.Trigger>Third</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>Third accordion content</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </div>
        <div class="flex items-center space-x-3">
            <Switch.Root
              id="dnd"
              name="hello"
              class="focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-foreground data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-foreground peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Switch.Thumb
                class="bg-background data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[30px] shrink-0 rounded-full transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
              />
            </Switch.Root>
            <Label.Root for="dnd" class="text-sm font-medium">Do not disturb</Label.Root>
          </div>
    </section>
</main>
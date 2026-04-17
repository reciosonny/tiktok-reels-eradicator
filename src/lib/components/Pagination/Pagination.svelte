<script lang="ts">
    import Button from "$lib/components/Button/Button.svelte";

    interface Props {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
    }

    const { currentPage, totalPages, onPageChange }: Props = $props();
</script>

{#if totalPages > 1}
    <div class="flex items-center gap-2 mt-4">
        <Button
            variant="default"
            class="!px-3 !py-1 !text-body-md"
            disabled={currentPage === 1}
            onclick={() => onPageChange(currentPage - 1)}
        >
            Prev
        </Button>

        {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
            <Button
                variant={page === currentPage ? 'edit' : 'default'}
                class="!px-3 !py-1 !text-body-md"
                onclick={() => onPageChange(page)}
            >
                {page}
            </Button>
        {/each}

        <Button
            variant="default"
            class="!px-3 !py-1 !text-body-md"
            disabled={currentPage === totalPages}
            onclick={() => onPageChange(currentPage + 1)}
        >
            Next
        </Button>
    </div>
{/if}

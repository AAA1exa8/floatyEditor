<div bind:this={bubbleMenu} class="flex bg-dark-900 p-0.2rem rounded-0.5rem transiti" style="transition: visibility 0.1s ease, opacity 0.1s ease;">
    {#if editor}
    <button on:click={() => editor.chain().focus().toggleBold().run()} class:active={editor.isActive('bold')}>
        &#xF5F0;
    </button>
    <button on:click={() => editor.chain().focus().toggleItalic().run()} class:active={editor.isActive('italic')}>
        &#xF5F4;
    </button>
    <button on:click={() => editor.chain().focus().toggleStrike().run()} class:active={editor.isActive('strike')}>
        &#xF5F5;
    </button>
    <button on:click={() => editor.chain().focus().toggleCode().run()} class:active={editor.isActive('strike')}>
        &#xF2C8;
    </button>
    {/if}
</div>





<style lang="postcss">
    button.active {
        @apply bg-black text-white;
    }
	button {
        font-family: material_icons;
        font-size: 25px;
		border: none;
		background: none;
		color: #FFF;
		font-weight: 500;
		padding: 0 0.2rem;
		opacity: 0.6;
		margin: 0;
	}
	button:hover{
		opacity: 1;
	}	
</style>



<script lang="ts">
    export let bubbleMenu: HTMLElement;
    export let editor: any;
</script>
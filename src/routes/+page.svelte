<script lang="ts">
    import Tiptap from '$lib/editor.svelte'
    import Plus from '$lib/plus.svelte'

    let editors: number[] = [0];

    function destroyEditor(event: { detail: number; }){
        editors.splice(editors.indexOf(event.detail), 1)
        editors = editors
        console.log(editors)
    }
</script>

<Plus bind:editorCounter={editors} />

{#each editors as editor (editor)}
    <Tiptap id={editor} on:removeEditor={destroyEditor}/>   
{/each}




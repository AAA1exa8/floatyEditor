<script lang="ts">
    import Tiptap from '$lib/editor.svelte'
    import Plus from '$lib/plus.svelte'

    let bigWidth: boolean = true;

    let editors = [
        {z: 1, id:0}
    ];

    function destroyEditor(event: { detail: number; }){
        editors = editors.filter(e => e.id != event.detail)
    }
    function changeZIndexes(event: { detail: {z: number, id: number} }){
        if (Math.max(...editors.map(editor => editor.z)) == event.detail.z) {
            return
        }
        editors.forEach(editor => {
            if (editor.z > event.detail.z) {
                editor.z -= 1
            }
        });
        let toChange = editors.find(editor => editor.id == event.detail.id)
        if (toChange) {
            toChange.z = Math.max(...editors.map(editor => editor.z))+1
        }
        editors = editors
    }
</script>

<Plus bind:editorCounter={editors} bind:bigWidth={bigWidth}/>

{#each editors as editor (editor.id)}
    <Tiptap zIndex={editor.z} id={editor.id} on:removeEditor={destroyEditor} on:toFocus={changeZIndexes}/>   
{/each}

{#if !bigWidth}
    <div class="h-33"></div>
{/if}




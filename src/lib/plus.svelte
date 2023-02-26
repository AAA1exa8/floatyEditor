<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if enoughWidth}
    <span class="w-17 h-17 text-center absolute right-2.5 top-16 text-3.75rem cursor-pointer select-none z-999 rounded-full font-$material_icons bg-light-50" style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);" on:click={addEditor}>
        &#xF4FE;
    </span> 
{:else}
    <!-- ! finish this is just visual -->
    <div class="flex w-full h-30 flex justify-center items-center fixed bottom-0 bg-light-50 z-999" style="box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);">
        <div class="flex items-center justify-center w-full">
            <span class="selector"
                on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
                class:active={editor.isActive('heading', { level: 1 })}
            >
                &#xF799;
            </span>
            <span class="selector"
                on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                class:active={editor.isActive('heading', { level: 2 })}
            >
                &#xF79F;
            </span>
            <span class="selector" 
                on:click={() => {editor.chain().focus().setParagraph().run()}} 
                class:active={editor.isActive('paragraph')}>
                &#xF4B4;
            </span>
        </div>
        <div class="h-25 w-max text-center cursor-pointer select-none z-999 rounded-full font-$material_icons bg-light-50 " style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);" on:click={addEditor}>
            <span class="text-22">
                &#xF4FE;
            </span>
        </div>

        <div class="flex items-center justify-center w-full">
            <span class="selector"
                on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
                class:active={editor.isActive('heading', { level: 1 })}
            >
                &#xF5F0;
            </span>
            <span class="selector"
                on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                class:active={editor.isActive('heading', { level: 2 })}
            >
                &#xF5F4;
            </span>
            <span class="selector" 
                on:click={() => editor.chain().focus().setParagraph().run()} 
                class:active={editor.isActive('paragraph')}>
                &#xF2C8;
            </span>
        </div>
    </div>
    <!-- ! this is just visual -->
{/if}
 



<style lang="postcss">
    .selector {
        @apply items-center justify-center text-3xl cursor-pointer select-none z-999 rounded-full bg-light-50 mx-5 relative;
        font-family: material_icons;
    }
</style>



<script lang="ts">
	import { onMount } from "svelte";

    import { focusedEditor, bigWidth} from "$lib/stores/stores";

    
    export var editorCounter= [
        {z: 1, id:0}
    ];    

    var enoughWidth: boolean;
    var editor: any;

    focusedEditor.subscribe((value) => {
        editor = value;
    });

    bigWidth.subscribe((value) => {
        enoughWidth = value;
    });

    onMount(() => {
        checkWidth();
        //! This is different from editor.svelte might need to refactor later
        window.addEventListener('resize', checkWidth);
    });

    function checkWidth(){
        bigWidth.set(document.body.clientWidth > 768); 
    }

    function addEditor(){
        if (editorCounter.length == 0) {
            editorCounter = [
                {z: 1, id:0}
            ]
        }else{
            editorCounter = editorCounter.concat({z: Math.max(...editorCounter.map(editor => editor.z))+1, 
                id:editorCounter[editorCounter.length-1].id+1})
        }
    }
</script>
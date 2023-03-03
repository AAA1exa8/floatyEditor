<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $bigWidth}
    <span class="w-17 h-17 text-center absolute right-2.5 top-16 text-3.75rem cursor-pointer select-none z-999 rounded-full font-$material_icons bg-light-50" style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);" on:click={addEditor}>
        &#xF4FE;
    </span> 
{:else}
    <!-- TODO not all selectors are included -->
    <div class="flex w-full h-30 flex justify-center items-center fixed bottom-0 bg-light-50 z-999" style="box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);">
        <div class="flex items-center justify-around w-full">
            <span class="selector"
                on:click={() => selectStyle({string:'heading', level:1} )}
                class:active={checkStyle({string:'heading', level: 1 }, editor)}
            >
                &#xF799;
            </span>
            <span class="selector"
                on:click={() => selectStyle({string:'heading', level:2} )}
                class:active={checkStyle({string:'heading', level: 2 }, editor)}
            >
                &#xF79F;
            </span>
            <span class="selector" 
                on:click={() => selectStyle('paragraph')}
                class:active={checkStyle('paragraph', editor)}>
                &#xF4B4;
            </span>
        </div>
        <div class="h-25 w-max text-center cursor-pointer select-none z-999 rounded-full font-$material_icons" style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);" on:click={addEditor}>
            <span class="text-22">
                &#xF4FE;
            </span>
        </div>

        <div class="flex items-center justify-around w-full">
            <span class="selector"
                on:click={() => selectStyle('bold')}
                class:active={checkStyle('bold', editor)}
            >
                <span>&#xF5F0;</span>
            </span>
            <span class="selector"
                on:click={() => selectStyle('italic')}
                class:active={checkStyle('italic', editor)}
            >
                <span>&#xF5F4;</span>
            </span>
            <span class="selector" 
                on:click={() => selectStyle('code')} 
                class:active={checkStyle('code', editor)}
            >
                <span>&#xF2C8;</span>
            </span>
        </div>
    </div>
    <div class="h-33"></div>
{/if}
 



<style lang="postcss">
    .selector {
        @apply items-center justify-center text-3xl cursor-pointer select-none z-999 rounded-1 w-15 h-15 text-center relative flex justify-center;
        font-family: material_icons;
        color: rgba(0, 0, 0, 0.5);
    }
    /* ! this shits kinda wonky */
    span.active {
        color: rgb(0, 0, 0);
        background-color: rgba(20, 20, 20, 0.15);
    }
    .active:hover {
        color: rgb(0, 0, 0);
    }
</style>



<script lang="ts">
	import { onMount } from "svelte";

    import { focusedEditor, bigWidth} from "$lib/stores/stores";
	import type { Editor } from "@tiptap/core";

    
    export var editorCounter= [
        {z: 1, id:0}
    ];    

    var editor: any;

    focusedEditor.subscribe((value) => {
        editor = value;
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

    function selectStyle(style: string | { string: string, level: number}){
        if (typeof style == "string" && editor) {
            switch (style) {
                case "paragraph":
                    editor.chain().focus().setParagraph().run();
                    break;
                case "bold":
                    editor.chain().focus().toggleBold().run();
                    break;
                case "italic":
                    editor.chain().focus().toggleItalic().run();
                    break;
                case "code":
                    editor.chain().focus().toggleCode().run();
                    break;
                default:
                    console.log("Error: Style not found");
                    break;
            }
        }else if (typeof style == "object" && editor) {
            editor.chain().focus().toggleHeading({ level: style.level }).run();
        }
    }
    
    function checkStyle(style: string | {string: string, level: number}, editor: Editor): boolean{
        if (typeof style == "string" && editor) {
            return editor.isActive(style);
        }else if (typeof style == "object" && editor) {
            return editor.isActive('heading', { level: style.level });
        }
        return false;
    }
</script>
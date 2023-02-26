<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if bigWidth}
    <span class="w-17 h-17 text-center absolute right-2.5 top-2.5 text-3.75rem cursor-pointer select-none z-999 rounded-full font-$material_icons bg-light-50" style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);" on:click={addEditor}>
        &#xF4FE;
    </span> 
{:else}
    <div class="flex w-full flex justify-center fixed bottom-0 bg-light-50 z-999">
        <span class="w-25 h-25 text-center text-22 cursor-pointer select-none z-999 rounded-full font-$material_icons bg-light-50 relative bottom-8" style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);" on:click={addEditor}>
            &#xF4FE;
        </span>
    </div>
{/if}
 







<script lang="ts">
	import { onMount } from "svelte";


    export var bigWidth: boolean = true;

    export var editorCounter= [
        {z: 1, id:0}
    ];    

    onMount(() => {
        checkWidth();
        //! This is different from editor.svelte might need to refactor later
        window.addEventListener('resize', checkWidth);
    });

    function checkWidth(){
        bigWidth = document.body.clientWidth > 768;
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
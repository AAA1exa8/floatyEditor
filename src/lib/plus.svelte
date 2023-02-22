<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="absolute right-0 text-size-40px cursor-pointer select-none" style="font-family: material_icons;" on:click={addEditor}>
    &#xF4FE;
</span>    




<script lang="ts">
    export var editorCounter: number[] = [0];    

    function addEditor(){
        if (editorCounter.length == 0) {
            editorCounter = [0]
        }else{
            editorCounter = editorCounter.concat(editorCounter[editorCounter.length-1]+1)
        }
        console.log(editorCounter)
    }    
</script>
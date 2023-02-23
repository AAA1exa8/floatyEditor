<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="absolute right-0 text-size-40px cursor-pointer select-none" style="font-family: material_icons;" on:click={addEditor}>
    &#xF4FE;
</span>    



<script lang="ts">
    export var editorCounter= [
        {z: 1, id:0}
    ];    
    function addEditor(){
        if (editorCounter.length == 0) {
            editorCounter = [
                {z: 1, id:0}
            ]
        }else{
            editorCounter = editorCounter.concat({z: Math.max(...editorCounter.map(editor => editor.z))+1, 
                id:editorCounter[editorCounter.length-1].id+1})
        }
        console.log(editorCounter)
    }    
</script>
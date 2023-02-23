<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="w-69px h-69px text-center absolute right-10px top-10px text-size-60px cursor-pointer select-none z-999 rounded-full font-$material_icons bg-light-50" style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);" on:click={addEditor}>
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
    }    
</script>
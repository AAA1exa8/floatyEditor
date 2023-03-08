<div class="h-13"></div>
<header class="fixed bg-#85CCC8 z-2 w-screen font-bold top-0">
    <div>
        <nav class="text-stroke-gray-800">
            <span class="text-3xl">
                floatyEditor
            </span>
            <ul class="sm:flex hidden">
                <li>Floaties</li>
                <li>Notes</li>
                <li>Blog</li>
                <li>Share</li>
                <li>about</li>
            </ul>
            {#if smallWitdh}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="relative">
                    <div class="visible text-3xl select-none" style="font-family: material_icons;"
                    on:click|stopPropagation={toggleMenu}>
                        &#xF479;
                    </div>
                    <div class="materialise absolute right-0 bg-#85CCC0 p-3 rounded-1 pointer-events-none opacity-0" style="box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);"
                    class:active={showMenu}>
                        <ul class="flex flex-col" on:click|stopPropagation={() => {}}>
                            <li>Floaties</li>
                            <li>Notes</li>
                            <li>Blog</li>
                            <li>Share</li>
                            <li>about</li>
                        </ul>
                    </div>
                </div>
            {/if}
        </nav>
    </div>
</header>

<svelte:window on:resize={ isSmallWitdh } bind:innerWidth={ innerWidth } on:click={() => {if(showMenu){toggleMenu()}}}/>

<style lang="postcss">
    *{
        font-family: sans-serif;
    }
    header{
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    }
    nav{
        @apply flex justify-between items-center py-2 px-4;
    }
    ul{
        @apply list-none m-0 p-0;
    }
    li{
        @apply mx-2 my-3;
    }
    .materialise{
        transform: translateY(-10px);
        transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
    }
    .active{
        transform: translateY(0);
        opacity: 100%;
        pointer-events: auto;
    }
</style>

<script lang="ts">
	import { onMount } from "svelte";


    let smallWitdh = false;
    let innerWidth = 1920;
    let showMenu = false;

    onMount(isSmallWitdh);

    function isSmallWitdh(){
        smallWitdh = innerWidth <= 639;
    }
    function toggleMenu(){
        showMenu = !showMenu
    }    

</script>
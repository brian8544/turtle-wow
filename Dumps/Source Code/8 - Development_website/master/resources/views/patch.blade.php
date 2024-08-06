@include('layout.head')

<body>

@dynamicContent('patch-1.17.2')

@include('layout.header')


@sectionContent('patch-1.17.2.section.1')


            {{--<div class="row p-5 mt-5">

                <div class="col-lg-12">
                    <h4 class="orange-text mb-3">NEW CHARACTER CUSTOMIZATIONS</h4>

                    <p class="text-white">
                        Added new character customization options to the selection screen, including hair styles from
                        Lich King (with some exceptions), Alpha WoW and approximately 15 unique Turtle WoW hair styles.
                    </p>

                    <img src="{{ Vite::asset('resources/images/new_character_looks.webp') }}" class="mt-3 mb-4 w-100"
                         alt="Classic Dungeon Update">


                </div>

            </div>

            <div class="row p-5 mt-5">

                <div class="col-lg-12">
                    <h4 class="orange-text mb-3">ALTERNATIVE TIER SETS TAILORED FOR SPECIFIC SPECIALIZATIONS</h4>

                    <p class="text-white">
                        The itemization warrants its own changelog, which you can find <a class="orange-text hand"
                                                                                          href="https://forum.turtle-wow.org/viewtopic.php?t=10913"
                                                                                          target="_blank">here!</a>
                    </p>

                </div>

            </div>

            <div class="row p-5 mt-5">

                <div class="col-lg-12">
                    <h4 class="orange-text mb-3">TOY COLLECTION TAB</h4>

                    <p class="text-white">
                        In the newest update, we are adding the Toy Collection Tab in your spell book. Tidy up your
                        inventory by turning some items into spells. Enjoy a more organized and straightforward bag
                        space management!
                    </p>

                    <img src="{{ Vite::asset('resources/images/toy_tab.webp') }}" class="mt-3 mb-4 w-100"
                         alt="Classic Dungeon Update">


                </div>

            </div>

            <div class="row p-5 mt-5">

                <div class="col-lg-12">
                    <h4 class="orange-text mb-3">USER INTERFACE & REDUCED ADD-ON DEPENDENCY</h4>

                    <p class="text-white">
                        <span class="star mr-3 orange-text">&starf;</span>Inspected talents are now updated when you
                        change a target.<br>
                        <span class="star mr-3 orange-text">&starf;</span> Adjusted the size of the talent tree tabs at
                        the top of the frame to fit within the inspect
                        frame.<br>
                        <span class="star mr-3 orange-text">&starf;</span>The Profession UI is now larger, showing
                        craftable items on the left, recipe details on the
                        right and a search bar to look for just the right recipe.

                    </p>

                    <img src="{{ Vite::asset('resources/images/improved_tradeskill_window.webp') }}"
                         class="mt-3 mb-4 w-100"
                         alt="Classic Dungeon Update">


                </div>

            </div>

            <div class="row p-5 mt-5">

                <div class="col-lg-12">
                    <h4 class="orange-text mb-3">GENERAL FIXES</h4>

                    <p class="text-white" style="line-height: 2">
                        <span class="star mr-3 orange-text">&starf;</span>Experimental solution for High Elf male ear
                        issues with helmets.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Experimental solution for High Elf female ear
                        issues with helmets.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Fixed High Elf male Player Name positioning
                        and scale while mounted.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Fixed High Elf male issue with certain facial
                        feature resetting the hair color to blonde in Character Creation.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Fixed positioning of High Elf male mounts.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Fixed helmet model for High Elf female Tier 1
                        Warrior.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Resolved material issues with specific High
                        Elf male circlet helmets.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Corrected texture for Goblin male Hunter Tier
                        3 helmet.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Adjusted positioning of Greatblade of
                        Quel'Danil (and all weapons using the same visual) in character hands.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Fixed the Mount Special animation for the
                        Darkmoon Dancing Bear.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Fixed Priest Shackle visibility with Guardian
                        of Icecrown.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Shadowhorn Stag Mount now has a backwalk
                        animation.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Fixed Troll Female facial feature to match the
                        hair color properly.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Fixed Onyxia Trophy Head model in
                        Stormwind.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Corrected the spell name for the Riding Zerba
                        (rare drop in Barrens).<br>
                        <span class="star mr-3 orange-text">&starf;</span>Added the missing title for achieving the
                        highest reputation level with Steamwheedle Blood Ring.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Adjusted the class mask for the Cleaning Cloth
                        spell, it is no longer limited to Rogues alone.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Updated talent descriptions and icons for
                        classes with outdated talent information.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Switching to a different tree than the current
                        one will now scroll to the top of the window if not already at the top.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Thalassian Highlands NPCs that were missing
                        voicelines now have appropriate voicelines.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Fixed a bug with the world map zone dropdown
                        where selecting a zone would sometimes display the wrong zone.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Added custom races to the player portrait PvP
                        icon tooltip.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Moved the warlock spell 'Ritual of Souls' to
                        the correct spellbook tab.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Scrapforged Mechaspider now follows terrain
                        elevation when moving<br>
                        <span class="star mr-3 orange-text">&starf;</span>Scrapforged Mechaspider now has a Backwalk,
                        Jump and Mount Special Animations<br>
                        <span class="star mr-3 orange-text">&starf;</span>Fixed High Elf Male underwear not hiding
                        properly with certain leg items.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Updated the Model and Texture for Armored
                        Stormwind Warhorse.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Armored Stormwind Warhorse now has Backwalk,
                        Jump and Mount Special animations.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Fixed Swiftcaster's Chapeau not hiding
                        haircuts.<br>
                        <span class="star mr-3 orange-text">&starf;</span>Beware the Blue Child, for its light may
                        herald the dawn of a new age or the twilight of our own!<br>

                    </p>

                    <img src="{{ Vite::asset('resources/images/turtlewow_bluechild.webp') }}" class="mt-3 mb-4 w-100"
                         alt="Classic Dungeon Update">


                </div>

            </div>--}}


@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

</body>

</html>

@include('layout.head')

<body>

@dynamicContent('new-races')

@include('layout.header')

<div class="section mb-5" id="pages">
    <div class="container-fluid pb-5">
        <div class="container pt-5 pb-5">
            <div class="row helmet p-5">
                <div class="col-lg-12 ">
                    @sectionContent('pages.row.1.text')
                </div>
            </div>
            <div class="row p-5 mt-5">
                <div class="col-lg-12 mb-5">
                    @sectionContent('pages.row.2.text')
                    <div class="mt-5"> @livewire("video-embed", ['id' => '87c37432'])
                    </div>

                </div>

                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_highelf_01_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_highelf_01.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="High Elf Character Art 1"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_highelf_02_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_highelf_02.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="High Elf Character Art 2"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_highelf_03_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_highelf_03.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="High Elf Character Art 3"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_highelf_04_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_highelf_04.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="High Elf Character Art 4"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_highelf_alahthalas_01_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_highelf_alahthalas_01.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Alah'Thalas High Elf Location 1"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_highelf_alahthalas_02_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_highelf_alahthalas_02.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Alah'Thalas High Elf Location 2"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_highelf_alahthalas_03_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_highelf_alahthalas_03.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Alah'Thalas High Elf Location 3"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_highelf_room_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_highelf_room.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="High Elf Styled Room"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_highelf_stormwindcity_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_highelf_stormwindcity.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Stormwind City with High Elf Theme"></div>

                <div class="col-lg-12 mt-4 mb-4">
                    @sectionContent('pages.row.2.title')
                </div>
                <div class="col-lg-1">
                    <img alt="High Elf Trait 1" src="{{ Vite::asset('resources/images/he_trait_1.png') }}">
                </div>
                <div class="col-lg-5">
                    @sectionContent('pages.row.3.a')
                </div>

                <div class="col-lg-1">
                    <img alt="High Elf Trait 2" src="{{ Vite::asset('resources/images/he_trait_2.png') }}">
                </div>
                <div class="col-lg-5">
                    @sectionContent('pages.row.3.b')
                </div>

                <div class="col-lg-1 mt-3">
                    <img alt="High Elf Trait 3" src="{{ Vite::asset('resources/images/he_trait_3.png') }}">
                </div>
                <div class="col-lg-5 mt-3">
                    @sectionContent('pages.row.4.a')
                </div>

                <div class="col-lg-1 mt-3">
                    <img alt="High Elf Trait 4" src="{{ Vite::asset('resources/images/he_trait_4.png') }}">
                </div>
                <div class="col-lg-5 mt-3">
                    @sectionContent('pages.row.4.b')
                </div>

            </div>

            <div class="row p-5 mt-5">

                <div class="col-lg-12 mb-5">
                    @sectionContent('pages.row.5.text')
                    <div class="mt-5"> @livewire("video-embed", ['id' => 'd4357514'])
                    </div>
                </div>

                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_goblin_01_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_goblin_01.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Goblin Character Art 1"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_goblin_02_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_goblin_02.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Goblin Character Art 2"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_goblin_03_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_goblin_03.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Goblin Character Art 3"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_goblin_04_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_goblin_04.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Goblin Character Art 4"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_goblin_05_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_goblin_05.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Goblin Character Art 5"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_goblin_bolid_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_goblin_bolid.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Goblin Race Car"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_goblincity_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_goblincity.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Goblin City Scene"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_goblins_01_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_goblins_01.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Group of Goblin Characters 1"></div>
                <div class="col-lg-4 mb-4"><img
                        src="{{ Vite::asset('resources/images/turtlewow_goblins_02_preview.png') }}"
                        class="img-fluid hand h-100" onclick="openModal('{{ Vite::asset("resources/images/turtlewow_goblins_02.png") }}')" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        alt="Group of Goblin Characters 2"></div>

                <div class="col-lg-12 mt-4 mb-4">
                    @sectionContent('pages.row.6.title')
                </div>
                <div class="col-lg-1">
                    <img alt="Goblin Trait 1" src="{{ Vite::asset('resources/images/go_trait1.png') }}">
                </div>
                <div class="col-lg-5">
                    @sectionContent('pages.row.7.a')
                </div>

                <div class="col-lg-1">
                    <img alt="Goblin Trait 2" src="{{ Vite::asset('resources/images/go_trait2.png') }}">
                </div>
                <div class="col-lg-5">
                    @sectionContent('pages.row.7.b')
                </div>

                <div class="col-lg-1 mt-3">
                    <img alt="Goblin Trait 3" src="{{ Vite::asset('resources/images/go_trait3.png') }}">
                </div>
                <div class="col-lg-5 mt-3">
                    @sectionContent('pages.row.8.a')
                </div>

                <div class="col-lg-1 mt-3">
                    <img alt="Goblin Trait 4" src="{{ Vite::asset('resources/images/go_trait4.png') }}">
                </div>
                <div class="col-lg-5 mt-3">
                    @sectionContent('pages.row.8.b')
                </div>

            </div>

        </div>
    </div>
</div>


@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

</body>

</html>

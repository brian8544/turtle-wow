<div class="modal fade" id="newReportModal" tabindex="-1" aria-labelledby="newReportLabel"
     aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">
                <div wire:loading wire:target="images">
                    @livewire('loader-component')
                </div>
                <div wire:loading wire:target="submitNewBugReport">
                    @livewire('loader-component')
                </div>

                <div class="row ucp p-5">
                    <div class="col-lg-12">
                        <a data-bs-dismiss="modal" aria-label="Close"><i
                                class="fa fa-fw fa-arrow-left"></i> {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['back_to_list'] }}
                        </a>
                        @if ($canPostReport && !$needAuthorName && !$needToChangeAuthorName)
                            <h3 class="m-3 text-white">{{ __('bug_tracker')['new_bug_report'] }}</h3>

                            <form wire:submit.prevent="submitNewBugReport">
                                <div class="mb-3">
                                    <label for="realmSelect"
                                           class="form-label text-white">{{ __('bug_tracker')['select_realm'] }}</label>
                                    <div class="dropdown mt-1">
                                        <button class="btn btn-secondary dropdown-toggle" type="button"
                                                id="realmSelectDropdown"
                                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {{ __('bug_report')['select_realms'] }}
                                        </button>
                                        <div class="dropdown-menu text-white p-3" aria-labelledby="realmSelectDropdown">
                                            @forelse($realms as $key => $value)
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" value="{{ $key }}"
                                                           id="{{ 'realm_option_' . $key }}"
                                                           wire:model="realms.{{ $key }}.selected">
                                                    <label class="form-check-label"
                                                           for="{{ 'realm_option_' . $key }}">
                                                        {{ $value['name'] }}
                                                    </label>
                                                </div>
                                            @empty
                                                <p>{{ __('bug_tracker')['no_realms'] }}</p>
                                            @endforelse
                                        </div>
                                    </div>
                                    @error('realm')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="titleInput"
                                           class="form-label text-white">{{ __('bug_report')['related_reports_table']['title'] }}</label>
                                    <input type="text" class="form-control @error('title') invalid @enderror"
                                           id="titleInput" name="title" wire:model="title" maxlength="100">
                                    @error('title')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>

                                <div class="mb-3" wire:ignore>
                                    <label for="descriptionTextarea"
                                           class="form-label text-white">{{ __('bug_report')['bug_details']['description'] }}</label>
                                    <textarea class="form-control @error('description') invalid @enderror"
                                              id="descriptionTextarea" rows="5" name="description"
                                              wire:model="description"></textarea>
                                    @error('description')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="imageUpload"
                                           class="form-label text-white">{{ __('bug_tracker')['upload_images'] }}</label>
                                    <input type="file" class="form-control @error('images.*') is-invalid @enderror"
                                           id="imageUpload" name="images" wire:model="images" multiple accept="image/*">
                                    @error('images.*')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                    <small class="text-muted">{{ __('bug_tracker')['you_can_upload'] }}</small>
                                    <br>
                                    @forelse ($images as $image)
                                        <img src="{{ $image->temporaryUrl() }}" width="150px" height="150px">
                                    @empty
                                    @endforelse
                                </div>

                                {{--<div class="mb-3">
                                    <label for="screenshotsInput" class="form-label text-white">Screenshots</label>
                                    <input type="file" class="form-control" id="screenshotsInput" name="screenshots">
                                </div>--}}

                                <p class="text-white">
                                    {{ __('bug_tracker')['avoid_duplicates'] }}<br>
                                    {{ __('bug_tracker')['be_accurate'] }}<br>
                                    {{-- - Include screenshots and/or videos of the issue--}}
                                </p>

                                <div wire:loading wire:target="images"
                                     class="text-white">{{ __('bug_tracker')['uploading'] }}...
                                </div>
                                <button type="submit"
                                        class="btn btn-primary"
                                        wire:loading.remove>{{ __('bug_tracker')['submit_report'] }}</button>
                            </form>
                            @if ($bug_tracker_responseMessage)
                                <div class="alert alert-warning"
                                     id="responseMessage">{{ $bug_tracker_responseMessage }}</div>
                            @endif
                        @endif
                        @if ($canPostReport && $needAuthorName)
                            <h3 class="mt-3 mb-3 text-white">{{ __('bug_tracker')['pick_author_name'] }}</h3>

                            <form wire:submit.prevent="submitNewAuthorName">
                                <div class="mb-3">
                                    <label for="characterSelect"
                                           class="form-label text-white">{{ __('bug_tracker')['select_author_name'] }}</label>
                                    <div class="dropdown mt-1">
                                        @error('selectedCharacterName')
                                        <div class="alert alert-warning">{{ $message }}</div> @enderror
                                        <select class="form-control w-75" wire:model="characterKey">
                                            <option value="none">{{ __('bug_tracker')['select_character'] }}</option>
                                            @forelse($charactersName as $key => $value)
                                                <option value="{{ $key }}">{{ $value['name'] }}</option>
                                            @empty
                                                <option value="none">{{ __('bug_tracker')['no_character'] }}</option>
                                            @endforelse
                                        </select>

                                    </div>
                                    @error('characters')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <button type="submit"
                                        class="btn btn-primary"
                                        wire:loading.remove>{{ __('button')['submit'] }}</button>

                            </form>
                            @if ($bug_tracker_responseMessage)
                                <div class="alert alert-warning">{{ $bug_tracker_responseMessage }}</div>
                            @endif
                        @endif
                        @if (!$canPostReport)
                            @if ($bug_tracker_responseMessage)
                                <br>
                                <div class="mt-3 text-white">
                                    {{ $bug_tracker_responseMessage }}
                                </div>
                            @else
                                <br>
                                <div class="mt-3 text-white">{{ __('bug_tracker')['you_need_to'] }} <a
                                        href="{{ route('login') }}" style="margin: 0 !important; color: var(--orange) !important;">{{ __('header')['login'] }}</a> {{ __('bug_tracker')['in_order_to'] }}
                                </div>
                            @endif
                        @endif
                    </div>
                </div>
                <script type="module">
                    document.addEventListener('DOMContentLoaded', function () {
                        var dropdowns = document.querySelectorAll('.dropdown-menu');

                        dropdowns.forEach(function (dropdown) {
                            dropdown.addEventListener('click', function (e) {
                                if (dropdown.classList.contains('dropdown-menu-form')) {
                                    e.stopPropagation();
                                }
                            });

                            var checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
                            var dropdownButton = dropdown.closest('.dropdown').querySelector('.dropdown-toggle');

                            checkboxes.forEach(function (checkbox) {
                                checkbox.addEventListener('change', function () {
                                    var selectedOptions = [];
                                    checkboxes.forEach(function (checkbox) {
                                        if (checkbox.checked) {
                                            selectedOptions.push(checkbox.nextElementSibling.textContent.trim());
                                        }
                                    });

                                    if (selectedOptions.length > 0) {
                                        dropdownButton.textContent = selectedOptions.join(', ');
                                    } else {
                                        dropdownButton.textContent = '{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['select'] }}';
                                    }
                                });
                            });
                        });
                    });
                    window.addEventListener('DOMContentLoaded', () => {
                        tinymce.init({
                            selector: '#descriptionTextarea',
                            plugins: ['advlist','autolink', 'link', 'code',
                                'lists','link','charmap','preview','anchor','searchreplace','visualblocks','fullscreen','insertdatetime','wordcount', 'emoticons'
                            ],
                            toolbar: 'undo redo emoticons link code| formatpainter casechange blocks | bold italic backcolor | ' +
                                'alignleft aligncenter alignright alignjustify | ' +
                                'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',

                            link_default_target: '_blank',
                            link_assume_external_targets: true,


                            setup: function (editor) {
                                editor.on('init change', function () {
                                    editor.save();
                                });
                                editor.on('change', function () {
                                    @this.set('description', editor.getContent());
                                });
                            },

                            skin: false,
                            content_css: false
                        });
                    });

                </script>
            </div>
        </div>
    </div>
</div>

